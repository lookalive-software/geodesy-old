function addclockface(target, unitsize, elements){
    let container = target.lastElementChild.getClientRects()[0]
    let parentheight = container.height
    let parentwidth = container.width
    
    
    //unitsize is a multiplier for all the dimensions, maybe 100 is a good start (100px grid)
    //norm is the key of the elements object, it gets evald and sorted
    //angle is the atan of y / x. 
    
   // so construct the face, but then set the transform rotate per element
   // the whole point of this is that the grid can be painted one element at a time from the center out.
    
    // when x is 0, that's atan(infinity)-> Pi/2 radians

    target.lastElementChild.shadowRoot.innerHTML = elementary([
        {style: {
            "face, arm, hand": {
                display: "block",
                position: "absolute",
                background: "rgba(0,0,0,0)",
                height: `${unitsize}px`,
                width:`${unitsize}px`
            },
            arm: {
                "transform-origin": `${unitsize / 2}px ${unitsize / 2}px`
            },
            face: {
                top: `${(parentheight - unitsize) / 2}px` ,
                left: `${(parentwidth - unitsize) / 2}px`
            },
            hand: {
                bottom: 0,
              background: "rgba(0,.5,0,.5)"
            }
        }},
        {face: Object.entries(coords)
         .map(([norm, xypairs]) => xypairs
         .map(([x,y]) => ({arm: {
                style:{
                    height: `${(eval(norm) * unitsize) + unitsize}px`,
                    transform: `rotate(${Math.atan2(y,x)}rad)`
                },
                childNodes: [{hand:{style:{transform: `rotate(${Math.atan2(-y,x)}rad)`}}}]
            }}))
        )
        }
    ])
}