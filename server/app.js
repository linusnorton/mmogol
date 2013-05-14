
var WebServer = require('./web-server'),
    Game = require('./game'),
    ClientHandler = require('./client-handler'),
    config = require('./config'),
    webServer = new WebServer(config.port, config.clientDir),
    game = new Game(config.width, config.height, config.tickLength),
    clientHandler = new ClientHandler(webServer.app, game);

game.randomize();
game.start();

webServer.start();
clientHandler.start();