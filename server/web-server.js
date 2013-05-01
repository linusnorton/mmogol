var http = require('http'),
    u = require('underscore'),
    fs = require('fs');

/**
 * Minimal web server to serve the static files
 * 
 * @param {Number} port
 * @param {String} clientDir
 */
function WebServer (port, clientDir) {
    var app = http.createServer(handler);

    /**
     * Start listening for requests
     */
    function init () {
        app.listen(port);
    }

    /**
     * Handle a request
     * 
     * @param  {Request} req
     * @param  {Response} res
     */
    function handler (req, res) {
        console.log("HERE");
        req.url = req.url === '/' ? '/index.html' : req.url;

        fs.readFile(clientDir + req.url, u.partial(serveFile, req, res));
    }

    /**
     * Serve a file
     * 
     * @param  {Request} req
     * @param  {Response} res
     * @param  {Object} err
     * @param  {String} data
     */
    function serveFile (req, res, err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading ' + req.url);
        }

        var contentType = (req.url.split('.').pop() === 'js') ? 'text/javascript' : 'text/html';

        res.writeHead(200, {'Content-Type': contentType});
        res.end(data);
    }

    this.app = app;

    init();
}

module.exports = WebServer;