
var webServer = require('./web-server')
    io = require('socket.io').listen(webServer),
    Game = require('./game'),
    game = new Game(50, 40),
    tickLength = 1000;

game.randomize();
setInterval(tick, tickLength);

/**
 * Update the game and broadcast the grid
 */
function tick () {
    game.update(game);
    io.sockets.emit('tick', game.grid);
}