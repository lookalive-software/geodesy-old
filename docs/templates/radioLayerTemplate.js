window.templates = window.templates || {}
window.templates.radioLayerTemplate = function(geoid){
    let randomID = geodesy.getRandomID()
    // better have a title on the form when creating...
    // or check of the title already exists on the page and increment it until one doesn't
    let title = String(document.getElementById(geoid).props.title) // might be empty string or coerced to unknown
    // this takes the id of a newly created geodesy and returns a radio button that, onchange, sets the target prop to equal that targets ID
    return {
        "fieldset":[
            {"input": {
                "type":"radio",
                "name":"target", // this is the name of the prop to effect on this forms target on change
                "value": String(geoid), // this is the value to use for the new prop
                "id": randomID, // this is random ID to match with the label
                "checked":"" // this should set the new element as the checked element
            }},
            // having the label inside the button might be backwards, I want a button inside the label for better click action
            {"label": {
                "for": randomID,
                "childNodes": [title] // this should have its textcontent overwritten on title change from geodesy.onpropmodified
            }}
        ]
    }
}