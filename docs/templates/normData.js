function normData(id, [symbolicNorm, numericNorm, spinData]){
    return {"norm": {
        "id": id,
        "style": {"--norm": numericNorm },
        // "style": {"height": `Calc(var(--radius) * ${numericNorm} + var(--radius))`},
        "neighbors": spinData.length,
        "childNodes": spinData.map(spin => ({
            "spin": {
                "style": { "--spin": spin.spin + 'rad' /* radians */ },
                "childNodes":[
                    {"polygon":{
                        "polygon": `${spin.polygon}`, // this .polygon is just index, 0,1,2...
                        "childNodes":[
                            {"target": []}
                        ]
                    }}
                ]
            }
        }))
    }}
}

// somepoint I renamed localscale to backoff

// polygon has a clippath polygon
// target is give the same --localscale variable and clippath
// Three conditions to address:
    // joined -- polygon has its bg-color, and its --globalscale is set to 1.05 to overlap
    // seperate -- polygon has its bg-color, its --global scale is same as the target
    // none -- polygon has transparent background. 