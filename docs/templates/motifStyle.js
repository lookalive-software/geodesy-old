
function motifStyle(id, motifData){
    return {"style": Object.assign({
        [`#${id}[radius]`]:{
            "--radius": "100px"
        },
        [`#${id}[backoff]`]:{
            "--backoff": "1",
        },
        // foreground and background
        [`#${id}[fg-color]`]:{
            "--fg-color": "black",
        },
        [`#${id}[bg-color]`]:{
            "--bg-color": "white",
        },
        [`#${id}`]:{
            "--twist": ".25turn",
            "top": `Calc(50vh - (var(--radius) / 2))`, // + var(--xoffset) soon
            "left": `Calc(50vw - (var(--radius) / 2))`
        },
        [`#${id} norm`]:{
            "transition":"rotateX .25s"
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
            "transition":"transform 0.5s",
        },
        [`#${id} target`]:{
            // "background":"white",
            "left":"0",
            "top":"0",
            "pointer-events":"all",
            "background":"var(--bg-color)",
            // "transition":"all 0.25s"
        }}, // close style object, next argument for Object.assign is an array of polygon selectors
        ...motifData.map((shape, shapeIndex) => ({
            [`#${id} [polygon="${shapeIndex}"], #${id} [polygon="${shapeIndex}"] target`]: {
                "clip-path": shape.clippath,
                "--localscale": shape.scale
            }
        }))
    )}
}

