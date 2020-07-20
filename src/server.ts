
/**
 * What does this server have to do? 
 * There's just one page, defined by an elementary file
 * But within that file there's a few script tags that append code to the client side HTML
 * So the elementary dist script gets sent to client so it can call 
 * 
 * So lets say, an incoming request is either for an html file, or a cache response, pulling a property off a JSON file essentially.
 * 
 * So on server start we're going to iterate through the cache folder and load them into memory, 
 */


// for each file, path name

const http = require('http')
const path = require('path')
const url = require('url')
const fs = require('fs')
const zlib = require('zlib')
const {elementary} = require('@lookalive/elementary')

// clientside gets shipped: elementary, kvetch, a script to tie the form to the GUI
// on geodesy.grow(), take length of geodesy.children and make a kvetch for the next layer, get the datastructure and hand it to elementary and append child.
// will have to make sure I process the results in order... make it recursive, checking to see if it has matched the 'length' attribute yet
// so the form just updates the [length], and calls .resize(), which checks if its bigger, smaller, or equal. After every grow or shrink it calls resize again, which checks to see if it has made it.


// to answer requests for calculating new polygons
// will be given motif and bitmask -- a base 16 encoded binary series, each bit of each represents an index of the cached tile positions

// why not just put different services on different ports?
// I still ask for localhost:port in the addresses, basically same as using a subdomain

// 3031 for rendering www elementary files
// 3032 for accessing cache by 'xpath' (or just json path), eventually recurse key access according to the path, just a single index for now

// /www/


const cache = {}
fs.readdirSync('./cache').map(filename => {
    let {name} = path.parse(filename)
    cache[name] = require('../cache/' + filename)
})

function requireNoCache(moduleName){
    delete require.cache[require.resolve(moduleName)];
    return require(moduleName)
}

function keypath(object:object, keypath:string[]){
    keypath = keypath.filter(Boolean)
    while(keypath.length && object){
        object = object[keypath.shift()]
    }
    return object
}

http.createServer((req, res) => {
    let [route, resource, ...subresource] = url.parse(req.url).pathname.split('/').slice(1) as string[]
    if(!route){
        [route, resource] = ['cgi','index']
    }
    try {
        switch(route){
            case "static":
                var bytes = zlib.gzipSync(String(fs.readFileSync('./static/' + resource)))
                res.writeHead(200, {
                    // 'Content-Type': ({
                    //     '.html': 'text/html',
                    //     '.js':'application/javascript',
                    //     '.json':'application/json'
                    // })[path.parse(resource).ext], 
                    'Content-Encoding':'gzip'
                })
                res.end(bytes)
                break
            case "cgi":
                let html = zlib.gzipSync(elementary(requireNoCache('../cgi/' + resource + '.js')))
                res.writeHead(200, {
                    'Content-Type':'text/html',
                    'Content-Encoding':'gzip'
                })
                res.end(html)
                break
            case "cache":
                let json = zlib.gzipSync(JSON.stringify(keypath(cache[resource], subresource))) // you'll get null back if the key doesn't exist within that resource
                res.writeHead(200, {
                    'Content-Type':'application/json',
                    'Content-Encoding':'gzip'
                })
                res.end(json)
                break
            default:
                throw new Error("you forgot www or cache")
        }
    } catch (e) {
        console.log(e)
        res.writeHead(500, {"Content-Type":"application/json"});
        res.end(e.toJSON());
    }
}).listen(3030);

Object.defineProperty(Error.prototype, 'toJSON', {
    value: function () {
        // well, I'm mutating string into an array of strings, not sure the type signature of that
        var alt:{stack?: any} = {};

        Object.getOwnPropertyNames(this).forEach(function (key) {
            alt[key] = this[key];
        }, this);

        if(alt.stack){ alt.stack = alt.stack.split('\n') }
        return JSON.stringify(alt);
    },
    configurable: true,
    writable: true
});