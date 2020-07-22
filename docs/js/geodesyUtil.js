
// when motif selection changes, I have to destroy the geodesy element with the old motif, and create it from scratch
function geodesyCreate(element){
    console.log("called create")
    if(!element.id) throw new Error("Cannot create a geodesy from an element with no ID")
    // keep a reference to the style sheet
    // kvetch the motif information
    // kvetch.get(`/cache/${geodesy.props.motif}/motif`).then(motifData => {
    element.appendChild(createElementary(
        motifStyle(element.id, window.cache[element.props.motif].motif)
    ))

    element.props = element.props
        // document.body.appendChild(temp.content/)
        // attach style to document
        // need to get an array of clip path polygons, and an array of scales.
        // element.appendChild(elementary(interpolateStyleTag(motifData)))
    // attach the style tag, call resize and it will start kvetching position data and creating the norms...
    // call geodesy resize, it will graph the motif name off the element and decide what to do with the length attributes
}

// when motif changes, geodesyDestroy(element).then(()=>geodesyCreate(element))
// this removes old motifs


function geodesyResize(element){
    console.log("called resize")

    let visible = element.querySelectorAll('norm.visibility')
    if(visible.length < element.props.shells){ // implicit conversion from string to number for comparison
    // current number of children is the index into the next position. If I have 2 children, they are index 0 and 1, so the next child is index 2.

    // call elementary with this polygondata [name, number, polygondData[]]
    // map over the polygonData to interpolate the spin values into markup
    // attach the norm and spin markup to the geodesy element. 
        let normIndex = visible.length
        let availableNorms = element.querySelectorAll('norm')
        // if norm hasn't been deleted yet, cancel its timeout and keep using it...
        if(availableNorms[normIndex]){
            availableNorms[normIndex].classList.toggle('visibility') 
        } else {
            // otherwise fetch data and create new set of norms
            let nextNorm = window.cache[element.props.motif].norms[normIndex]
            element.appendChild(createElementary(normData(normIndex, nextNorm)))
            setTimeout(()=>element.lastChild.classList.toggle('visibility'), 5)
            // console.log('neighbors', element.lastChild.props.neighbors)
        }
        
        setTimeout(function(){ geodesyResize(element) }, 50)
    }
    if(visible.length > element.props.shells ){
        // then delete child.
        // could set some attribute to hide it / apply animation, delete it 50 ms later... 
        let markedForDeletion = visible[visible.length - 1]
        markedForDeletion.classList.toggle('visibility') 
        setTimeout(()=>geodesyResize(element), 50)
    }
}

// make the grids swap out, animated
// make the grids paintable
// make it so you can download image
// make it so there's a 'biofilm' option where you paint a region to be activated as an indiviual markup frame
// make it so you can type markdown and get its html base64 encoded into the iframe inside the painting
// give it more than one layer, retain access to controls of previous layer
// hide the controls

function geodesyDestroy(element){
    console.log("called destroy")

    return new Promise(resolve => {
        // then delete child.
        let visible = element.querySelectorAll('norm.visibility')
        // could set some attribute to hide it / apply animation, delete it 50 ms later... 
        Array.from(visible, (norm, index) => {
            setTimeout(()=>norm.classList.toggle('visibility'), 50 * index)
        })

        setTimeout(function(){
            while(element.children.length){
                element.lastChild.remove()
            }
            resolve()
        }, visible.length * 50 + 250)
        // destroy tag...
        // when the form is removed, I'll want to call destroy and then set a timeout to actually destroy it
        // document.querySelector(`form[target="${element.props.id}"]`).remove()
    })
}