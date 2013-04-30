
var WebServer = require('./web-server'),
    Game = require('./game'),
	config = require('./config'),
	webServer = new WebServer(config.port, config.clientDir),
    io = require('socket.io').listen(webServer.app),
    game = new Game(io, config.width, config.height, config.tickLength);

io.sockets.on('connection', function (socket) {
	socket.on('toggle', function (data) {
	    game.toggle(data.i, data.j);
	});
});

game.randomize();
game.start();
