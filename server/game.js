var events = require('events'),
    util = require('util');

/**
 * Game handles the rules of the Game of Life. It maintains a grid that is updated every 
 * ticketLength.
 * 
 * @param {Socket.IO} io
 * @param {Number} width
 * @param {Number} height
 * @param {Number} tickLength
 */
function Game (io, width, height, tickLength) {
    var grid = [];

    /**
     * Ensure the event emitter is set up
     */
    function init() {
        events.EventEmitter.call(this);
    }

    /**
     * Create a random grid 
     */
    function randomize () {
        for (var j = 0; j < height; j++) {
            grid[j] = [];

            for (var i = 0; i < width; i++) {
                grid[j][i] = Math.random() > 0.7;
            }
        }
    }

    /**
     * Start the internal at tickLength
     */
    function start () {
        setInterval(tick.bind(this), tickLength);
    }

    /**
     * Update the game an emit the grid
     */
    function tick () {
        update();
        
        this.emit('update', grid);
    }

    /**
     * Process one turn of the game
     */
    function update () {
        var newGrid = [];

        for (var j = 0; j < height; j++) {
            newGrid[j] = [];

            for (var i = 0; i < width; i++) {
                newGrid[j][i] = updateCell(i, j);
            }
        }

        grid = newGrid;
    }

    /**
     * Return a true of the given cell if alive after the current turn, or false if it is dead.
     * 
     * @param  {Number} i
     * @param  {Number} j
     * @return {Boolean}
     */
    function updateCell (i, j) {
        var numNeighbours = getNumNeighbours(i, j);

        if (isAlive(i, j) && numNeighbours !== 2 && numNeighbours !== 3) {
            return false;
        }
        else if (numNeighbours === 3) {
            return true;
        }

        return isAlive(i, j);
    }

    /**
     * Get the number of alive neighbours.
     * 
     * @param  {Number} i
     * @param  {Number} j
     * @return {Number}
     */
    function getNumNeighbours (i, j) {
        var count = 0;

        count += isAlive(i - 1, j - 1) ? 1 : 0;
        count += isAlive(i    , j - 1) ? 1 : 0;
        count += isAlive(i + 1, j - 1) ? 1 : 0;

        count += isAlive(i - 1, j) ? 1 : 0;
        count += isAlive(i + 1, j) ? 1 : 0;

        count += isAlive(i - 1, j + 1) ? 1 : 0;
        count += isAlive(i    , j + 1) ? 1 : 0;
        count += isAlive(i + 1, j + 1) ? 1 : 0;

        return count;
    }

    /**
     * Toggle the given cells state.
     * 
     * @param  {Number} i
     * @param  {Number} j
     */
    function toggle (i, j) {
        grid[getY(j)][getX(i)] = !grid[getY(j)][getX(i)];
    }

    /**
     * Return true if the cell is alive or false if it is dead.
     * 
     * @param  {Number}  i
     * @param  {number}  j
     */
    function isAlive (i, j) {
        return grid[getY(j)][getX(i)];
    }

    /**
     * Perform some modulus to get the array index for the given cell
     * 
     * @param  {Number} i
     */
    function getX (i) {
        return (width + i) % width;
    }

    /**
     * Perform some modulus to get the array index for the given cell
     * 
     * @param  {Number} i
     */
    function getY (j) {
        return (height + j) % height;
    }

    // Set up the public properties    
    this.randomize = randomize;
    this.start = start;
    this.toggle = toggle;

    init();
}

util.inherits(Game, events.EventEmitter);

module.exports = Game;