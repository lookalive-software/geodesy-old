const fs = require('fs')


module.exports = [
    {"!DOCTYPE html":[]},
    {"html":[
        {"head": [
            {"meta":{"charset":"UTF-8"}},
            {"link":{
                "rel":"icon",
                "type":"image/x-icon",
                "href":"data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII="
            }},
            {"script":{"src":"static/elementary.js"}},
            {"script":{"src":"static/kvetch.js"}},
            {"script":{"src":"static/htmlprops.js"}},
            {"script":{"src":"static/geodesyform.js", "defer":"true"}},
            {"script":{"src":"static/outTurf.js", "defer":"true"}},
            {"style": {
                ":root":{
                    "--radius": "100px",
                    "--globalscale": "1",
                    "--twist":"0"
                },
                "body":{
                    "overflow":"hidden"
                },
                "form":{
                    "height":"40vh",
                    "width":"300px",
                    "background":"#d3d3d37d",
                    "position":"absolute",
                    "border":"1px solid rgba(0,0,0,0.2)",
                    "display":"flex",
                    "flex-direction":"column",
                    "justify-content":"space-evenly",
                    "align-items":"center",
                },
                "form > section": {
                    "width":"80%",
                    "height":"var(--section-height)",
                    "background":"#f4f4f4",
                },
                'section': {
                    "display":"flex",
                    "justify-content":"space-evenly",
                    "align-items":"center",
                    "font-family":"monospace",
                    "font-size":"large",
                    "font-weight":"bold",
                    "--section-height":"32px",
                },
                'section[group="3"]':{
                    "flex-direction": "column",
                    "--section-height": "90px",
                },
                "form > section:after, form > section:before":{
                    "display":"block",
                    "position":"absolute",
                    "width":"80%",
                    "height":"var(--section-height)",
                    "content":"\"\"",
                    "pointer-events":"none"
                },
                "form > section:before": {
                    "box-shadow":"-5px -5px 10px white"
                },
                "form > section:after": {
                    "box-shadow": "5px 5px 10px black"
                },
                "input, select":{
                    "width":"50%"
                },
                // all top levels are arranged as flexbox vertical, level after that is flexbox horizontal
            }}
        ]},
        {"body": [
            // things geodesy has to react to
            // global scale and transform
            // case 'scale': case 'xoffset': case 'yoffset', this.style.transform = "transform scale"
            // size: call resize, will create or destroy as requested
            {"geodesy": {"id":"geodesy", "size":"4", "motif":"pyritohedron"}},
            {"form target='geodesy'": [
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

            ]},
            // really, on page load I should be checking what exists in the markup,
            // and generate enough summary/detail menus to support those,
            // and to keep their attributes up to date with the form
            // simple data binding!
            // {"script": ["geodesyCreate(geodesy); setTimeout(function(){geodesyResize(geodesy)},1000)"]},
        ]}
    ]}
]
/*
For 2 way data-binding, it can be looked at as a message passing problem,
you have a form UI that is going to be manipualted by the user, and you want the element to react to those changes on the form
you have an element that can have callbacks set to act on itself when an attribute change is made

So the form UI just has to have some boilerplate that lets it talk to its target element, 
<form target="geodesy#2ffa" // maube target will be used as input for querySelector, so it works even if the target element doesn't have ID>
    <input for="length" type="number":>
    <label for="color"><input for="color" type="color">
    <label for="begin"><input for="begin" type="number" min="1",max="200">

    so my code has to attach a listener to each form input, and considers the target, and the 'for' attribute,
    and essentially sets then when the input for begin changes
*/