/**
 * Geodesy takes a list of Shape objects and returns a list of Tile objects
 * The Tile objects have all the information to mutate into a list of HTML objects
 *  
 * Geodesy is provided with a list of elements to draw
 * Each element has attributes like: code-src, origin, length, bitmask... 
 * maybe it will return a list of <geodesy> elements, each with a src pointing to the pattern descriptor
 */

const λ = require('algebrite')

interface Shape {
    basis: string[][],
    offset: string[],
    scale: string,
    polygon: string[][]
}

interface Tile {
    x: string,
    y: string,
    norm: string, /* I don't want to throw away the math of norm, but I'll need to convert it to number for sorting */
    spin: number, /* for spin I'm using Math.atan2 because it figures out +/- for me, and it returns a javascript number */
    scale: string,
    polygon: number, /* just 0 1 or 2... the index of the original motif list. */
}

interface GeodesyElement {
    geodesy: GeodesyAttributes
}

interface GeodesyAttributes {
    origin: string[],
    motif: string,
    bitmask: string,
    radius: string,
}

interface NormData {
    [index: string]: Tile[]
}


module.exports = function geodesy(element: GeodesyElement): any {
    // xSize:number, ySize:number, shape:Shape
    let {motif, bitmask, radius} = element.geodesy
    // mask is a hexadecimal number representing the number of elements to return
    // to start with, I'll just use it as a 'width/height' parameter
    // TODO: figure out how large of a table I need to calculate x number of elements 
    
    let size = parseInt(bitmask, 16)
    let unitlength = parseInt(radius, 10)
    // fetch motif descriptor
    delete require.cache[require.resolve('./motif/' + motif + '.json')];
    let motifData = require('./motif/' + motif + '.json')['motif'] as Shape[]

    let normData:NormData = {}

    // for(var shape of motifData){
    motifData.forEach((shape, motifIndex) => {
        let basispts = M(
            dot(
                applyShift(
                    table(size, size),
                    shape.offset
                ), // TODO use origin in this calc
                shape.basis
            )
        )
        basispts.forEach(([x,y], pointIndex) => {
            var thisnorm = calcNorm(x,y)
            var thisspin = calcSpin(x,y)
        
            var tile:Tile = {
                x, y,
                "norm": thisnorm,
                "spin": thisspin,
                "scale": shape.scale,
                polygon: motifIndex
            }
        
            if(normData[thisnorm]){
                normData[thisnorm].push(tile)
            } else {
                normData[thisnorm] = [tile]
            }
        })
    })

    // // each key of normData is the norm for that set of spin/polygons
    // // each spin element carries 
    // for(var norm of Object.keys(normData)){
    //     normData[norm]
    // }
    return [
        {"style": Object.assign(
            {"geodesy, norm, spin, scale, polygon, target":{
                "display": "block",
                "position": "absolute",
                "height": radius,
                "width": radius,
                "pointer-events": "none"
            }},
            {"geodesy":{
                "top": `Calc(50vh - (${radius} / 2))`,
                "left": `Calc(50vw - (${radius} / 2))`
            }},
            {"spin":{
                "transform-origin": `Calc(${radius} / 2) Calc(${radius} / 2)`,
                "height":"inherit"
            }},
            {"polygon": {
                "background": "#aaa"
                // shadow blur goes here
                // shadow color goes here
            }},
            {"scale": {
                "bottom": "0"
            }},
            {"target":{
                "pointer-events":"all"
                // shadow offset goes here
                // polygon color goes here
            }},
            {"target:hover": {
                "background": "red"
            }},
            ...motifData.map((shape, shapeIndex) => ({
                [`[polygon="${shapeIndex}"] polygon, [polygon="${shapeIndex}"] target`]: {
                    "clip-path": `${polygon2clippath(shape.polygon)}`
                },
                [`scale[polygon="${shapeIndex}"]`]: {
                    "transform":`scale(${N(shape.scale)})`
                }
            }))
        )},
        {"geodesy": {
            motif, bitmask, radius,
            "childNodes": Object.keys(normData).map(norm => ({
                "norm": {
                    "id": norm,
                    "style": {"height": `Calc(${radius} * ${N(norm)} + ${radius})`},
                    "neighbors": normData[norm].length,
                    "childNodes": normData[norm].map(spin => ({
                        "spin": {
                            "style": {"transform": `rotate(${spin.spin}rad)`},
                            "childNodes": [{
                                "scale": {
                                    "polygon": String(spin.polygon),
                                    "childNodes":[
                                        {"polygon":{
                                            "style": {"transform": `rotate(Calc(-1 * ${spin.spin}rad))`},
                                            "childNodes":[
                                                {"target":{

                                                }}
                                            ]
                                        }}
                                    ]
                                }
                            }]
                        }
                    }))
                }
            }))
        }}
    ]



    // for each {basis/offset/polygon} Shape... calculate

    let index = 0
    // let style = {"style": {
    //     [`[polygon="${index}"]`]: {
    //         "clip-path": `polygon(${polygon2clippath(motifData0.polygon)})`
    // }}}
    
    return Object.values(normData)
}

