let http = require('http');
let static = require('node-static');
let file = new static.Server('.', {
    cache: 0,
    headers: {
        'Access-Control-Allow-Origin': 'https://mgrinko.github.io',
        // 'Access-Control-Allow-Methods': 'POST',
        // 'Access-Control-Allow-Headers': 'Content-Type',
    }
})

const DELAY = 3000;

function accept(req, res) {
    if (req.url.startsWith('/api')) {
        setTimeout(() => {
            file.serve(req, res);
        }, DELAY);
    } else {
        file.serve(req, res);
    }
}

http.createServer(accept).listen(3000);

console.log('Server running on port 3000');
