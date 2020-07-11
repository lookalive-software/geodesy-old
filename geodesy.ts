const λ = require('algebrite')
const octostars = require('./octostars.json')

function table(x: number ,y: number): string[][] {
    let grid = new Array
    for(var i = -x; i <= x; i++){
        for(var j = -y; j <= y; j++){
            grid.push([String(i),String(j)])
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

function toNumber(λstring: string): number {
    return λ.float(λstring).d
}

function spin(xypair: string[]): number {
    return Math.atan2(toNumber(xypair[0]), toNumber(xypair[1]))
    // return λ.run(`arctan(${xypair[0]},${xypair[1]})`)
}

function norm(xypair: string[]): string {
    return λ.run(`abs([${xypair[0]},${xypair[1]}])`)
}

function dot(dimensions: string[][], basis: string[][]): string {
    return λ.run(`dot(${array2matrix(dimensions)},${array2matrix(basis)})`)
}

let basispts = matrix2array(
    dot(
        table(2,2),
        octostars.geodesy[0].basis
    )
)
let norms = {}

for(var xypair of basispts){
    var thisnorm = norm(xypair)
    if(norms[thisnorm]){
        norms[thisnorm].push([].concat(xypair, spin(xypair)))
    } else {
        norms[thisnorm] = [[].concat(xypair, spin(xypair))]
    }
}
// for every point 
console.log(
    norms
)

