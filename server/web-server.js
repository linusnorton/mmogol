var app = require('http').createServer(handler),
    fs = require('fs');

app.listen(8012);

function handler (req, res) {
  req.url = req.url === '/' ? '/index.html' : req.url;

  fs.readFile(__dirname + '/../client' + req.url,
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading ' + req.url);
    }

    var contentType = (req.url.split('.').pop() === 'js') ? 'text/javascript' : 'text/html';

    res.writeHead(200, {'Content-Type': contentType});
    res.end(data);
  });
}

module.exports = app;