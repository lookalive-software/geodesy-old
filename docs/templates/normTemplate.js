window.templates = window.templates || {}
window.templates.normTemplate = function(id, [_, numericNorm, spinData]){
    return {"norm": {
        "id": id, // I think this will get replace with {norm, spin} tuples on the polygons, to identify their location in the grid
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