/*
This provides a getter / setter / emitter API for modifying HTML attributes
To replace element.setAttribute('name','nobody') with element.props.name = 'nobody'
And proviede a hook into being notified of attributes that are changed with this API
element.onAttributeChanged = function()
*/

// you have to pass the HTMLElement context to the function, 
function updateAttribute(prop, newValue){
    let attributeChange = {attribute: prop, oldValue: this.getAttribute(prop)}

    if(typeof newValue == "undefined"){
        this.removeAttribute(prop)
    } else if(typeof newValue == "object"){
        this.setAttribute(prop, JSON.stringify(newValue))
    } else {
        this.setAttribute(prop, newValue)
    }

    return Object.assign(attributeChange, {newValue: this.getAttribute(prop)})
}

Object.defineProperties(HTMLElement.prototype, {
    // following old style of attaching event listeners, set a function to element.onAttributeChanged = ({attribute, oldValue, newValue}) => {} 
    onAttributeChanged: {
        set: function(data){
            // incoming data is expecting to be a function
            if(typeof data != 'function') throw new Error("onAttributeChanged can only be set to a callback")
            this.attributeChangedCallback = data
        }
    },
    props: {
        get(){
            let props = Array.from(this.attributes, attr => ({
                [attr.name]: attr.value
            })).reduce((a, n) => Object.assign(a, n),{}) // You would think you could do .reduce(Object.assign), but assign is variadic, and reduce passes the original array as the 4th argument to its callback, so you would get the original numeric keys in your result if you passed all 4 arguments of reduce to Object.assign. So, explicitely pass just 2 arguments, accumulator and next.
            
            return new Proxy(props, {
                set: (obj, prop, value) => {
                    let update = updateAttribute.call(this, prop, value)
                    if(typeof this.attributeChangedCallback == 'function'){
                        this.attributeChangedCallback(update)
                    }
                    return true
                },
                get: (target, name) => {
                    return this.getAttribute(name)
                }
            })
        },
        set(data){
            Object.keys(data || {}).forEach(key => {
                let update = updateAttribute.call(this, key, data[key])
                if(typeof this.attributeChangedCallback == 'function'){
                    this.attributeChangedCallback(update)
                }
            })
        }
    },
})
