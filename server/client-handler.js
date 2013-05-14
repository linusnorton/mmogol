var io = require('socket.io');

/**
 * Handle incoming client connections and hook up click events to the game.
 *
 * @param {App} app
 * @param {Game} game
 */
function ClientHandler(app, game) {
    var numClients = 0,
        sockets;

    /**
     * Register handler for new connections
     */
    function start () {
        sockets = io.listen(app).sockets;

        sockets.on('connection', addClient);
        game.on('update', updateClients);
    }

    /**
     * Add listener for client events
     *
     * @param {Socket} socket
     */
    function addClient (socket) {
        socket.on('toggle', onClientToggle);

        numClients += 1;
    }

    /**
     * Handler for client "toggle" event
     *
     * @param  {Object} data
     */
    function onClientToggle (data) {
        game.toggle(data.i, data.j);
    }

    /**
     * Update all the connected clients
     *
     * @param  {Object} grid
     */
    function updateClients (grid) {
        sockets.emit('tick', grid);
    }

    this.start = start;
}

module.exports = ClientHandler;