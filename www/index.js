elementary(htmlwrap([
    {"h1": ["hello :)"]},
    {"pre": [String(fs.readFileSync('polygons/octostars.json'))]},
    {"script":{
        "src": "algebrite.bundle-for-browser.js"
    }}
]))