    // dataBindings is an object with a callback function for a list of attributes, basically a switch statement
    // maybe can be an array of fieldsets if I want to allow easier grouping
    // write the form markup,   
    // when a propModified event is received, make sure to update the input for = selectortext
    // a slider for polygon offset 
    // a slider for min-max orbits #
    // a slider for lattice offset from origin
    // a slider for lattice rotation around origin
// examplebinding = { // 
// ability to name a section, and keep function calls working on just the inputs they need to be
// whenever the input is changed, that calls target.props[id] = newValue
// and that triggers the callback here, on(propModified){callbacks[propName](propName, oldValue, newValue)}
            // "autopaint: ax+b":{
            //     "fieldset":[ // create this fieldset with the name key
            //         {"label": [{"input": {"placeholder": "a","id":"a","type":"number"}}]},
            //         {"label": ["x +"]},
            //         {"label": [{"input": {"placeholder": "b","id":"b","type":"number"}}]},
            //     ],
            //     "onPropModified": function(propName, oldValue, newValue){
            //         this.props.a, this.props.b
            //     } 
            // },
            // "polygon offset":{
            //     "fieldset": [{"input": {"type":"range", "id":"polyoffset","min":"0.1","max":"1.1","step":"0.05"}}],
            //     "onPropModified": function(propName, oldValue, newValue){
            //         this.props.polyoffset // this should reach into a stylesheet, replace clippath polygon() with recalculated offset polygon
            //     }
            // }
            // "n of orbits": {
            //     "fieldset": [{

            //     }]
            // }

// whatever the id of the input, that's the attribute that receives the new value. 
// I'll also use each of those ids to set up the callback function to be called only on one of these changes...
// inside this loop, add to a set: id: a -> thiscallbackfunction, id:b -> thiscallbackfunction, whatever the attribute name, have a specific callback function bound to it...
// } 

// examplebodypaint = {
//     "the color": {
//         "fieldset":[{"input":{"type":"color", "id":"thecolor"}}],
//         "onPropModified": function({propName, oldValue, newValue}){
//             console.log("THE COLOR", newValue)
//             this.style.background = newValue
//         }
//     }
// }
// controlpanel('body', [{"input":{"type":"color", "id":"thecolor"}}], ({propName, oldValue, newValue}) => {
//     switch(propName){
//         case 'thecolor':
//             this.style.background = newValue
//     }
// })

// okay it's going to be a form markup, followed by the propModifiedCallback

// just have to createElementary() on the fieldset element, 
// then queryselector for inputs, attach the updatelistener to the form, so prop is modified

// elementID is the selectorText of the element you hope to control
// template is all the form with all its inputs and ids... callback is ...

// right now its attaching itself but could just as well just return the element
// and put it somewhere else
window.controlpanel = function(elementID, template, callback){
    // here is where I know all my inputs...
    // create form with a target of the element id
    // lookup the target
    // set up a 
    // let formhtml = 
    let controls = {}
    let target = document.getElementById(elementID)

// create the form
    document.body.appendChild(createElementary(
        {"form": {"target":elementID, "childNodes": template }}
    ))

// the find all the inputs and iterate through them
    Array.from(document.querySelectorAll(`form[target=${elementID}] input, form[target=${elementID}] select`),function(inputElement){
        // create a set of references for an input that will need to be updates to a prop update...
        controls[inputElement.id] = inputElement
        // attach a listener to set props on the target with the value
        inputElement.addEventListener('input', event => {
            // check type, if checkbox send .checked
            target.props[event.target.id] = event.target.type == 'checkbox' ? event.target.checked : event.target.value
            // this should fire propsModified...
        })
    })

    target.addEventListener('propModified', (event) => {
        let {propName, oldValue, newValue} = event.detail
        // if a change occured, and a control exists, set the value of that input
        if((oldValue != newValue) && controls[propName]){
             controls[propName].value = newValue
        }
        callback.call(target, {propName, oldValue, newValue}) // then use the actual callback
    })

    target.props = target.props
}