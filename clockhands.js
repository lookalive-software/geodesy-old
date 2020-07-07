function addclockface(target, unitsize, coords){
    let container = target.getClientRects()[0]
    let parentheight = container.height
    let parentwidth = container.width
    
    //unitsize is a multiplier for all the dimensions, maybe 100 is a good start (100px grid)
    //norm is the key of the coords object, it gets evald and sorted
    //angle is the atan of y / x. 
    
   // so construct the face, but then set the transform rotate per element
   // the whole point of this is that the grid can be painted one element at a time from the center out.
    
    // when x is 0, that's atan(infinity)-> Pi/2 radians

    tilenodes = Object.entries(coords)
         .map(([norm, xypairs]) => xypairs
         .map(([x,y]) => ({arm: {
                class: "tall",
                style:{
                    height: `${(eval(norm) * unitsize) + unitsize}px`,
                    transform: `rotate(${Math.atan2(y,x)}rad)`
                },
                childNodes: [{hand:{style:{transform: `rotate(${Math.atan2(-y,x)}rad)`}}}]
            }})))
    // could be a nexttick probably    
    setTimeout(()=>
        Array.from(target.querySelectorAll("arm.tall"), (node, index) => {
            setTimeout(function(){
                console.log(node)
                node.classList.remove("tall")
            }, index * 200)
        })
    , 100)

    target.innerHTML = elementary([
        {style: {
            "face, arm, hand": {
                display: "block",
                position: "absolute",
                background: "rgba(0,0,0,0)",
                height: `${unitsize}px`,
                width:`${unitsize}px`
            },
            arm: {
                "transition": "height 2s",
                "transform-origin": `${unitsize / 2}px ${unitsize / 2}px`
            },
            "arm.tall": {
                height: "Calc(100vw + 100vh) !important"
            },
            face: {
                top: `${(parentheight - unitsize) / 2}px` ,
                left: `${(parentwidth - unitsize) / 2}px`
            },
            hand: {
                bottom: 0,
                background: "rgba(0,.5,0,.5)",
                "clip-path": "polygon(5% 5%, 5% 95%, 95% 95%, 95% 5%)"
            }
        }},
        {face: tilenodes}
    ])
}