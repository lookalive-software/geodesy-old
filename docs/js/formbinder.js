(function(){
    window.formbinder = function(){
        Array.from(document.querySelectorAll('form'),function(formElemenet){
            Array.from(formElemenet.querySelectorAll('input, select, textArea'), function(inputElement){
                // find target and set values according to target props to initialize
                // size, motif, zoom, pos-x, pos-y
                // console.log(inputElement)
                // inputElement.props.oninput = ".submit()"
                inputElement.addEventListener('input',function(event){
                    var targetElement = formElemenet.props.target
                    var targetAttribute = event.target.props.for
                    var targetValue = event.target.value
                    if(!document.getElementById(targetElement)) return console.log(`no element with id ${targetElement}`)
                    document.getElementById(targetElement).props[targetAttribute] = targetValue
                })
            })
        })
    }
})()