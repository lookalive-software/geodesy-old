// this file attaches a stylesheet relating to forms on the page
// and then binds a template and callback to a control panel creator
// so any element passed to geodesyControl will get one of these forms made for it
// and a document fragment will be returnede to append where you want

// want-to-haves
// infrashadow, hypershadow, offset x and y, inset or outset. very bad performance with css tho. Maybe SVG will be better.
let max_shells = 50 // boost when recalculating tables

window.templates = window.templates || {}
window.templates.formPropsTemplate = () => ([
    {"input": {
        "type":"text",
        "name":"title",
        "value":"untitled",
        "autocomplete":"off"
    }},
    {"fieldset":[
        {"label": [
            "motif",
            {"select name='motif'": [
                {"option": {"value": "none", "childNodes": ["none"]}},
                {"option": {"value": "square", "childNodes": ["square"]}},
                {"option": {"value": "pyritohedron", "childNodes": ["pyritohedron"]}},
                {"option": {"value": "p4octagon", "childNodes": ["p4octagon"], "selected":""}},
                {"option": {"value": "honeycomb", "childNodes": ["honeycomb"]}},
                {"option": {"value": "doublesquares", "childNodes": ["doublesquares"]}},
                {"option": {"value": "alternatetriangles", "childNodes": ["alternatetriangles"]}},
            ]}
        ]},
        {"label": [
            "radius", 
            {"input":{
                "name":"radius","type":"number","min":"5","max":"250","step":"5","value":"100"
            }},
        ]},
        {"label": [
            "shells", 
            {"input":{
                "name":"shells","type":"number","min":"1","max": max_shells,"step":"1","value":"10"
            }}
        ]},
        {"label": [
            "gap size", 
            {"input":{
                "name":"backoff","type":"range","min":".1","max":"1.05","step":"0.05", "value":"0.9"
            }}
        ]},
        {"section":[
            "mode",
            {"div tabindex='0'":[
                {"input": {"type":"radio", "name":"fillmode", "value":"merge", "id":"merge", "checked":""}},
                // having the label inside the button might be backwards, I want a button inside the label for better click action
                {"label for='merge'":["merge"]}
            ]},
            {"div tabindex='0'":[
                {"input": {"type":"radio", "name":"fillmode", "value":"split", "id":"split"}},
                {"label for='split'":["split"]},
            ]},
            {"div tabindex='0'":[
                {"input": {"type":"radio", "name":"fillmode", "value":"none", "id":"none"}},
                {"label for='none'":["none"]}
            ]}
        ]}
    ]},
    {"fieldset": [
        {"label": [
            {"input": {"type":"color", "name":"infra-color", "value":"#333333"}},
            {"input": {"type":"color","name":"hyper-color", "value":"#eeeeee" }},
        ]},
        {"section id='drawerase'":[ 
            {"div":[
                {"input": {"type":"radio", "name":"draw", "id":"paint","value":"paint", "checked":""}},
                {"button type='button'": [{"label for='paint'":["paint"]}]}
            ]},
            {"div":[
                {"input": {"type":"radio", "name":"draw", "id":"erase", "value":"erase"}},
                {"button type='button'": [{"label for='erase'":["erase"]}]},
            ]}
        ]},
    ]},
    // maybe a checkbox for "right click to erase'
    // but for now I need a field set that sets an interactive flag
    // draw=paint draw=erase
    {"fieldset": [ // changes to a and b will recalculate bitmask 
        {"details":[
            {"summary": [{"legend": ["Linear Paint"]}]},
            {"label id='linearpaint'":[
                "a",
                {"input": {"type":"number", "min":"0","max":max_shells,"step":"1","placeholder":"a","name":"a"}},
                "x",
                "+",
                {"input": {"type":"number", "min":"0","max":max_shells,"step":"1","placeholder":"b", "name":"b"}},
                "b"
            ]}
        ]}
    ]},
    // {"fieldset":[ // change of bitmask will cause fill=true reflow
    //     {"details":[
    //         {"summary": [{"legend": ["Bitmask Paint"]}]},
    //         {"label":[
    //             {"input": {"type":"textarea"}}
    //         ]},
    //     ]},
    // ]},
    {"fieldset": [
        {"details":[
            {"summary": [{"legend": ["Hyper Image"]}]},
            // examples
            // drop down, options: deep field, reflecting pool, rule 120 etc... river delta
            {"label": [
                "example",
                {"select name='hyper-image'": [
                    {"option": {"value": "", "childNodes": [" "]}},
                    {"option":{"value":"/glaze/asteroid.gif","childNodes":["asteroid.gif"]}},
                    {"option":{"value":"/glaze/calm water.gif","childNodes":["calm water.gif"]}},
                    {"option":{"value":"/glaze/caustic1.gif","childNodes":["caustic1.gif"]}},
                    {"option":{"value":"/glaze/caustic2.gif","childNodes":["caustic2.gif"]}},
                    {"option":{"value":"/glaze/earth.gif","childNodes":["earth.gif"]}},
                    {"option":{"value":"/glaze/fabric.png","childNodes":["fabric.png"]}},
                    {"option":{"value":"/glaze/Hex Rule 14 - 150 steps.png", "childNodes":["Hex Rule 14 - 150 steps.png"]}},
                    {"option":{"value":"/glaze/Hex Rule 18 - 100 steps.png", "childNodes":["Hex Rule 18 - 100 steps.png"]}},
                    {"option":{"value":"/glaze/Hex Rule 26 - 150 steps.png", "childNodes":["Hex Rule 26 - 150 steps.png"]}},
                    {"option":{"value":"/glaze/Hex Rule 26 - 75 steps.png", "childNodes":["Hex Rule 26 - 75 steps.png"]}},
                    {"option":{"value":"/glaze/Hex Rule 38 - 125 steps.png", "childNodes":["Hex Rule 38 - 125 steps.png"]}},
                    {"option":{"value":"/glaze/Hex Rule 42 - 100 steps.png", "childNodes":["Hex Rule 42 - 100 steps.png"]}},
                    {"option":{"value":"/glaze/Hex Rule 42 - 75 steps.png", "childNodes":["Hex Rule 42 - 75 steps.png"]}},
                    {"option":{"value":"/glaze/Hex Rule 46 - 100 steps.png", "childNodes":["Hex Rule 46 - 100 steps.png"]}},
                    {"option":{"value":"/glaze/Hex Rule 62 - 100 steps.png", "childNodes":["Hex Rule 62 - 100 steps.png"]}},
                    {"option":{"value":"/glaze/Hex Rule 66 - 100 steps.png", "childNodes":["Hex Rule 66 - 100 steps.png"]}},
                    {"option":{"value":"/glaze/Hex Rule 94 - 100 steps.png", "childNodes":["Hex Rule 94 - 100 steps.png"]}},
                    {"option":{"value":"/glaze/honeycomb34i3j3.png", "childNodes":["honeycomb34i3j3.png"]}},
                    {"option":{"value":"/glaze/Hubble 11.jpg", "childNodes":["Hubble 11.jpg"]}},
                    {"option":{"value":"/glaze/Hubble 2.jpg", "childNodes":["Hubble 2.jpg"]}},
                    {"option":{"value":"/glaze/Hubble 24.jpg", "childNodes":["Hubble 24.jpg"]}},
                    {"option":{"value":"/glaze/Hubble 25.jpg", "childNodes":["Hubble 25.jpg"]}},
                    {"option":{"value":"/glaze/Hubble 3.jpg", "childNodes":["Hubble 3.jpg"]}},
                    {"option":{"value":"/glaze/Hubble 4.jpg", "childNodes":["Hubble 4.jpg"]}},
                    {"option":{"value":"/glaze/Hubble 8.jpg", "childNodes":["Hubble 8.jpg"]}},
                    {"option":{"value":"/glaze/Hubble 9.jpg", "childNodes":["Hubble 9.jpg"]}},
                    {"option":{"value":"/glaze/jupiter.gif", "childNodes":["jupiter.gif"]}},
                    {"option":{"value":"/glaze/lowpolyearth.gif", "childNodes":["lowpolyearth.gif"]}},
                    {"option":{"value":"/glaze/moon 360.gif", "childNodes":["moon 360.gif"]}},
                    {"option":{"value":"/glaze/moon phases.gif", "childNodes":["moon phases.gif"]}},
                    {"option":{"value":"/glaze/neighbors108.png", "childNodes":["neighbors108.png"]}},
                    {"option":{"value":"/glaze/neighbors158.png", "childNodes":["neighbors158.png"]}},
                    {"option":{"value":"/glaze/p4octagon20i2j2.png", "childNodes":["p4octagon20i2j2.png"]}},
                    {"option":{"value":"/glaze/pretty stars.gif", "childNodes":["pretty stars.gif"]}},
                    {"option":{"value":"/glaze/river.png", "childNodes":["river.png"]}},
                    {"option":{"value":"/glaze/Rule 10 - 125 steps.png", "childNodes":["Rule 10 - 125 steps.png"]}},
                    {"option":{"value":"/glaze/Rule 14 - 75 steps.png", "childNodes":["Rule 14 - 75 steps.png"]}},
                    {"option":{"value":"/glaze/Rule 18 - 150 steps.png", "childNodes":["Rule 18 - 150 steps.png"]}},
                    {"option":{"value":"/glaze/Rule 26 - 100 steps.png", "childNodes":["Rule 26 - 100 steps.png"]}},
                    {"option":{"value":"/glaze/Rule 30 - 100 steps.png", "childNodes":["Rule 30 - 100 steps.png"]}},
                    {"option":{"value":"/glaze/Rule 30 - 301 steps.png", "childNodes":["Rule 30 - 301 steps.png"]}},
                    {"option":{"value":"/glaze/Rule 42 - 100 steps.png", "childNodes":["Rule 42 - 100 steps.png"]}},
                    {"option":{"value":"/glaze/Rule 42 - 125 steps.png", "childNodes":["Rule 42 - 125 steps.png"]}},
                    {"option":{"value":"/glaze/Rule 42 - 75 steps.png", "childNodes":["Rule 42 - 75 steps.png"]}},
                    {"option":{"value":"/glaze/Rule 58 - 100 steps.png", "childNodes":["Rule 58 - 100 steps.png"]}},
                    {"option":{"value":"/glaze/Rule 62 - 150 steps.png", "childNodes":["Rule 62 - 150 steps.png"]}},
                    {"option":{"value":"/glaze/Rule 62 - 301 steps.png", "childNodes":["Rule 62 - 301 steps.png"]}},
                    {"option":{"value":"/glaze/Rule 70 - 200 steps.png", "childNodes":["Rule 70 - 200 steps.png"]}},
                    {"option":{"value":"/glaze/Rule 78 - 100 steps.png", "childNodes":["Rule 78 - 100 steps.png"]}},
                    {"option":{"value":"/glaze/Rule 94 - 100 steps.png", "childNodes":["Rule 94 - 100 steps.png"]}},
                    {"option":{"value":"/glaze/Rule 94 - 150 steps.png", "childNodes":["Rule 94 - 150 steps.png"]}},
                    {"option":{"value":"/glaze/Rule 94 - 300 steps.png", "childNodes":["Rule 94 - 300 steps.png"]}},
                    {"option":{"value":"/glaze/rule14.png", "childNodes":["rule14.png"]}},
                    {"option":{"value":"/glaze/rule15.png", "childNodes":["rule15.png"]}},
                    {"option":{"value":"/glaze/rule90.png", "childNodes":["rule90.png"]}},
                    {"option":{"value":"/glaze/Saturn.jpg", "childNodes":["Saturn.jpg"]}},
                    {"option":{"value":"/glaze/spacedebris.gif", "childNodes":["spacedebris.gif"]}},
                    {"option":{"value":"/glaze/sunlight.gif", "childNodes":["sunlight.gif"]}},
                    {"option":{"value":"/glaze/sunset.gif","childNodes":["sunset.gif"]}}
                ]}  
            ]},
            {"label":[
                "image url",
                {"input": {"type":"text", "name":"hyper-image" }},
            ]},
            {"label":[
                "zoom",
                {"input": {"type":"range", "min":"10","max":"400","name":"hyper-zoom" }},
            ]},
            {"label":[
                "x offset",
                {"input": {"type":"range", "value":"50", "min":"0","max":"100","name":"hyper-xoffset" }},
            ]},
            {"label":[
                "y offset",
                {"input": {"type":"range", "value":"50", "min":"0","max":"100","name":"hyper-yoffset" }},
            ]},
            {"label":[
                "rotation",
                {"input": {"type":"range", "value":"0", "min":"-3.14159","max":"3.14159","name":"hyper-image-spin" }},
            ]},
            {"label":[
                "center facing",
                {"input": {"type":"checkbox","name":"hyper-counter-rotate", "checked":""}},
            ]}
        ]}
    ]}
])