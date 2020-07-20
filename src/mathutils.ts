const λ = require('algebrite')

/**
 * So to do the sorting there's an intermediate data structure,
 * each norm has a list of spins...
 */

export function table(x: number ,y: number): string[][] {
    let grid = new Array
    for(var i = -x; i <= x; i++){
        for(var j = -y; j <= y; j++){
            grid.push([String(i),String(j)])
        }
    }
    return grid
}

export function lambdafy(outer: string[][]): string {
    // wrap brackets around the string elements so Algebrite understands it as a matrix
    return `[${outer.map(inner => `[${inner.join()}]`).join()}]`
}

export function N(λstring: string): number {
    return λ.float(λstring).d
}
// if string starts with [[ you've got a matrix to convert!
// would be better if N worked on single digits, vectors, and matrices, just detected how to walk over it
// or if I had an apply export function that could take N and map it over vector or matrix.
// but how to return number | number[][], something to avoid?

// M for matrix, take result from Algebrite and return an array of string values

export function M(matrix: string): string[][]{
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

export function run(expr: string){
    return λ.run(expr)
}


export function calcSpin(x: string, y: string): number {
    return Math.atan2(N(x), N(y))
    // return λ.run(`arctan(x,y)`)
}

export function calcNorm(x: string, y: string): string {
    return λ.run(`abs([${x},${y}])`)
}

export function dot(dimensions: string[][], basis: string[][]): string {
    return λ.run(`dot(${lambdafy(dimensions)},${lambdafy(basis)})`)
}

export function applyShift(dimensions: string[][], shift: string[]): string[][]{
    // I thought of doing this with dot product with a matrix transform but there's a bunch of adding and removing ones to make the shapes fit
    // so I thought why not just add to x and y
    let dimensionsClone = dimensions.slice()
    for(var pt in dimensionsClone){
        dimensionsClone[pt][0] = λ.run(`${dimensionsClone[pt][0]} + (${shift[0]})`) // had to wrap the shift in parans for it to accept negative offset
        dimensionsClone[pt][1] = λ.run(`${dimensionsClone[pt][1]} + (${shift[1]})`)
    }
    return dimensionsClone
}

export function applyScale(dimensions: string[][], scale: string): string[][]{
    // I thought of doing this with dot product with a matrix transform but there's a bunch of adding and removing ones to make the shapes fit
    // so I thought why not just add to x and y
    let dimensionsClone = dimensions.slice()
    for(var pt in dimensionsClone){
        dimensionsClone[pt][0] = λ.run(`${dimensionsClone[pt][0]} * (${scale})`) // had to wrap the shift in parans for it to accept negative offset
        dimensionsClone[pt][1] = λ.run(`${dimensionsClone[pt][1]} * (${scale})`)
    }
    return dimensionsClone
}

export function polygon2clippath(polygon: string[][]): string {
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