function addclockface(target, unitsize, norm, angle){
    let {width, height} = target.getClientRects()[0]

    target.lastElementChild.shadowRoot.innerHTML = elementary([
        {style: {
            "face, arm, hand": {
                display: "block",
                position: "absolute",
                background: "rgba(0,0,0,0.5)",
                height: `${unitsize}px`,
                width:`${unitsize}px`
            },
            arm: {
                height: norm + 'px',
                "transform-origin": `${unitsize / 2}px ${unitsize / 2}px`,
                transform: `rotate(calc(${angle}deg))`
            },
            face: {
                top: `${(height - unitsize) / 2}px` ,
                left: `${(width - unitsize) / 2}px`
            },
            hand: {
                bottom: 0
            }
        }},
        {face: [
            {arm: [
               { hand: [] }
            ]}
        ]}
    ])
}

// function addclockhand(target){
//     var face = target.querySelector('face')
//     face.appendChild(elementary([

//     ]))
    
// }

/*
<div id="unitsq" style="
	background: rgba(0,0,0,0.5);
    height: 100px; width: 100px;
    position: absolute; left: 350; top: 250px;"
>
	<div id="pendulum" style="
    	background:rgba(0,0,0,0.5);
    	height: 300px; width: 100px;
        transform: rotate(0deg);
        transform-origin: 50px 50px;
    ">
    	<div id="weight" style="background: rgba(0,0,100,0.5);
    height: 100px; width: 100px; position:absolute; bottom:0;">
    </div>

</div>
*/