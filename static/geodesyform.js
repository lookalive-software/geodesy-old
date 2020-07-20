// get form by id
// set change listeners to call functions on the geodesy object
// handle information coming from the cache, to attach HTML to page

// according to motif name selection
// make a request to grab the motif data

/**
 * a dropdown menu 
 * 
 */

// keep a reference to style tag and geodesy tag so if the dropdown changes I can remove them .remove()
// kvetch.get(`/cache/${motifSelection}/polygons`).then(res => {
//     // attach style to document
// })

// going to look for forms, and attach listeners to all their inputs
// for each form, queryselector input, select, textarea and for each of those, addeventlistener input (any changes) or change (committed changes)
// 

// when motif selection changes, I have to destroy the geodesy element with the old motif, and create it from scratch
function geodesyCreate(element){
    // kvetch the motif information
    kvetch.get(`/cache/${element.props.motif}/motif`).then(motifData => {
        document.body.innerHTML += elementary(interpolateStyleTag(motifData))
        // attach style to document
        // need to get an array of clip path polygons, and an array of scales.
        // element.appendChild(elementary(interpolateStyleTag(motifData)))
    })
    // attach the style tag, call resize and it will start kvetching position data and creating the norms...
    // call geodesy resize, it will graph the motif name off the element and decide what to do with the length attributes
}

function registerGeodesy(element){

}

function geodesyResize(element){
    // 
    if(element.children.length < element.props.length){
        console.log(`/cache/${element.props.motif}/norms/${element.children.length}`)
        // get data for
         // current number of children is the index into the next position. If I have 2 children, they are index 0 and 1, so the next child is index 2.
        kvetch.get(`/cache/${element.props.motif}/norms/${element.children.length}`)
              .then(normData => {
                    // call elementary with this polygondata [name, number, polygondData[]]
                    // map over the polygonData to interpolate the spin values into markup
                    // attach the norm and spin markup to the geodesy element. 
                    console.log(normData)
                    element.innerHTML += elementary(interpolateNormData(normData))
                    setTimeout(function(){ geodesyResize(element) }, 250)
              })
              .catch(error => {
                  console.log("failed to fetch norm index", error)
              })
    }
    if(element.children.length > element.props.length ){
        // then delete child.
        // could set some attribute to hide it / apply animation, delete it 50 ms later... 
        element.lastChild.remove()
        setTimeout(function(){ geodesyResize(element) }, 250)
    }
    // if its not greater than, and not less than, then no need to do any work

}

// make the grids swap out, animated
// make the grids paintable
// make it so you can download image
// make it so there's a 'biofilm' option where you paint a region to be activated as an indiviual markup frame
// make it so you can type markdown and get its html base64 encoded into the iframe inside the painting
// give it more than one layer, retain access to controls of previous layer
// hide the controls

function geodesyDisintegrate(element){
    // with a quick delay for animation purposes, remove first child 
    // while(element.children.length){
    //     element.firstChild.remove()
    // }
    element.children.forEach((child, index) => {
        setTimeout(function(){child.remove()}, index * 100) // a hundred millisecond wait * whatever child it is, first child gone right away, 10th child gone after a second...
    })
}

// for(var i = 0; i < 10; i++){
//     // for every norm requested, attach or remove from document.
//     kvetch.get(`/cache/${motifSelection}/positions/${i}`).then(res => {
//         console.log(res)
//     }).catch(e=>{
//         console.log(e)
//         // somehow illustrate that the request failed so you're probably asking for norms out of bounds, calculate more !
//     })
// }

/**
 * Now when I create a geodesy element, I can attach the functions to it with a simple attribute changed
 * element.onAttributeChanged = ({attribute, newValue}) => {
 *  switch(attribute){
 *      case 'length': geodesyResize()
 *      case 'motif': if newValue!=oldValue, disintegrate (delete from inside out, but for the style), then createNew.... 
 *      case 'bitmask'
 *      case 'radius'
 *  }
 * }
 */

function interpolateNormData([symbolicNorm, numericNorm, spinData]){
    return {"norm": {
        "id": symbolicNorm,
        "style": {"height": `Calc(var(--radius) * ${numericNorm} + var(--radius))`},
        "neighbors": spinData.length,
        "childNodes": spinData.map(spin => ({
            "spin": {
                "style": {"transform": `rotate(${spin.spin}rad)`},
                "childNodes":[
                    {"polygon":{
                        "polygon": `${spin.polygon}`,
                        "style": {"transform": 
                            `scale(Calc(var(--globalscale) * var(--localscale))) ` +
                            `rotateX(var(--twist)) ` +
                            `rotate(Calc(-1 * ${spin.spin}rad))`},
                        "childNodes":[{"target": {
                            // "style": {"transform": `rotate(${spin.spin}rad)`}
                        }}]
                    }}
                ]
            }
        }))
    }}
}


function interpolateStyleTag(motifData){
    return {"style": Object.assign({

        "geodesy, norm, spin, polygon, target":{
            "display": "block",
            "position": "absolute",
            "height": "var(--radius)",
            "width": "var(--radius)",
             "pointer-events": "none"
        },
        "geodesy":{
            "top": `Calc(50vh - (var(--radius) / 2))`,
            "left": `Calc(50vw - (var(--radius) / 2))`
        },
        "spin":{
            "transform-origin": `Calc(var(--radius) / 2) Calc(var(--radius) / 2)`,
            "height":"inherit"
        },
        "polygon": {
            "bottom": "0",
            // shadow blur goes here
            // shadow color goes here
            "background": "#aaa",
            "filter":"blur(3px)",

        },
        "target":{
            "pointer-events":"all",
            // "clip-path": "inherit"
            // shadow offset goes here
            // polygon color goes here
            "left":"3px",
            "top":"3px",
            "background":"white",
            "transition":"scale 0.25s"
        },
        "target:hover": {
            "left":"6px",
            "top":"6px"
        }}, // close style object, next argument for Object.assign is an array of polygon selectors
        ...motifData.map((shape, shapeIndex) => ({
            [`[polygon="${shapeIndex}"], [polygon="${shapeIndex}"] target`]: {
                "clip-path": shape.polygon,
                "--localscale": shape.scale
            }
        }))
    )}

}



// have to fetch motif data from cache... 

// function drawGeodesy([symbolicNorm, numericNorm, polygonData]){
//     elementary([
  
//         )},
//         {"geodesy": {
//             motif, bitmask, radius,
//             "childNodes": sortedNormData.map(([norm, spins]) => ({
//                 "norm": {
//                     "id": norm,
//                     "style": {"height": `Calc(var(--radius) * ${N(norm)} + var(--radius))`},
//                     "neighbors": spins.length,
//                     "childNodes": spins.map(spin => ({
//                         "spin": {
//                             "style": {"transform": `rotate(${spin.spin}rad)`},
//                             "childNodes":[
//                                 {"polygon":{
//                                     "polygon": String(spin.polygon),
//                                     "style": {"transform": `scale(Calc(var(--globalscale) * var(--localscale))) rotate(Calc(-1 * ${spin.spin}rad))`},
//                                     "childNodes":[{"target": {}}]
//                                 }}
//                             ]
//                         }
//                     }))
//                 }
//             }))
//         }}
// }