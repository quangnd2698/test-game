const express = require('express');
const app = express();
const NodeCache = require("node-cache");
const myCache = new NodeCache();
const obj = { my: "Special", variable: 42 };
const LRU = require('lru-cache')
app.use(express.static(__dirname));


const options = {
    max: 2,

    // for use with tracking overall storage size
    maxSize: 35,
    sizeCalculation: (value, key) => {
        return 1
    },
}

const cache = new LRU(options)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    // let key = getKey(req.query);
    // let value = cache.get(key);
    // if (value === undefined) {
    //     value = obj;
    //     cache.set(key, value)
    // }
    // return res.end(JSON.stringify(value));
});

function getKey(query) {
    let key = '';
    ['design_url', 'padding', 'width', 'color', 'alpha'].forEach(element => {
        if (query[element]) {
            key += key ? ('_' + query[element]) : query[element];
        }
    });
    return 'sticker:' + key;
}
app.listen(3001)