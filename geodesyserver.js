const http = require('http')
const fs = require('fs')
const {elementary} = require('@lookalive/elementary')
const static = ["node_modules","polygons"]

http.createServer((req, res) => {
    // stream static files
    if(static.includes(req.url.split('/')[1])){
        fs.createReadStream('.' + req.url.split('?').shift())
          .on('error', err => { 
              res.writeHead(500)
              res.end(JSON.stringify(err)) 
          })
          .pipe(res)
    // or render dynamic files
    } else {
        try {
           let html = elementary(
               JSON.parse(
                   fs.readFileSync('.' + req.url).toString()
               )
           )
           console.log(html)
           res.end(html)
        } catch(e){
            res.writeHead(500)
            res.end(JSON.stringify(e)) 
        }
        // res.end('<script src="/node_modules/algebrite/dist/algebrite.js"></script>')
    }
}).listen(3030)