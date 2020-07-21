// {"geodesy": {"id":"geodesy", "size":"4", "motif":"pyritohedron"}},

function geodesyForm(id){
    return {[`form target=${id}`]: [
    // form will have some global options, for position / origin and zoom... maybe rotation...
    // but then a details/summary object will be created for each geodesy on the page.
    // so when the page executes, it has to check what elements exist and register them to their event callbacks
    // and register this form to the same id so that changes on the form, change the attributes on the element,
    // which calls some specific function to transmute the html, pulling more data or deleting elements, whathaveyou
    {"section group='3'":[
        // a slider for polygon offset 
        // a slider for min-max orbits #
        // a slider for lattice offset from origin
        // a slider for lattice rotation around origin

        // linear selection ax + b -- overwrites bitmask
        // bitmask gives one bit per polygon on the lattice sum(norm.childnre.lengths)
        // gives a hexadecimal text of the current state
        // so if there's 52 polygons, you've got a 52 bit number

        // for bitmask
        // when text area changes, only react if the new value has the same number of characters as whatever power of 2 I need
        // so whenever the size is changed, I need to count the number of polygons, and split it into 32 bit chunks,
        // rendered row for row in the text area, and there's an attr bitmask-power that can be referred to to check how many bits to react to.

        {"section":[
            {"label for='zoom'":["polygon offset"]},
            // when the polygon-offset attribute is changed, I'll need to recalculate a new clip path and perform an insertRule
            // so organize a few selector -> variable tags that I can search and replace...
            // I guess you could filter the sheet.rules by selectorText that contains [attribute= to replace all rules having to do with it...
            // then insertRule that applies new stylesheet to update the rules for this attribute selector
            // can I get the elementary function for serializing that?
            {"input for='zoom'": {"type":"range", "min":".1","max":"3","step":"0.01" }},
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
    {"section group='3'":[
        {"section":[
            {"label for='xoffset'":["origin norm"]},
            {"input for='xoffset'": {"type":"range", "min":"0","max":"1","step":".01" }},
        ]},
        {"section":[
            {"label for='yoffset'":["origin spin"]},
            {"input for='yoffset'": {"type":"range", "min":"0","max":"1","step":".01" }}
        ]}
    ]},
    {"section":[
        {"label for='cast-shadow'":["cast shadow?"]},
        {"input for='cast-shadow'": {"type":"checkbox","checked":"true"}}
    ]},
    {"section":[
        {"label for='size'":["size"]},
        {"input for='size' value='15'": {"type":"number", "min":"0","max":"50","step":"1" }}
    ]},
    {"section":[
        {"label for='i'":["nth-child("]},
        {"input for='i'": {"type":"number", "min":"0","max":"50","step":"1","placeholder":"0" }},
        {"label for='i'":["n + "]},
        {"input for='j'": {"type":"number", "min":"0","max":"50","step":"1","placeholder":"0"}},
        {"label for='i'":[")"]},
    ]},
    {"section":[
        {"label for='motif'":["motif"]},
        {"select for='motif'": [
            {"option": {"value": "none", "childNodes": ["none"]}},
            {"option": {"value": "square", "childNodes": ["square"]}},
            {"option": {"value": "pyritohedron", "childNodes": ["pyritohedron"]}},
            {"option": {"selected":"", "value": "p4octagon", "childNodes": ["p4octagon"]}},
            {"option": {"value": "honeycomb", "childNodes": ["honeycomb"]}},
        ]}
    ]}
    ]}
}