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


// document.addEventListener('')
Array.from(document.querySelectorAll('form'),function(formElemenet){
    console.log(formElemenet.props.target)
    Array.from(formElemenet.querySelectorAll('input, select'), function(inputElement){
        // find target and set values according to target props to initialize
        // size, motif, zoom, pos-x, pos-y
        console.log(inputElement)
        // inputElement.props.oninput = ".submit()"
        inputElement.addEventListener('input',function(event){

            targetElement = formElemenet.props.target
            targetAttribute = event.target.props.for
            targetValue = event.target.value
            document.getElementById(targetElement).props[targetAttribute] = targetValue
        })
    })
})
// wooowwww when nyou use document.body.innerHTML += it recreates the document, erasing all your event liseners :O

geodesy.onAttributeChanged = function({attribute, oldValue, newValue}){
    console.log({attribute, newValue})
    // console.log({"this":this})
    switch(attribute){
        case 'xoffset':
        case 'yoffset':
        case 'zoom':
            this.style.transform = `scale(${this.props.zoom || 1}) translateX(${this.props.xoffset || 0}vw) translateY(Calc(-1 * (${this.props.yoffset || 0}vh))`
            break
        case 'size':
            geodesyResize(this)
            break;
    }
}
// set props to self once geodesyresize is attached

// setTimeout(function(){geodesyResize(geodesy)},1000)

// when motif selection changes, I have to destroy the geodesy element with the old motif, and create it from scratch
function geodesyCreate(){
    // keep a reference to the style sheet

    // kvetch the motif information
    // kvetch.get(`/cache/${geodesy.props.motif}/motif`).then(motifData => {
        var temp = document.createElement('template')
        temp.innerHTML += elementary(interpolateStyleTag(window.cache[geodesy.props.motif].motif))
        document.body.appendChild(temp.content)
        // document.body.appendChild(temp.content/)
        // attach style to document
        // need to get an array of clip path polygons, and an array of scales.
        // element.appendChild(elementary(interpolateStyleTag(motifData)))
    // attach the style tag, call resize and it will start kvetching position data and creating the norms...
    // call geodesy resize, it will graph the motif name off the element and decide what to do with the length attributes
}

function registerGeodesy(element){

}

function keypath(object, keypath){
    keypath = keypath.filter(Boolean)
    while(keypath.length && object){
        object = object[keypath.shift()]
    }
    return object
}

window.cache = {}
Promise.all([
    kvetch.get(`/cache/square`).then(res => {
        console.log(res)
        window.cache.square = res
    }),
    kvetch.get(`/cache/pyritohedron`).then(res => {
        window.cache.pyritohedron = res
    }),
    kvetch.get(`/cache/honeycomb`).then(res => {
        window.cache.honeycomb = res
    }),
    kvetch.get(`/cache/p4octagon`).then(res => {
        window.cache.p4octagon = res
    })
]).then(promises=>{
    console.log(promises)
    geodesyCreate() // maybe once motif is changed?
    geodesyResize(geodesy) // maybe once motif is changed?    
})

function geodesyResize(element){
    // 
    if(element.children.length < element.props.size){
        // console.log(`/cache/${element.props.motif}/norms/${element.children.length}`)
        // get data for
         // current number of children is the index into the next position. If I have 2 children, they are index 0 and 1, so the next child is index 2.

                    // call elementary with this polygondata [name, number, polygondData[]]
                    // map over the polygonData to interpolate the spin values into markup
                    // attach the norm and spin markup to the geodesy element. 
        let normData = window.cache[element.props.motif].norms[element.children.length]
        console.log(normData)

        var temp = document.createElement('template')
        temp.innerHTML += elementary(interpolateNormData(normData))
        element.appendChild(temp.content)

        setTimeout(function(){ geodesyResize(element) }, 50)

    }
    if(element.children.length > element.props.size ){
        // then delete child.
        // could set some attribute to hide it / apply animation, delete it 50 ms later... 
        element.lastChild.remove()
        setTimeout(function(){ geodesyResize(element) }, 50)
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


