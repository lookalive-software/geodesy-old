function normData(id, [symbolicNorm, numericNorm, spinData]){
    return {"norm": {
        "id": id,
        "style": {"height": `Calc(var(--radius) * ${numericNorm} + var(--radius))`},
        "neighbors": spinData.length,
        "childNodes": spinData.map(spin => ({
            "spin": {
                "style": {"transform": `rotate(${spin.spin}rad)`},
                "childNodes":[
                    {"polygon":{
                        "polygon": `${spin.polygon}`,
                        "style": {"transform": 
                            `scale(Calc(var(--backoff) * var(--localscale))) ` +
                            `rotateX(var(--twist)) ` +
                            `rotate(Calc(-1 * ${spin.spin}rad))`},
                        "childNodes":[{"target": {
                            // maybe try applying shadow to psuedo element
                            // "style": {"transform": `rotate(${spin.spin}rad)`}
                        }}]
                    }}
                ]
            }
        }))
    }}
}