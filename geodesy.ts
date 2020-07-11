const λ = require('algebrite')
const octostars = require('./octostars.json')

module.exports = geodesy

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
        "\\d",
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


function spin(x: string, y: string): number {
    return Math.atan2(N(x), N(y))
    // return λ.run(`arctan(${xypair[0]},${xypair[1]})`)
}

function norm(x: string, y: string): string {
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


interface Shape {
    basis: string[][],
    shift: string[],
    polygon: string[][]
}

interface Tile {
    x: string,
    y: string,
    norm: string,
    spin: number
}

function geodesy(xSize:number, ySize:number, shape:Shape): Tile[] {
    let {basis, shift, polygon} = shape

    let basispts = M(
        dot(
            applyShift(table(xSize, ySize), shift),
            basis
        )
    )
    
    let norms = {}

    for(var xypair of basispts){
        var [x,y] = xypair
        var thisnorm = norm(x,y)
        var thisspin = spin(x,y)
    
        var tile:Tile = {
            x, y,
            "norm": thisnorm,
            "spin": thisspin
        }
    
        if(norms[thisnorm]){
            norms[thisnorm].push(tile)
        } else {
            norms[thisnorm] = [tile]
        }
    }

    return Object.values(norms)
}

// function orderFromCenter(){
//     for(var el of Object.values(norms)){
//         console.log(
//             (el as Tile[]).sort((a,b) => a.spin - b.spin)
//         )
//     }
// }