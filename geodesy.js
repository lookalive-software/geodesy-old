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
function lambdafy(outer) {
    // wrap brackets around the string elements so Algebrite understands it as a matrix
    return "[" + outer.map(function (inner) { return "[" + inner.join() + "]"; }).join() + "]";
}
function N(λstring) {
    return λ.float(λstring).d;
}
// if string starts with [[ you've got a matrix to convert!
// would be better if N worked on single digits, vectors, and matrices, just detected how to walk over it
// or if I had an apply function that could take N and map it over vector or matrix.
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
function spin(x, y) {
    return Math.atan2(N(x), N(y));
    // return λ.run(`arctan(${xypair[0]},${xypair[1]})`)
}
function norm(x, y) {
    return λ.run("abs([" + x + "," + y + "])");
}
function dot(dimensions, basis) {
    return λ.run("dot(" + lambdafy(dimensions) + "," + lambdafy(basis) + ")");
}
function applyShift(dimensions, shift) {
    // I thought of doing this with dot product with a matrix transform but there's a bunch of adding and removing ones to make the shapes fit
    // so I thought why not just add to x and y
    var dimensionsClone = dimensions.slice();
    for (var pt in dimensionsClone) {
        dimensionsClone[pt][0] = λ.run(dimensionsClone[pt][0] + " + " + shift[0]);
        dimensionsClone[pt][1] = λ.run(dimensionsClone[pt][1] + " + " + shift[1]);
    }
    return dimensionsClone;
}
var basispts = M(dot(applyShift(table(4, 4), octostars.geodesy[0].shift), octostars.geodesy[0].basis));
var norms = {};
for (var _i = 0, basispts_1 = basispts; _i < basispts_1.length; _i++) {
    var xypair = basispts_1[_i];
    var x = xypair[0], y = xypair[1];
    var thisnorm = norm(x, y);
    var thisspin = spin(x, y);
    var tile = {
        x: x, y: y,
        "norm": thisnorm,
        "spin": thisspin
    };
    if (norms[thisnorm]) {
        norms[thisnorm].push(tile);
    }
    else {
        norms[thisnorm] = [tile];
    }
}
for (var _a = 0, _b = Object.values(norms); _a < _b.length; _a++) {
    var el = _b[_a];
    console.log(el.sort(function (a, b) { return a.spin - b.spin; }));
}
