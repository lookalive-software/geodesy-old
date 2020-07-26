/*
This provides a getter / setter / emitter API for modifying HTML attributes
To replace element.setAttribute('name','nobody') with element.props.name = 'nobody'
And proviede a hook into being notified of attributes that are changed with this API
element.onAttributeChanged = function()
*/
(function(){
    // eventually this form will be able to submit a request and have the SVG generated server side so I don't have to rely on javascript anymore

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
                let props = Array.from(this.attributes, attr => ({
                    [attr.name]: attr.value
                })).reduce((a, n) => Object.assign(a, n),{}) // You would think you could do .reduce(Object.assign), but assign is variadic, and reduce passes the original array as the 4th argument to its callback, so you would get the original numeric keys in your result if you passed all 4 arguments of reduce to Object.assign. So, explicitely pass just 2 arguments, accumulator and next.
                
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
                Object.keys(data || {}).forEach(key => {
                    updateAttribute.call(this, key, data[key])
                })
            }
        }
    })  
})()