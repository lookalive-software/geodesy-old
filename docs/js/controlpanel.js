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

// form#layers[target='form#props'], as a controlpanel, any change to an input on form#layers updates the props on form#props (just the radio[name=target] value)
    // every input[type=radio] created is going to have a 'value' which matches the uuid of a geodesy, so when any geodesy title changes, form#layers should update the input[name=geodesy_id], 
    // form#layers has the 'create new space' button, 
    // basically each of these should be a 'functional' component, call a function to generate it, including stylesheets...
    // so load all of the support scripts, and load all of the components, some of which are global style components, so templates might be seperated by head/body
    // form
// form#props[target='geodesy#id'] as a control panel, any change to any input is a {k:v} input[name]:input.value applied to target.props
// form#props can have an 'onsubmit' listener which receives the details of the props, so onsubmit a formprops is prepared and emitted as event.details
    // so when submitted, 'copy2 of 234543' (use nextidnum()?) is used as the new title ... will propogate updates to form#layers 
    // create new geodesy with event.details, set propModified, reset props to initialize geodesy,
        // then set 'propModified' listener to keep form#props up to date with changes to geoesy -- only if event.target.id = this.target
        // so each geodesy has a propModified listener that goes back to form#props, 
        // and an eventlistener that goes back to form#layers, it will find the input with the name 'title' and set its new value...
        // geodesy.onpropmodified = event => radio#geoid 
// form#props is going to have to watch its own props
// form#props.addeventListener('onpropmodified') when target is changed, find the target and reset its props
    // targetElement = document.getElementById(target); targetElement.props = targetElement.props

    // 
function attachInputListeners(inputElement){

}

window.controlpanel = function(template, options = {}){
    // let {props, onsubmit, onpropmodified} = options // later

    let formElement = createElementary(
        {"form": Object.assign(options.props, {"childNodes": template })}
    ).querySelector('form')

    formElement.addEventListener('input', function(event){
        console.log("EVENT TARGET", event.target)
        console.log("THIS", this)
        // console.log("THIS.TARGET", this.target) // why did form.target get the radiochecklist???

        let target = document.getElementById(this.props.target)
        if(!target){
            return null
        } else if(event.target.type == 'checkbox'){
            target.props[event.target.name] = event.target.checked // sets the targets property as "true" or "false"
        } else {
            target.props[event.target.name] = event.target.value // sets the target property to match the form value
        }
    })

    return formElement
}