// motif.motif is a shape[]
// for each shape I calculate the grid, apply the offset, calc the norms and spins


/**
 * So to do the sorting there's an intermediate data structure,
 * each norm has a list of spins...
 */

function table(x: number ,y: number): string[][] {
    let grid = new Array
    for(var i = -x; i <= x; i++){
        for(var j = -y; j <= y; j++){
            grid.push([String(i),String(j)])
        }
    }
    return grid
}

function lambdafy(outer: string[][]): string {
    // wrap brackets around the string elements so Algebrite understands it as a matrix
    return `[${outer.map(inner => `[${inner.join()}]`).join()}]`
}

function N(λstring: string): number {
    return λ.float(λstring).d
}
// if string starts with [[ you've got a matrix to convert!
// would be better if N worked on single digits, vectors, and matrices, just detected how to walk over it
// or if I had an apply function that could take N and map it over vector or matrix.
// but how to return number | number[][], something to avoid?

// M for matrix, take result from Algebrite and return an array of string values

function M(matrix: string): string[][]{
    let comma = "\\,"
    let math = [
        "\\d", // digits
        "\\+", // plus
        "\\-", // sub
        "\\*", // mult
        "\\/", // div
        "\\^", // pow
        "\\(\\)" // parens
    ].join('')
    // this matches number pairs inside the algebrite string
    // so it returns an array of of array of Algebrite strings
    return Array.from(
        matrix.match(
            new RegExp(
                '[' + math + ']+' + comma + '[' + math + ']+' ,'g'
            )
        ), result => result.split(',')
    )
}


function calcSpin(x: string, y: string): number {
    return Math.atan2(N(x), N(y))
    // return λ.run(`arctan(x,y)`)
}

function calcNorm(x: string, y: string): string {
    return λ.run(`abs([${x},${y}])`)
}

function dot(dimensions: string[][], basis: string[][]): string {
    return λ.run(`dot(${lambdafy(dimensions)},${lambdafy(basis)})`)
}

function applyShift(dimensions: string[][], shift: string[]): string[][]{
    // I thought of doing this with dot product with a matrix transform but there's a bunch of adding and removing ones to make the shapes fit
    // so I thought why not just add to x and y
    let dimensionsClone = dimensions.slice()
    for(var pt in dimensionsClone){
        dimensionsClone[pt][0] = λ.run(`${dimensionsClone[pt][0]} + ${shift[0]}`)
        dimensionsClone[pt][1] = λ.run(`${dimensionsClone[pt][1]} + ${shift[1]}`)
    }
    return dimensionsClone
}

function polygon2clippath(polygon: string[][]): string {
    /*
    A little math and string concatenation
    The polygon datastructure is x,y coordinates from a -1 to +1
    I want to use them as percentages for CSS clip-path polygon. 
    So I add 1, now the coords are from 0 to 2.
    To get a percentage 0 to 100, I just multiply by 50.
    Then add the percent sign and riffle the commas in to get CSS syntax
    [[-1,-1],[-1,1],[1,1],[1,-1]]] -> "0% 0%, 0% 100%, 100% 100%, 100% 0%"
    */
    return [
       'polygon(',
        polygon.map(
            pt => pt.map(
                n =>  N(λ.run(`(${n} + 1) * 50`)) + '%'
            ).join(' ')
        ).join(','),
       ')'
    ].join('')
}


// function orderFromCenter(){
//     for(var el of Object.values(norms)){
//         console.log(
//             (el as Tile[]).sort((a,b) => a.spin - b.spin)
//         )
//     }
// }