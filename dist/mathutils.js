"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.polygon2clippath = exports.applyScale = exports.applyShift = exports.dot = exports.calcNorm = exports.calcSpin = exports.run = exports.M = exports.N = exports.lambdafy = exports.table = void 0;
var λ = require('algebrite');
/**
 * So to do the sorting there's an intermediate data structure,
 * each norm has a list of spins...
 */
function table(x, y) {
    var grid = new Array;
    for (var i = -x; i <= x; i++) {
        for (var j = -y; j <= y; j++) {
            grid.push([String(i), String(j)]);
        }
    }
    return grid;
}
exports.table = table;
function lambdafy(outer) {
    // wrap brackets around the string elements so Algebrite understands it as a matrix
    return "[" + outer.map(function (inner) { return "[" + inner.join() + "]"; }).join() + "]";
}
exports.lambdafy = lambdafy;
function N(λstring) {
    return λ.float(λstring).d;
}
exports.N = N;
// if string starts with [[ you've got a matrix to convert!
// would be better if N worked on single digits, vectors, and matrices, just detected how to walk over it
// or if I had an apply export function that could take N and map it over vector or matrix.
// but how to return number | number[][], something to avoid?
// M for matrix, take result from Algebrite and return an array of string values
function M(matrix) {
    var comma = "\\,";
    var math = [
        "\\d",
        "\\+",
        "\\-",
        "\\*",
        "\\/",
        "\\^",
        "\\(\\)" // parens
    ].join('');
    // this matches number pairs inside the algebrite string
    // so it returns an array of of array of Algebrite strings
    return Array.from(matrix.match(new RegExp('[' + math + ']+' + comma + '[' + math + ']+', 'g')), function (result) { return result.split(','); });
}
exports.M = M;
function run(expr) {
    return λ.run(expr);
}
exports.run = run;
function calcSpin(x, y) {
    return Math.atan2(N(x), N(y));
    // return λ.run(`arctan(x,y)`)
}
exports.calcSpin = calcSpin;
function calcNorm(x, y) {
    return λ.run("abs([" + x + "," + y + "])");
}
exports.calcNorm = calcNorm;
function dot(dimensions, basis) {
    return λ.run("dot(" + lambdafy(dimensions) + "," + lambdafy(basis) + ")");
}
exports.dot = dot;
function applyShift(dimensions, shift) {
    // I thought of doing this with dot product with a matrix transform but there's a bunch of adding and removing ones to make the shapes fit
    // so I thought why not just add to x and y
    var dimensionsClone = dimensions.slice();
    for (var pt in dimensionsClone) {
        dimensionsClone[pt][0] = λ.run(dimensionsClone[pt][0] + " + (" + shift[0] + ")"); // had to wrap the shift in parans for it to accept negative offset
        dimensionsClone[pt][1] = λ.run(dimensionsClone[pt][1] + " + (" + shift[1] + ")");
    }
    return dimensionsClone;
}
exports.applyShift = applyShift;
function applyScale(dimensions, scale) {
    // I thought of doing this with dot product with a matrix transform but there's a bunch of adding and removing ones to make the shapes fit
    // so I thought why not just add to x and y
    var dimensionsClone = dimensions.slice();
    for (var pt in dimensionsClone) {
        dimensionsClone[pt][0] = λ.run(dimensionsClone[pt][0] + " * (" + scale + ")"); // had to wrap the shift in parans for it to accept negative offset
        dimensionsClone[pt][1] = λ.run(dimensionsClone[pt][1] + " * (" + scale + ")");
    }
    return dimensionsClone;
}
exports.applyScale = applyScale;
function polygon2clippath(polygon) {
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
        polygon.map(function (pt) { return pt.map(function (n) { return N(λ.run("(" + n + " + 1) * 50")) + '%'; }).join(' '); }).join(','),
        ')'
    ].join('');
}
exports.polygon2clippath = polygon2clippath;
