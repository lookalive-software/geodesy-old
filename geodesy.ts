const λ = require('algebrite')
const octostars = require('./octostars.json')

function table(x: number ,y: number): number[][] {
    let grid = new Array
    for(var i = -x; i <= x; i++){
        for(var j = -y; j <= y; j++){
            grid.push([i,j])
        }
    }
    return grid
}

function array2matrix(outer: string[][]): string {
    return `[${outer.map(inner => `[${inner.join()}]`).join()}]`
}

function matrix2array(matrix: string): string[][]{
    let num  = "\\d" 
    let plus = "\\+"
    let min  = "\\-"
    let mult = "\\*"
    let div  = "\\/"
    let pow  = "\\^"
    let comma = "\\,"
    let parens = "\\(\\)"
    // this matches number pairs inside the algebrite string
    // so it returns an array of of array of Algebrite strings
    return Array.from(matrix.match(new RegExp(
        '[' + num + plus + min + mult + div + pow + parens + ']+' +
         comma + 
        '[' + num + plus + min + mult + div + pow + parens + ']+' ,
        'g')), result => result.split(','))
}

function norm(xypair: string[]): number{
    return λ.float(λ.abs(`[${xypair[0]},${xypair[1]}]`)).d
}

function dot(dimensions: string[][], basis: string[][]): string {
    return λ.run(`dot(${array2matrix(dimensions)},${array2matrix(basis)})`)
}
