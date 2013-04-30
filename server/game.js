function Game (io, width, height, tickLength) {
    var grid = [];

    function randomize () {
        for (var j = 0; j < height; j++) {
            grid[j] = [];

            for (var i = 0; i < width; i++) {
                grid[j][i] = Math.random() > 0.7;
            }
        }
    }

    function start () {
        setInterval(tick, tickLength);
    }

    function tick () {
        update();
        io.sockets.emit('tick', grid);
    }

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

    function toggle (i, j) {
        grid[getY(j)][getX(i)] = !grid[getY(j)][getX(i)];
    }

    function isAlive (i, j) {
        return grid[getY(j)][getX(i)];
    }

    function getX (i) {
        return (width + i) % width;
    }

    function getY (j) {
        return (height + j) % height;
    }
    
    this.randomize = randomize;
    this.start = start;
    this.toggle = toggle;
}

module.exports = Game;