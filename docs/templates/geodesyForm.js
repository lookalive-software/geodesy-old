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
    {"fieldset": [ // changes to a and b will recalculate bitmask 
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
    ]},
    {"fieldset":[ // change of bitmask will cause fill=true reflow
        {"details":[
            {"summary": [{"legend": ["Bitmask Paint"]}]},
            {"label":[
                {"input": {"type":"textarea"}}
            ]},
        ]},
    ]},
    {"fieldset": [
        {"details":[
            {"summary": [{"legend": ["Background Image"]}]},
            {"label":[
                "image url",
                {"input": {"type":"text", "name":"bg-url" }},
            ]},
            {"label":[
                "zoom",
                {"input": {"type":"range", "min":"5","max":"250","name":"bg-zoom" }},
            ]},
            {"label":[
                "x offset",
                {"input": {"type":"range", "min":"5","max":"250","name":"bg-xoffset" }},
            ]},
            {"label":[
                "y offset",
                {"input": {"type":"range", "min":"5","max":"250","name":"bg-yoffset" }},
            ]},
            {"label":[
                "center facing",
                {"input": {"type":"checkbox","name":"bg-counter-rotate" }},
            ]}
        ]}
    ]}
    ], function({propName, oldValue, newValue}){
        // this propModifiedCallback is called with 'this' as the target element of the form.
        switch(propName){
            // maybe some photography settings
            case 'bg-url':
                this.setStyleVar(propName, `url(${newValue})`)
                break
            case 'bg-zoom':
                this.setStyleVar(propName, newValue + '%')
                break
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
                //
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