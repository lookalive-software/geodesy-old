window.geodesy = {
    resize_delay: 50,
    getRandomID: () => Math.random().toString(36).match(/[a-z]/g).join(''),
    create: function(element){
        console.log("called create")
        if(!element.id) throw new Error("Cannot create a geodesy from an element with no ID")
        // keep a reference to the style sheet
        // kvetch the motif information
        // kvetch.get(`/cache/${geodesy.props.motif}/motif`).then(motifData => {
        element.appendChild(createElementary(
            motifStyle(element.id, window.cache[element.props.motif].motif)
        ))
            // needed to do this in control panel too
            // but that only happens when its first connected
            // this re-fires the propmodified events to the form upon creation
        element.props = element.props
            // document.body.appendChild(temp.content/)
            // attach style to document
            // need to get an array of clip path polygons, and an array of scales.
            // element.appendChild(elementary(interpolateStyleTag(motifData)))
        // attach the style tag, call resize and it will start kvetching position data and creating the norms...
        // call geodesy resize, it will graph the motif name off the element and decide what to do with the length attributes
    },
    resize: function(element){
        console.log("called resize")

        let visible = Array.from(element.querySelectorAll('norm.visibility'))
        console.log("VISIBLE", visible)
        if(visible.length < element.props.shells){ // implicit conversion from string to number for comparison
        // current number of children is the index into the next position. If I have 2 children, they are index 0 and 1, so the next child is index 2.
    
        // call elementary with this polygondata [name, number, polygondData[]]
        // map over the polygonData to interpolate the spin values into markup
        // attach the norm and spin markup to the geodesy element. 
        // it's ineffecient to build out the largest possible lattice before becoming interactive
        // so let's start with no lattice and build it up to meet the length requested
        // but then it's also wasteful to remove the norms once they're built, so we just hide them until they neede to be turned back on
            let normIndex = visible.length
            let availableNorms = element.querySelectorAll('norm')
            // if norm hasn't been deleted yet, cancel its timeout and keep using it...
            if(availableNorms[normIndex]){
                availableNorms[normIndex].classList.toggle('visibility') 
            } else {
                // otherwise fetch data and create new set of norms
                let nextNorm = window.cache[element.props.motif].norms[normIndex]
                element.appendChild(createElementary(normTemplate(normIndex, nextNorm)))
                setTimeout(()=>element.lastChild.classList.toggle('visibility'), 5) // wait til next tick to set visibility, trigger animation
            }
            setTimeout(
                () => geodesy.resize(element),
                geodesy.resize_delay
            ) // wait 50 miliseconds before recursing
        }
        if(visible.length > element.props.shells ){
            // from the list of visible elements, grab the last one
            visible.slice(-1).pop().classList.toggle('visibility') 
            setTimeout(
                () => geodesy.resize(element),
                geodesy.resize_delay
            )
        }
    },
    
    // make the grids swap out, animated
    // make the grids paintable // set background content via list of content, works with emojis, chess pieces, etc.
    // show how to programmatically move 'pieces' around a 'board' and you've got a game engine
    // how about a console that lets you programmatically submit 
    // double escape -- if lastEscTime - Date.now() < - 50, bring up console -- one console per element?
    // eval within the context, same as Textreeplot
    // hit 'esc' to change mode
    // make it so you can download image
    // make it so there's a 'biofilm' option where you paint a region to be activated as an indiviual markup frame
    // make it so you can type markdown and get its html base64 encoded into the iframe inside the painting
    // give it more than one layer, retain access to controls of previous layer
    // hide the controls
    
    destroy: function(element){
        console.log("called destroy")
        return new Promise(resolve => {
            // then delete child.
            let visible = element.querySelectorAll('norm.visibility')
            // could set some attribute to hide it / apply animation, delete it 50 ms later... 
            Array.from(visible, (norm, index) => {
                setTimeout(
                    () => norm.classList.toggle('visibility'),
                    geodesy.resize_delay * index // hide norms from the inside out, time delay multiplied by index
                )
            })
    
            setTimeout(function(){
                while(element.children.length){
                    element.lastChild.remove()
                }
                resolve()
            }, visible.length * geodesy.delay + geodesy.delay)
            // destroy tag...
            // when the form is removed, I'll want to call destroy and then set a timeout to actually destroy it
            // document.querySelector(`form[target="${element.props.id}"]`).remove()
        })
    },
    propModified: function({propName, oldValue, newValue}){
        // this propModifiedCallback is called with 'this' as the target element of the form.
        switch(propName){
            // maybe some photography settings
            case 'hyper-image':
            case 'infra-image':
                this.style.setProperty('--' + propName, `url(${newValue})`); break;
            case 'hyper-zoom':
                this.style.setProperty('--' + propName, newValue + '%'); break;
            case 'hyper-color':
            case 'infra-color':
            case 'backoff':
                this.style.setProperty('--' + propName, newValue); break;
            case 'radius':
                this.style.setProperty('--' + propName, newValue + 'px'); break;
            case 'shells':
                geodesy.resize(this)
                break
            case 'a':
            case 'b':
            // instead of top to bottom everything is inward and outward
                // for getting a bitmask from a linear function
                // create an array of 0s as long as you need
                // count up the length, while lastIndex < bitmask.length, 
                
                // while(a*x + b < bitmask.length){
                //     bitmask[a*x + b] = true
                //     x++
                // }
                // bitmask.map(Number).map(String).flat
                // // eat through the bitmask array 8 elements at a time, converting them to hexadecimal.
                // this.props.bitmask = "ff"
                // calculate new bitmask from ax+b
                let norms = Array.from(this.querySelectorAll('norm'))
                let bitmask = Array.from({length: norms.length}).fill(false)
                let a = parseInt(this.props.a) || 0 // hilarious, got but by duck typing, attribute was a string, "1" + 0 = 10 !
                let b = parseInt(this.props.b) || 0
                let x = 0
                console.log({x,a,b, axb: (a * x + b)})
                // check that the solution is within my bitmask length
                // and then set that length as 'true' according to our ax + b rule

                // while((a * x + b) <= bitmask.length){
                //     console.log({x,a,b, axb: (a * x + b)})
                //     bitmask[a * x + b] = true
                //     x++
                // }
                // iterate through this newly create true/false pattern
                // and iterate through all the targets (is the order deterministic, in order of the cached data?)
                // I need the bitmask activate routine running whenever norms are created
                norms.map((normElement, normIndex) => {
                    normElement.props.active = false // clear out 
                })
                norms.map((normElement, normIndex) => {
                    // for each element there is, plug it into ax + b, and set THAT element as active
                    if( norms[a * normIndex + b] ){
                        norms[a * normIndex + b].props.active = true
                    }
                    // normElement.props.active = bitmask[normIndex] // this is gonna set the on off value for each of the norms
                })
                // so that sets the isVisible prop as true or false according to the calculated bitmask Boolean[]
                // sheet.insertRule(`norm:nth-child(${this.props.a || 1}n + ${this.props.b || 0}) target {!important}`)
                break
            case 'motif':
                if(newValue != oldValue){
                    geodesy.destroy(this).then(()=> geodesy.create(this))
                }
                // what to do when the motif has changed?
                // delete current stylesheet
                // grab new stylesheet
                // reset attributes to trigger setting the style vars on the new stylesheet
                break
        }
    }
}
// when motif selection changes, I have to destroy the geodesy element with the old motif, and create it from scratc
// when motif changes, geodesyDestroy(element).then(()=>geodesyCreate(element))
// this removes old motifs // no longer have to worry about the style motifs getting created first, what ugly workaround did I have in place to deal with that?
