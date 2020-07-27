/*
This provides a getter / setter / emitter API for modifying HTML attributes and the state of Form elements
To replace element.setAttribute('name','nobody') with element.props.name = 'nobody'
And proviede a hook into being notified of attributes that are changed with this API
element.addEventListener('propModified', event => {propName, oldValue, newValue} = event.detail)
*/
(function(){

    function updateAttribute(prop, newValue){
        let attributeChange = {propName: prop, oldValue: this.getAttribute(prop)}
        
        if(typeof newValue == "undefined"){
            this.removeAttribute(prop) // realize getAttribute returns null if nothing exists at this address
        } else if(typeof newValue == "object"){
            this.setAttribute(prop, JSON.stringify(newValue))
        } else {
            this.setAttribute(prop, String(newValue))
        }
    
        this.dispatchEvent(new CustomEvent('propModified', {
            "detail": Object.assign(
                attributeChange,
                {newValue: this.getAttribute(prop)}
            )
        }))
    }

    Object.defineProperties(HTMLElement.prototype, {
        props: {
            get(){
                // if this.tagName = 'form', I could iterate through 
                let props = {}

                Object.assign(props, ...Array.from(this.attributes, 
                    attr => ({[attr.name]: attr.value})
                ))

                return new Proxy(props, {
                    set: (_, prop, value) => {
                        updateAttribute.call(this, prop, value)
                        return true
                    },
                    get: (_, name) => {
                        return this.getAttribute(name)
                    }
                })
            },
            set(data){
                Object.entries(data || {}).forEach(([propName, newValue]) => {
                    updateAttribute.call(this, propName, newValue)
                })
            }
        },
        formprops: {
            // if this.tagName != 'form' throw error
            get(){
                let props = {}
                Array.from(this.querySelectorAll('input, select, textarea'), inputElement => {
                    switch(inputElement.type){
                        case 'checkbox':
                            props[inputElement.name] = inputElement.checked
                            break
                        case 'radio':
                            if(inputElement.checked){
                                props[inputElement.name] = inputElement.value
                            }
                            break
                        default:
                            props[inputElement.name] = inputElement.value
                    }
                })
                // later could add a proxy around props to allow setting one formprop at a time, but for updating the form from an object's props its not needed
                return props
            },
            set(data){
                // for each prop in the new object, find all the input elements that may be in control of it and update their state to match the new data
                Object.entries(data).forEach(([propName, newValue]) => {
                    Array.from(this.querySelectorAll(`[name="${propName}"]`), inputElement => {
                        // maybe check that newValue is different than current value before setting the value of an input
                        // if setting the input fires a input event, target.props will be written again and lead to infinite recursion
                        switch(inputElement.type){
                            case 'checkbox':
                                // newValue will be the string true or false, set checkbox to checked if string is 'true'
                                inputElement.checked = (newValue === "true")
                                break
                            case 'radio':
                                // necesitates using 'value' to represent the target value
                                // newValue will be the name of the radio button it corresponds to, set radio to checked if it has the 'value' of the prop
                                inputElement.checked = (newValue === inputElement.value)
                                break
                            default:
                                // everything else should accept its value being overwritten 
                                inputElement.value = newValue
                        }       
                    })
                })
            }
        },
        // later, styleprops to get and set css custom properties
    })  
})()