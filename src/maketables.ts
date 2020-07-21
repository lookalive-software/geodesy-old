/// <reference path="types/geodesy.d.ts"/>

// OK so this file is going to have some default value for how many layers of norms to calculate
// the server will load these files up to provide instant access to all properties
// a couple of megabytes max.

/**
 * As for what proprties need to exist at each level
 * An individual <polygon> just needs to know its [spin]
 * Each <norm> can have a human readable label, plus numeric label, used to calc height
 * 
 * scale is a property of the polygon and can be applied with clippath within <style> 
 * doens't need to be applied individually
 * Can still be overriden with more specificity, norm:nth-child(2n){--scale: 0.1} should force
 * recalculation over default scale value from motif/json file.
 */

 /**
  * So the steps for calculation are, choose x and y dimensions for the source table
  * Apply origin and basis transformations
  * calculate norm and spin of each point, pushing into a normData object
  * sort the normData object and save it to the cache folder. make if doesn't exist.
  */

import * as fs from 'fs'
import * as path from 'path'
import * as λ from './mathutils'
// create cache whether or not it exists
fs.mkdirSync('./cache', {recursive: true})

const tableSize:{x:number, y:number} = {x: 10, y: 10}


// for each file in the motif directory...
fs.readdirSync('./motif').map(filename => {
    let {name} = path.parse(filename)
    let motifData = require('../motif/' + name + '.json')['motif'] as Motif[]
    let metaData = require('../motif/' + name + '.json')['meta'] as object
    
    let normData:NormData = {}
    let sortedNormData:SortedNormData = []
    // calculate the tables for that motif and save them
    motifData.forEach((motif, motifIndex) => {
        let basispts = λ.applyShift(
            λ.M(
                λ.dot(
                    λ.table(tableSize.x, tableSize.y),
                    motif.basis
                )
            ), 
            motif.offset
        )
        basispts.forEach(([x,y], pointIndex) => {
            let thisnorm = λ.calcNorm(x,y)
            let thisspin = λ.calcSpin(x,y)
        
            let polygonData:PolygonData = {
                "x":x, "y":y,
                "spin": thisspin,
                polygon: motifIndex
            }
            // first I have to treat normData as a hashmap
            // to sort spins into categories
            if(normData[thisnorm]){
                normData[thisnorm].push(polygonData)
            } else {
                normData[thisnorm] = [polygonData]
            }
        })
    })
    
    sortedNormData = Object
        .entries(normData)
        .map(([norm, polygonData]) => [norm, λ.N(norm), polygonData.sort((a,b) => a.spin - b.spin)])
    
    sortedNormData.sort((a,b) => {
        return a[1] - b[1] // use numeric values to sort from smallest to largest 'ring' of neighbors
    })

    fs.writeFileSync("./cache/" + name + ".json", JSON.stringify({
        meta: metaData,
        motif: motifData.map(polygonData => Object.assign(polygonData, {
            clippath: λ.polygon2clippath(polygonData.polygon),
            scale:  λ.N(polygonData.scale)
        })),
        norms: sortedNormData
    }, null, 2));
})


//    fs.writeFileSync(`cache/${motif}.json`, JSON.stringify(normData, null, 2))
   // console.log(normData)
   // // each key of normData is the norm for that set of spin/polygons
   // // each spin element carries 
   // for(var norm of Object.keys(normData)){
   //     normData[norm]