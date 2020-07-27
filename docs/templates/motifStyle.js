
window.templates = window.templates || {}
window.templates.motifStyle = function(){
    if(!window.cache) throw new Error("motif style assumes that a cache of motifNames exists")
    // how about on creation, I iterate through the required values, throw an error if one is missing
    // so I just have to create an object entry for each of the vars
    // and then when the form attaches itself to the style form, it can scan for each of these vars and keep reference to their selectorText
    // making stylesheet overwrites quick to update the CSS custom properties

    // for instance, foreground URL is required, but default value is blank string
    // expecting this data from the form, I guess it should be a schema, but it will let me perform serverside rendering painlesslessly
    // so I could have transparent iframes stacking up multiple geodesies and each form has a single iframe as its target. Well I don"t know if pointer events works through iframes we"ll see.
    // can I measure response time on the iframe to decide how quickly to request updates? 
    return {"style": Object.assign(
        ...Object.entries(window.cache).flatMap(([motifName, {motif}]) =>
            motif.map((shape, shapeIndex) => ({
                [
                    `[motif="${motifName}"] [polygon="${shapeIndex}"], ` +
                    `[motif="${motifName}"] [polygon="${shapeIndex}"] target`
                ]: {
                    "clip-path": shape.clippath,
                    "--localscale": shape.scale // this was a bad idea, clippath should be equal scale everywhere
                }
            }))
        ),{
        "geodesy":{
            "position": "absolute",
            "top": `Calc(50vh - (var(--radius) / 2))`, // + var(--xoffset) soon
            "left": `Calc(50vw - (var(--radius) / 2))`
        },
        "norm,  spin,  polygon,  target":{
            "display": "block",
            "position": "absolute",
            "height": "var(--radius)",
            "width": "var(--radius)",
            "pointer-events": "none"
        },
        "norm":{
            "transition":"rotateX .25s",
            "height": "calc(var(--radius) * var(--norm) + var(--radius))"
        },
        "norm.visibility":{ // visibility applies to both polygon and target, whether the ring is being displayed
            "--twist": "0"
        },

        // I"m just calculating the visibility of whole norms right now.
        // so, it"s back to the old question of, how do I order all these polygons?
        "spin":{
            "transform-origin": `calc(var(--radius) / 2) Calc(var(--radius) / 2)`,
            "height":"inherit",
            "transform": "rotate(var(--spin))"
        },
        "polygon": {
            "bottom": "0",
            "transition":"transform 0.5s", // I should extract these, is this for size probable?
            // the background was on a :before element, I could apply scale to it when it dissapears
            "background": "var(--infra-color)",
            "pointer-events":"all",
        },
    // polygon has a clippath polygon
    // target is give the same --localscale variable and clippath, im sure i'm messing something up by modifying localscale when its also applied globally
    // Three conditions to address:
        // joined -- polygon has its bg-color, and its --globalscale is set to 1.05 to overlap
        // seperate -- polygon has its bg-color, its --global scale is same as the target
        // none -- polygon has transparent background. 
        "[fillmode=\"merge\"] polygon": {
            "transform":
                `scale(calc(1.05 * var(--localscale))) ` +
                `rotateX(var(--twist)) ` +
                `rotate(calc(-1 * var(--spin)))` // counter-spin
        },
        [
            `[fillmode="merge"] target, ` + 
            `[fillmode="none"] target`
        ]: {
            "transform": "scale(var(--backoff))"
        },
        "[fillmode=\"split\"] polygon": {
            "transform":
                `scale(calc(var(--backoff) * var(--localscale))) ` +
                `rotateX(var(--twist)) ` +
                `rotate(calc(-1 * var(--spin)))` // counter-spin
        },
        "[fillmode=\"none\"] polygon": {
            "background": "transparent",
            "transform":
                `rotate(calc(-1 * var(--spin)))` // counter-spin
        },
        [` target`]:{
            "left":"0",
            "top":"0",
            "background":"transparent"
            // maybe scale here
            // "transition":"all 0.25s"
        }, // close style object, next argument for Object.assign is an array of polygon selectors

        [ // if EITHER the norm OR the target is set to "active", apply the background 
            ` norm[active="true"] target:before,` +
            ` norm target[active="true"]:before`
        ]:{
            "width":"inherit",
            "height":"inherit",
            "background":"var(--hyper-color)",
            "background-image": "var(--hyper-url) !important", // fuuuuu mixed up what I meant by "foreground" and "background"
            "background-size": "var(--hyper-zoom)", // "image url settings should apply to "foreground" or better yet one for each
            "background-position":"center",
            "position":"absolute",
            "transition":"transform .5s",
            "content":`""`,
            "transform":"scale(2)"
        },
        // maybe later there can be an option to 
        // randomize or just randomly shift the location of an image you"re zoomed in on
        // so you can brake up the regularity a bit by showing different segments of the image
        [`[bg-counter-rotate="true"] target:before`]:{
            "transform":`scale(2) rotate(var(--spin)) !important`
        }
    })}
}

