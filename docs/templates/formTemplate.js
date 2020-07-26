// this file attaches a stylesheet relating to forms on the page
// and then binds a template and callback to a control panel creator
// so any element passed to geodesyControl will get one of these forms made for it
// and a document fragment will be returnede to append where you want

// want-to-haves
// infrashadow, hypershadow, offset x and y, inset or outset. very bad performance with css tho. Maybe SVG will be better.



window.formTemplate = {"form":
[
    {"details open":[
        {"summary": [
            {"input": {
                "type":"text", "name":"title","placeholder":"Create New Space","autocomplete":"off"
            }
        }]},
        {"fieldset":[
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
                    "name":"radius","type":"number","min":"5","max":"250","step":"5","value":"100"
                }},
            ]},
            {"label": [
                "shells", 
                {"input":{
                    "name":"shells","type":"number","min":"1","max":"50","step":"1","value":"10"
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
                    {"input": {"type":"radio", "name":"fillmode", "id":"merge", "checked":""}},
                    // having the label inside the button might be backwards, I want a button inside the label for better click action
                    {"label for='merge'":["merge"]}
                ]},
                {"div tabindex='0'":[
                    {"input": {"type":"radio", "name":"fillmode", "id":"split"}},
                    {"label for='split'":["split"]},
                ]},
                {"div tabindex='0'":[
                    {"input": {"type":"radio", "name":"fillmode", "id":"none"}},
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
                    {"input": {"type":"radio", "name":"draw", "id":"paint", "checked":""}},
                    {"button type='button'": [{"label for='paint'":["paint"]}]}
                ]},
                {"div":[
                    {"input": {"type":"radio", "name":"draw", "id":"erase"}},
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
                    {"input": {"type":"number", "min":"0","max":"50","step":"1","placeholder":"a","name":"a"}},
                    "x",
                    "+",
                    {"input": {"type":"number", "min":"0","max":"50","step":"1","placeholder":"b", "name":"b"}},
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
                {"label":[
                    "image url",
                    {"input": {"type":"text", "name":"hyper-url" }},
                ]},
                {"label":[
                    "zoom",
                    {"input": {"type":"range", "min":"50","max":"500","name":"hyper-zoom" }},
                ]},
                {"label":[
                    "x offset",
                    {"input": {"type":"range", "min":"-100","max":"100","name":"hyper-xoffset" }},
                ]},
                {"label":[
                    "y offset",
                    {"input": {"type":"range", "min":"-100","max":"100","name":"hyper-yoffset" }},
                ]},
                {"label":[
                    "center facing",
                    {"input": {"type":"checkbox","name":"hyper-counter-rotate", "checked":""}},
                ]}
            ]}
        ]},
        {"button type='submit'":["Create New Space"]}
    ]}
]}