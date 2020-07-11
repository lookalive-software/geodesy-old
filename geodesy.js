var λ = require('algebrite');
var octostars = require('./octostars.json');
function table(x, y) {
    var grid = new Array;
    for (var i = -x; i <= x; i++) {
        for (var j = -y; j <= y; j++) {
            grid.push([String(i), String(j)]);
        }
    }
    return grid;
}
function array2matrix(outer) {
    return "[" + outer.map(function (inner) { return "[" + inner.join() + "]"; }).join() + "]";
}
function matrix2array(matrix) {
    var num = "\\d";
    var plus = "\\+";
    var min = "\\-";
    var mult = "\\*";
    var div = "\\/";
    var pow = "\\^";
    var comma = "\\,";
    var parens = "\\(\\)";
    // this matches number pairs inside the algebrite string
    // so it returns an array of of array of Algebrite strings
    return Array.from(matrix.match(new RegExp('[' + num + plus + min + mult + div + pow + parens + ']+' +
        comma +
        '[' + num + plus + min + mult + div + pow + parens + ']+', 'g')), function (result) { return result.split(','); });
}
function toNumber(λstring) {
    return λ.float(λstring).d;
}
function spin(xypair) {
    return λ.run("arctan(" + xypair[0] + "," + xypair[1] + ")");
}
function norm(xypair) {
    return λ.run("abs([" + xypair[0] + "," + xypair[1] + "])");
}
function dot(dimensions, basis) {
    return λ.run("dot(" + array2matrix(dimensions) + "," + array2matrix(basis) + ")");
}
var basispts = matrix2array(dot(table(2, 2), octostars.geodesy[0].basis));
// for every point 
console.log(basispts, basispts.map(norm), basispts.map(spin));
