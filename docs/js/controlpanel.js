window.controlpanel = function(template, callback, target){
    // here is where I know all my inputs...
    // create form with a target of the element id
    // lookup the target
    // set up a 
    // let formhtml = 
    let controls = {}
// create the form
    let formFragment = createElementary(
        {"form": template}
    )

// the find all the inputs and iterate through them
    Array.from(formFragment.querySelectorAll(`input, select, textArea`),function(inputElement){
        // create a set of references for an input that will need to be updates to a prop update...
        controls[inputElement.name] = inputElement
        // attach a listener to set props on the target with the value
        inputElement.addEventListener('input', event => {
            // check type, if checkbox send .checked
            switch(event.target.type){
                case 'checkbox':
                    target.props[event.target.name] = event.target.checked
                    break
                case 'radio':
                    target.props[event.target.name] = event.target.id
                    break
                default:
                    target.props[event.target.name] = event.target.value

            }
        })
    })

    target.addEventListener('propModified', (event) => {
        let {propName, oldValue, newValue} = event.detail
        // if a change occured, and a control exists, set the value of that input
        if(controls[propName]){
            controls[propName].value = newValue
            // this probably doesn't work for radio buttons
            // they have the same propname
        }
        callback.call(target, {propName, oldValue, newValue}) // then use the actual callback
    })

    // target.props = target.props // should populate form with values already on the target
    return formFragment
}