// this file attaches a stylesheet relating to forms on the page
// and then binds a template and callback to a control panel creator
// so any element passed to geodesyControl will get one of these forms made for it
// and a document fragment will be returnede to append where you want

document.head.appendChild(createElementary({"style": {
    "form":{
        "z-index":"1",
        "width":"300px",
        "background":"#d3d3d37d",
        "position":"absolute",
        "border":"1px solid rgba(0,0,0,0.2)",

        "display":"flex",
        "flex-direction":"column",
        "justify-content":"space-evenly",
        "align-items":"center",
    },
    "fieldset": {
        "margin-top":"10px",
        "width":"80%",
        "background":"#f4f4f4",
        
        "display":"flex",
        "flex-direction":"column",
        "justify-content":"space-evenly",

        "font-family":"monospace",
        "font-size":"large",
        "font-weight":"bold",

        "background": "linear-gradient(145deg, #f0f0f0, #cacaca)",
        "box-shadow":  "13px 13px 26px #a1a1a1, -13px -13px 26px #ffffff"
    },
    "label, section":{
        "display":"flex",
        "justify-content":"center",
        "align-items":"center",
    },
    "label > *, section > *": {
        "margin": "0 5px"
    },
    "input[type=\"radio\"]": {
        "display":"none"
    },
    "input[type=\"radio\"] ~ button ": {
        "opacity":"0.5",
        "position":"relative",
    },
    "input[type=\"radio\"]:checked ~ button ": {
        "opacity":"1",
        "box-shadow": "3px 2px 1px black",
        "top":"-3px",
        "left":"-3px"
    },
    "input[type=\"number\"]": {
        "width":"25%",
        "text-align":"center"
    },
    "input[type=\"color\"]": {
        "width":"70px",
        "height":"70px",
        "padding":"0",
        "position":"relative",
        "margin":"0 auto"
    },
    "[name=\"fg-color\"]":{
        "right":"15px",
        "bottom": "50px"
    },
    "[name=\"bg-color\"]":{
        "left":"15px",
        "top": "50px"

    },
    "summary":{
        "height":"1em"
    },
    "summary > legend":{
        "position":"relative",
        "top":"-1em",
        "left":"1em"
    },
}}))

let geodesyControl = controlpanel.bind(null, [
    {"fieldset":[
        {"legend":["general"]},
        {"label": [
            "motif",
            {"select name='motif'": [
                {"option": {"value": "none", "childNodes": ["none"]}},
                {"option": {"value": "square", "childNodes": ["square"]}},
                {"option": {"value": "pyritohedron", "childNodes": ["pyritohedron"]}},
                {"option": {"value": "p4octagon", "childNodes": ["p4octagon"], "selected":""}},
                {"option": {"value": "honeycomb", "childNodes": ["honeycomb"]}},
            ]}
        ]},
        {"label": [
            "radius", 
            {"input":{
                "name":"radius","type":"number","min":"5","max":"200","step":"5"
            }},
        ]},
        {"label": [
            "shells", 
            {"input":{
                "name":"shells","type":"number","min":"1","max":"50","step":"1"
            }}
        ]},
        {"label": [
            "tile size", 
            {"input":{
                "name":"backoff","type":"range","min":".1","max":"1.05","step":"0.05"
            }}
        ]},
    ]},
    {"fieldset":[
        {"legend":["foreground/background"]},
        {"input": {"type":"color", "name":"bg-color", "value":"#000000"}},
        {"input": {"type":"color","name":"fg-color", "value":"#ffffff" }},
        {"section":[
            "fill mode",
            {"div":[
                {"input": {"type":"radio", "name":"fillmode", "id":"merge", "checked":""}},
                {"button type='button'": [{"label for='merge'":["merge"]}]}
            ]},
            {"div":[
                {"input": {"type":"radio", "name":"fillmode", "id":"split"}},
                {"button type='button'": [{"label for='split'":["split"]}]},
            ]},
            {"div":[
                {"input": {"type":"radio", "name":"fillmode", "id":"none"}},
                {"button type='button'": [{"label for='none'":["none"]}]}
            ]}
        ]}
    ]},
    {"fieldset": [
        {"details":[
            {"summary": [{"legend": ["Linear Paint"]}]},
            {"label":[
                "a",
                {"input": {"type":"number", "min":"0","max":"50","step":"1","placeholder":"a","name":"a" }},
                "x",
                "+",
                {"input": {"type":"number", "min":"0","max":"50","step":"1","placeholder":"b", "name":"b"}},
                "b"
            ]}
        ]}
    ]}
    ], function({propName, oldValue, newValue}){
        // this propModifiedCallback is called with 'this' as the target element of the form.
        switch(propName){
            // maybe some photography settings
            case 'fg-color':
            case 'bg-color':
            case 'backoff':
                this.setStyleVar(propName, newValue)
                break
            case 'radius':
                this.setStyleVar(propName, newValue + 'px')
                break
            case 'shells':
                geodesyResize(this)
                break
            case 'a':
            case 'b':
                let sheet = this.querySelector('style').sheet
                if(sheet.rules[0].selectorText.includes('norm:nth-child')){
                    // there can only by one
                    sheet.deleteRule(0)
                }
                sheet.insertRule(`norm:nth-child(${this.props.a || 1}n + ${this.props.b || 0}) target {background: var(--fg-color) !important}`)
                break
            case 'motif':
                if(newValue != oldValue){
                    geodesyDestroy(this).then(()=> geodesyCreate(this))
                }
                // what to do when the motif has changed?
                // delete current stylesheet
                // grab new stylesheet
                // reset attributes to trigger setting the style vars on the new stylesheet
                break
        }
    }
)