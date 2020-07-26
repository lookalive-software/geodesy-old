// create another blank form, create a geodesy element with all the desired props

window.controlpanel = function(template, callback, target){
    // here is where I know all my inputs...
    // create form with a target of the element id
    // lookup the target
    // set up a 
    // let formhtml = 
    let controls = {}
// create the form
    let formFragment = createElementary(template)

    if(!target) return formFragment
    // if there is a target, we're not done
// on submit, iterate through input/select/textarea and grab their values as props,
// and create a {geodesy: props} element with that, no use that newly created element to create a new controlpanel
// 

// the find all the inputs and iterate through them
    Array.from(formFragment.querySelectorAll(`input, select, textArea`), function(inputElement){
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

    // 
    target.addEventListener('propModified', (event) => {
        let {propName, oldValue, newValue} = event.detail
        // if a change occured, and a control exists, set the value of that input
        if(controls[propName]){
            controls[propName].value = newValue
            // this probably doesn't work for radio buttons
            // they have the same propname 
            // for radio, will have to iterate and pick the one with the id of the value
            // if propname is 'checkbox', set .checked to true or false, 
        }
        callback.call(target, {propName, oldValue, newValue}) // then use the actual callback
    })

    // trigger propModified events to update form to attribute values on target
    // target.props = target.props
    // can't do this because I need style to exist before actually calling all the listeners
    // probably a bad design
    // if only there was a way to manage lifecycle
    // target.props = target.props // should populate form with values already on the target
    return formFragment
}