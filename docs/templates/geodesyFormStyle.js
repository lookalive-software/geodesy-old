function geodesyFormStyle(){
    return {"style": {
    "body":{
        "overflow":"hidden"
    },
    "form":{
        "z-index":"1",
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
    }
}}}

    // all top levels are arranged as flexbox vertical, level after that is flexbox horizontal
// }}
// ]},
// {"body": [
// things geodesy has to react to
// global scale and transform
// case 'scale': case 'xoffset': case 'yoffset', this.style.transform = "transform scale"
// size: call resize, will create or destroy as requested


// really, on page load I should be checking what exists in the markup,
// and generate enough summary/detail menus to support those,
// and to keep their attributes up to date with the form
// simple data binding!
// {"script": ["geodesyCreate(geodesy); setTimeout(function(){geodesyResize(geodesy)},1000)"]},

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