
function motifStyle(id, motifData){
    return {"style": Object.assign({
        [`#${id}`]:{
            "--radius": "100px",
            "--globalscale": "1",
            "--twist": ".25turn",
            "top": `Calc(50vh - (var(--radius) / 2))`,
            "left": `Calc(50vw - (var(--radius) / 2))`
        },
        [`#${id} norm`]:{
            "transition":"all .25s"
        },
        [`#${id} norm.visibility`]:{
            "--twist": "0"
        },
        [`#${id}, #${id} norm, #${id} spin, #${id} polygon, #${id} target`]:{
            "display": "block",
            "position": "absolute",
            "height": "var(--radius)",
            "width": "var(--radius)",
             "pointer-events": "none"
        },
        [`#${id} spin`]:{
            "transform-origin": `Calc(var(--radius) / 2) Calc(var(--radius) / 2)`,
            "height":"inherit"
        },
        [`#${id} polygon`]: {
            "bottom": "0",
            "transition":"all 1s",
        },
        [`#${id}[cast-shadow="true"] polygon`]: {
            // shadow blur goes here
            // shadow color goes here
            "background": "#aaa",
            "filter":"blur(3px)",
        },
        [`#${id}[cast-shadow="true"] target`]:{
            // shadow offset goes here
            // polygon color goes here
            "left":"3px",
            "top":"3px",
            "background":"white",
        },
        [`#${id} target`]:{
            // "background":"white",
            "left":"0",
            "top":"0",
            "pointer-events":"all",
            // "transition":"all 0.25s"
        },
        [`#${id} target:hover`]: {
            "left":"6px",
            "top":"6px"
        }}, // close style object, next argument for Object.assign is an array of polygon selectors
        ...motifData.map((shape, shapeIndex) => ({
            [`#${id} [polygon="${shapeIndex}"], #${id} [polygon="${shapeIndex}"] target`]: {
                "clip-path": shape.polygon,
                "--localscale": shape.scale
            }
        }))
    )}
}

