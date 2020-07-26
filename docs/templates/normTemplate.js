window.normTemplate = function(id, [symbolicNorm, numericNorm, spinData]){
    return {"norm": {
        "id": id,
        "style": {"--norm": numericNorm },
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