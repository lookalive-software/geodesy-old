const http = require('http')
const fs = require('fs')
const zlib = require('zlib')
const {elementary} = require('@lookalive/elementary')
const geodesy = require('./geodesy.js')

http.createServer((req, res) => {
    try {
        console.log(req.url)
        let html = zlib.gzipSync(eval(fs.readFileSync('www' + req.url).toString()))
        res.setHeader('Content-Type','text/html')
        res.setHeader('Content-Encoding','gzip')
        res.end(html)
    } catch (e){
        console.log(e)
        res.writeHead(500)
        res.end(JSON.stringify(e))
    }
}).listen(3030)


function htmlwrap(content){
    return [
        {"!DOCTYPE html":[]},
        {"html":[
            {"head": [
                {"meta":{"charset":"UTF-8"}},
                {"link":{
                    "rel":"icon",
                    "type":"image/x-icon",
                    "href":"data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII="
                }}
            ]},
            {"body": content}
        ]}
    ]
}