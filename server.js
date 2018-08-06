let http = require('http');
var static = require('node-static');
var file = new static.Server('.', {
  cache: 0,
  headers: {
    'Access-Control-Allow-Origin': 'https://mgrinko.github.io',
    // 'Access-Control-Allow-Methods': 'POST',
    // 'Access-Control-Allow-Headers': 'Content-Type'
  }
});
let fs = require('fs');
let urlParser = require('url');


function accept(req, res) {
  if (req.url.startsWith('/api')) {

    let requestParts = urlParser.parse(req.url, true);
    let sortCallback = (a, b) => {
      if (! ('sort' in requestParts.query && requestParts.query.sort.length)) {
        return 0;
      }

      let sortBy = requestParts.query.sort;
      let reverseSort = false;

      if ('-' === sortBy[0]) {
        sortBy = sortBy.slice(1);
        reverseSort = true;
      }

      if (sortBy in a && sortBy in b) {
        if (a[sortBy] > b[sortBy]) {
          return reverseSort ? -1 : 1;
        } else if (a[sortBy] < b[sortBy]) {
          return reverseSort ? 1 :-1;
        }
      }

      return 0;
    };

    if (requestParts.pathname.endsWith('/phones.json')) {
      let phonesData = JSON.parse(fs.readFileSync('./api/phones.json', 'utf8'))
        .filter((phone) =>
          ! ('searchQuery' in requestParts.query && requestParts.query.searchQuery.length)
            || phone.name.toLowerCase().includes(requestParts.query.searchQuery.toLowerCase())
        ).sort(sortCallback);

      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(phonesData), 'utf8');

      return;
    }

    setTimeout(() => {
      file.serve(req, res);
    }, 500);
  } else {
    file.serve(req, res);
  }
}

http.createServer(accept).listen(3000);

console.log('Server running on port 3000');



