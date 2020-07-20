(function(){
    window.formbinder = function(){
        Array.from(document.querySelectorAll('form'),function(formElemenet){
            Array.from(formElemenet.querySelectorAll('input, select, textArea'), function(inputElement){
                // find target and set values according to target props to initialize
                // size, motif, zoom, pos-x, pos-y
                // console.log(inputElement)
                // inputElement.props.oninput = ".submit()"
                var targetElement = formElemenet.props.target
                var targetAttribute = inputElement.props.for
                var targetValue = inputElement.type == 'checkbox' ? inputElement.checked : inputElement.value
                if(!document.getElementById(targetElement)) return console.log(`no element with id ${targetElement}`)
                document.getElementById(targetElement).props[targetAttribute] = targetValue
                // that updates the target as soon as the form is created, this updates the target on input change
                inputElement.addEventListener('input',function(event){
                    console.log(event.target)
                    // if()
                    var targetElement = formElemenet.props.target
                    var targetAttribute = event.target.props.for
                    var targetValue = event.target.type == 'checkbox' ? event.target.checked : event.target.value
                    if(!document.getElementById(targetElement)) return console.log(`no element with id ${targetElement}`)
                    document.getElementById(targetElement).props[targetAttribute] = targetValue
                })
            })
        })
    }
})()