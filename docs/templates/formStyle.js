window.formStyle = function(){
    return {"style": {
    "form[target] button[type=\"submit\"]": {
        "display":"none"
    },
    "form":{
        // "z-index":"1",
        "padding": "10px 0",
        "width":"280px",
        "background":"#d3d3d37d",
        // "position":"absolute",
        "border":"1px solid rgba(0,0,0,0.2)",

        "display":"flex",
        "overflow":"hidden",
        "flex-direction":"column",
        "justify-content":"space-evenly",
        "align-items":"center",
    },
    "form > details:first-child": {
        "width":"90%",
    },
    "form > details:first-child > summary": {
        "margin-bottom":"15px"
    },
    "form > details:first-child > summary > input": {
        "width":"90%",
        "background": "transparent",
        "border":"none",
        "border-bottom":"2px solid black"
    },
    "button[type=\"submit\"]":{
        "border-radius": "8px",
        "padding": "8px 0",
        "width": "100%"
    },
    "fieldset": {
        "margin-bottom":"10px",
        // "width":"80%",
        "border-radius":"8px",
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
        "justify-content":"space-between",
        "white-space":"nowrap",
        "align-items":"center",
        "margin-bottom":"5px"
    },
    // "fieldset > label, fieldset > section":{
    //     "margin-bottom":"5px"
    // },
    "#linearpaint, #drawerase": {
        "justify-content":"center",
    },
    "label > *, section > *": {
        "margin": "0 5px"
    },
    "input[type=\"text\"], select": {
        "width":"60%"
    },
    "input[type=\"radio\"]": {
        "display":"none"
    },
    "input[type=\"checkbox\"]": {
        "width":"20px","height":"20px"
    },
    "input[type=\"radio\"] ~ label ": {
        "opacity":"0.5",
        "position":"relative",
        "-webkit-appearance": "button",
        "-moz-appearance": "button",    
        "appearance": "button",
        "padding":"3px",
        "font-weight":"normal",
        "font-size":"medium"
    },
    "input[type=\"radio\"]:checked ~ label ": {
        "opacity":"1",
        "box-shadow": "3px 2px 1px black",
        "top":"-3px",
        "left":"-3px"
    },
    "input[type=\"number\"]": {
        "width":"25%",
        "text-align":"center"
    },
    "input[type=\"range\"]": {
        "width":"100%",
        "text-align":"center"
    },
    "input[type=\"color\"]": {
        "width":"70px",
        "height":"70px",
        "padding":"0",
        "position":"relative",
        "margin":"30px auto"
    },
    "[name=\"hyper-color\"]":{
        "right":"75px",
        "bottom": "15px"
    },
    "[name=\"infra-color\"]":{
        "left":"75px",
        "top": "15px"

    },
    "summary":{
        "height":"1em"
    },
    "summary > legend":{
        "position":"relative",
        "top":"-0.9em",
        "left":"1em"
    }
    }}
}