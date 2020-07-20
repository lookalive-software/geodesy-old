// {"geodesy": {"id":"geodesy", "size":"4", "motif":"pyritohedron"}},

function geodesyForm(id){
    return {[`form target=${id}`]: [
    // form will have some global options, for position / origin and zoom... maybe rotation...
    // but then a details/summary object will be created for each geodesy on the page.
    // so when the page executes, it has to check what elements exist and register them to their event callbacks
    // and register this form to the same id so that changes on the form, change the attributes on the element,
    // which calls some specific function to transmute the html, pulling more data or deleting elements, whathaveyou
    {"section group='3'":[
        {"section":[
            {"label for='zoom'":["zoom"]},
            {"input for='zoom'": {"type":"range", "min":"0","max":"3","step":"0.01" }},
        ]},
        {"section":[
            {"label for='xoffset'":["x offset"]},
            {"input for='xoffset'": {"type":"range", "min":"-100","max":"100","step":"1" }},
        ]},
        {"section":[
            {"label for='yoffset'":["y offset"]},
            {"input for='yoffset'": {"type":"range", "min":"-100","max":"100","step":"1" }}
        ]}
    ]},
    {"section":[
        {"label for='size'":["size"]},
        {"input for='size'": {"type":"number", "min":"0","max":"50","step":"1" }}
    ]},
    {"section":[
        {"label for='motif'":["motif"]},
        {"select for='motif'": [
            {"option": {"value": "none", "childNodes": ["none"]}},
            {"option": {"value": "square", "childNodes": ["square"]}},
            {"option": {"value": "pyritohedron", "childNodes": ["pyritohedron"]}},
            {"option": {"value": "p4octagon", "childNodes": ["p4octagon"]}},
            {"option": {"value": "honeycomb", "childNodes": ["honeycomb"]}},
        ]}
    ]}
    ]}
}