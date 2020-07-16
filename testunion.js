let λ = require('algebrite')
let Turf = require('@turf/turf')


// applyShift is basically translate, given M[][] and an offset, return new polygon
// so given the basispts of some polygons, shift into bounding boxes of polygons

let sortedNorms = require('./cache/sorted_pyritohedron.json')
let motif = require('./motif/pyritohedron.json').motif


console.log(sortedNorms.slice(0,4))
// well, for each polygon here, I have to apply a shift and a scale and a rotation...
// console.log(sortedNorms.slice(1))
// grab the polygon, use its x y to translate the polygon, then apply scale.
console.log(JSON.stringify(
    // sortedNorms.slice(0,1).map(([norm,shapes]) => 
    // Turf.featureCollection(
        // sortedNorms.slice(0,3).map(([norm,shapes]) => 
    // Turf.dissolve(

        Turf.union(...sortedNorms.slice(0,4).map(([norm,shapes]) => 
            shapes.map(({x,y, scale, polygon}) => {
                return  applyShift(
                        applyScale(
                            motif[polygon].polygon,
                            "(" + scale + ")/2"
                        ),
                        ["(-(" + x + "))",y]
                    )
                .map(pt => pt.map(N))
            }).map(shape => {
                console.log(shape)
                return Turf.polygon([closePolygon(shape)])
            })
        ).flat()).geometry.coordinates
        
).replace(/\[/g, "{").replace(/\]/g, "}"))
// .replace(/\[/g, "{").replace(/\]/g, "}"))
    // ).flat())).features[0].geometry.coordinates
// ).replace(/\[/g, "{").replace(/\]/g, "}"))

function closePolygon(ptArray){
    return ptArray.concat(ptArray.slice(0,1))
}

function lambdafy(outer) {
    // wrap brackets around the string elements so Algebrite understands it as a matrix
    return `[${outer.map(inner => `[${inner.join()}]`).join()}]`;
}

function N(λstring) {
    return λ.float(λstring).d;
}

function applyShift(dimensions, shift) {
    // fuuuuuuuuu I'm making a copy of the array but the object reference are the same imma cry
    // I thought of doing this with dot product with a matrix transform but there's a bunch of adding and removing ones to make the shapes fit
    // so I thought why not just add to x and y
    let dimensionsClone = Array.from(dimensions, e => Array.from(e));
    for (var pt in dimensionsClone) {
        dimensionsClone[pt][0] = λ.run(`${dimensionsClone[pt][0]} + (${shift[0]})`); // had to wrap the shift in parans for it to accept negative offset
        dimensionsClone[pt][1] = λ.run(`${dimensionsClone[pt][1]} + (${shift[1]})`);
    }
    return dimensionsClone;
}
function applyScale(dimensions, scale) {
    // I thought of doing this with dot product with a matrix transform but there's a bunch of adding and removing ones to make the shapes fit
    // so I thought why not just add to x and y
    let dimensionsClone = Array.from(dimensions, e => Array.from(e));
    for (var pt in dimensionsClone) {
        dimensionsClone[pt][0] = λ.run(`${dimensionsClone[pt][0]} * (${scale})`); // had to wrap the shift in parans for it to accept negative offset
        dimensionsClone[pt][1] = λ.run(`${dimensionsClone[pt][1]} * (${scale})`);
    }
    return dimensionsClone;
}
// if string starts with [[ you've got a matrix to convert!
// would be better if N worked on single digits, vectors, and matrices, just detected how to walk over it
// or if I had an apply function that could take N and map it over vector or matrix.
// but how to return number | number[][], something to avoid?
// M for matrix, take result from Algebrite and return an array of string values
function M(matrix) {
    let comma = "\\,";
    let math = [
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
    return Array.from(matrix.match(new RegExp('[' + math + ']+' + comma + '[' + math + ']+', 'g')), result => result.split(','));
}
function calcSpin(x, y) {
    return Math.atan2(N(x), N(y));
    // return λ.run(`arctan(x,y)`)
}
function calcNorm(x, y) {
    return λ.run(`abs([${x},${y}])`);
}
function dot(dimensions, basis) {
    return λ.run(`dot(${lambdafy(dimensions)},${lambdafy(basis)})`);
}