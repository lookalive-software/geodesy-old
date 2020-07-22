
function motifStyle(id, motifData){
    return {"style": Object.assign({
        // could set a bunch of defaults
        // for my stylevar overwriter,
        // I'm going to start at the end of the list and step backwards
        // to find the selectortext that matches the new selectortext
        // if I get to the top, I insert a rule at the end. only happens first time.
        // is a few array loops but just comparing for an exact match against a string...
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
        [`#${id}[bg-url]`]:{
            "--bg-url": "",
        },
        [`#${id}[bg-zoom]`]:{
            "--bg-zoom": "",
        },
        [`#${id}`]:{
            "--twist": ".25turn",
            "top": `Calc(50vh - (var(--radius) / 2))`, // + var(--xoffset) soon
            "left": `Calc(50vw - (var(--radius) / 2))`
        },

        [`#${id}, #${id} norm, #${id} spin, #${id} polygon, #${id} target`]:{
            "display": "block",
            "position": "absolute",
            "height": "var(--radius)",
            "width": "var(--radius)",
            "pointer-events": "none"
        },// hilarious, I forgot that my main "width height for everyone" got pushed down from the top of the stylesheet
        // so I was like "why isn't this equation setting the height??? "
        [`#${id} norm`]:{
            "transition":"rotateX .25s",
            // seems that transform can get access to a directally set variable
            // but height is having trouble grabbing it from here...
            // maybe I can try to scale to my height? my height is radius!
            "height": "calc(var(--radius) * var(--norm) + var(--radius))"
        },
        [`#${id} norm.visibility`]:{ // visibility applies to both polygon and target, whether the ring is being displayed
            "--twist": "0"
        },

        // I'm just calculating the visibility of whole norms right now.
        // so, it's back to the old question of, how do I order all these polygons?
        [`#${id} spin`]:{
            "transform-origin": `Calc(var(--radius) / 2) Calc(var(--radius) / 2)`,
            "height":"inherit",
            "transform": "rotate(var(--spin))"
        },
        [`#${id} polygon`]: {
            "bottom": "0",
            "transition":"transform 0.5s",
            // the background was on a :before element, I could apply scale to it when it dissapears
            "background": "var(--bg-color)",
            "pointer-events":"all",
        },
        [`#${id}[fillmode="merge"] polygon`]: {
            "transform":
                `scale(calc(1.05 * var(--localscale))) ` +
                `rotateX(var(--twist)) ` +
                `rotate(calc(-1 * var(--spin)))` // counter-spin
        },
        [
            `#${id}[fillmode="merge"] target, ` + 
            `#${id}[fillmode="none"] target`
        ]: {
            "transform": "scale(var(--backoff))"
        },
        [`#${id}[fillmode="split"] polygon`]: {
            "transform":
                `scale(calc(var(--backoff) * var(--localscale))) ` +
                `rotateX(var(--twist)) ` +
                `rotate(calc(-1 * var(--spin)))` // counter-spin
        },
        [`#${id}[fillmode="none"] polygon`]: {
            "background": "transparent",
            "transform":
                `rotate(calc(-1 * var(--spin)))` // counter-spin
        },
        [`#${id} target`]:{
            "left":"0",
            "top":"0",
            "background":"transparent"
            // maybe scale here
            // "transition":"all 0.25s"
        }, // close style object, next argument for Object.assign is an array of polygon selectors

        [ // if EITHER the norm OR the target is set to 'active', apply the background 
            `#${id} norm[active="true"] target:before,` +
            `#${id} norm target[active="true"]:before`
        ]:{
            "width":"inherit",
            "height":"inherit",
            "background":"var(--fg-color)",
            "background-image": "var(--bg-url) !important", // fuuuuu mixed up what I meant by "foreground" and "background"
            "background-size": "var(--bg-zoom)", // "image url settings should apply to "foreground" or better yet one for each
            "background-position":"center",
            "position":"absolute",
            "transition":"transform .5s",
            "content":`""`,
            "transform":"scale(2)"
        },
        // maybe later there can be an option to 
        // randomize or just randomly shift the location of an image you're zoomed in on
        // so you can brake up the regularity a bit by showing different segments of the image
        [`#${id}[bg-counter-rotate="true"] target:before`]:{
            "transform":`scale(2) rotate(var(--spin))`
        }},
        ...motifData.map((shape, shapeIndex) => ({
            [`#${id} [polygon="${shapeIndex}"], #${id} [polygon="${shapeIndex}"] target`]: {
                "clip-path": shape.clippath,
                "--localscale": shape.scale
            }
        }))
    )}
}

