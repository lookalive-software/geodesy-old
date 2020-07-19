Object.defineProperties(HTMLElement.prototype, {
    props: {
        get(){
            let props = Array.from(this.attributes, attr => ({
                [attr.name]: attr.value
            })).reduce((a, n) => Object.assign(a, n),{}) // You would think you could do .reduce(Object.assign), but assign is variadic, and reduce passes the original array as the 4th argument to its callback, so you would get the original numeric keys in your result if you passed all 4 arguments of reduce to Object.assign. So, explicitely pass just 2 arguments, accumulator and next.
            
            return new Proxy(props, {
                set: (obj, prop, value) => {
                    value ? this.setAttribute(prop, value) : this.removeAttribute(prop)
                    return true
                },
                get: (target, name) => {
                    return this.getAttribute(name.toLowerCase())
                }
            })
        },
        set(data){
            Object.keys(data || {}).forEach(key => {
                // handle depth-1 nested objects, if a prop is an object, stringify it, I can parse it when I see it change like all the rest in attributeChangedCallback
                this.setAttribute(key, typeof data[key] == 'object' ? JSON.stringify(data[key]) : data[key])
            })
        }
    },
})