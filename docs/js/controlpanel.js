// I need one form which, when submitted, updates the target of the other form
// that 'other' form, will be listening for changes 

// control panel is a function which takes a form template, builds the form, starts listening for changes on the form
// whatever the target of the form is, its props are updated when something is changed on the form
// so I don't need to point the function to anything right away
// but it does need an 'onsubmit' function

// form#layers has a target of form#props, so when one of its radio buttons changes from selected to unselected, 
// form#layers has radio 'button's with 'name=target' 'value={id of connected geodesy}'

// when form#layers is submitted, it creates a new ID, creates a geodesy with current form values, with new id, creates 
// if title changes on geodesy, form#layers needs to update its label text. 

// geodesy gets created, onPropModified listeners are attached. 
// one listener is, if form#props[target] = event.id, update form values of any inputs with 

// so the radio 'button's have a disabled text input with name=title and some style, so that when the title prop changes on target geodesy, 
// the value of the title text input also updates -- in this way changes to the title on the form are propagated to the layers radio

// a form has a target, the 'props' value of the form is applied to the target on change, target.props = this.form
// for the 

window.controlpanel = function(template, callback, target_id){
    // here is where I know all my inputs...
    // create form with a target of the element id
    // lookup the target
    // set up a 
    // let formhtml = 
    let controls = {}
    let formTemplate = {"form": {"childNodes": template }}
    if(target_id) formTemplate.form.target = target_id

    let formFragment = createElementary(formTemplate)
    let target = document.getElementById(target_id)

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
            if(event.target.type == 'checkbox'){
                target.props[event.target.name] = event.target.checked
            } else {
                target.props[event.target.name] = event.target.value
            }
            // switch(event.target.type){
            //     case 'checkbox':
            //         target.props[event.target.name] = event.target.checked
            //         break
            //     case 'radio':
            //         target.props[event.target.name] = event.target.id
            //         break
            //     default:
            //         target.props[event.target.name] = event.target.value

            // }
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
    target.props = target.props
    // can't do this because I need style to exist before actually calling all the listeners
    // probably a bad design
    // if only there was a way to manage lifecycle
    // target.props = target.props // should populate form with values already on the target
    return formFragment
}