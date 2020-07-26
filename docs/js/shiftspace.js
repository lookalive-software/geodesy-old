(function(){
    var updatePos;
    // var allContent = document.documentElement;

    window.altspace = function(parentElement, reverse="draw"/* maybe name of attribute to watch for true or false */){
        
        function paintHandler(event){
            event.preventDefault();
            console.log(event)
            // check if the current status is different than it needs to be 
            // before calling the expensive props setter on every mousemove
            if(event.target.firstChild.props.active != event.altKey){
                event.target.firstChild.props.active = event.altKey
            }
        }

        parentElement.addEventListener('mousedown', event => {
            console.log(event)
            // i have to go back and make the css work for alt polygons 
            paintHandler(event)
            parentElement.addEventListener('mousemove', paintHandler)
        })
        document.addEventListener('mouseup', () => {
            parentElement.removeEventListener('mousemove', paintHandler)
        })
        // check if event.altKey, whatever event, 
        // use event.target of mousedown to paint or not to paint
        // but then be listener for all the mouseenter events on all elements, 
        // 
    }

    // allContent.addEventListener('mousedown', function(event){
    // //Neat! On mousedown, the activeElement is the LAST thing that was clicked on, not the thing that mousedown just hit.
    //     if((event.target.tagName === 'HTML' || event.target.tagName === 'BODY') && event.shiftKey){
    //         //console.log(event.clientX, event.clientY, document.activeElement.id)
    //         document.activeElement = document.body;
    //         document.documentElement.addEventListener('mousemove', handleMove);
    //         socketize(event);
    //         updatePos = createUpdatePos(event.clientX, event.clientY, document.activeElement.id);
    //     }
    // })

    // allContent.addEventListener('mouseup', event => {
    //     socketize(event);
    //     if(updatePos) updatePos = undefined;
    //     document.documentElement.removeEventListener('mousemove', handleMove);
    //   });
      
    // allContent.addEventListener('touchcancel', event => updatePos = undefined);
    // allContent.addEventListener('touchend',  event => updatePos = undefined);
})()

// I need one mouse down listener on the document to move everything on shift space / mousemove
// on shift&space, addeventlistener mousemove, on space up, drop the listener