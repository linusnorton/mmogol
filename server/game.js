function Game(width, height) {
    var grid = [];

    function randomize () {
        for (var i = 0; i < width; i++) {
            grid[i] = [];

            for (var j = 0; j < height; j++) {
                grid[i][j] = Math.random() > 0.7 ;
            }
        }
    }

    function update () {
        for (var i = 0; i < width; i++) {
            for (var j = 0; j < height; j++) {
                updateCell(i, j);
            }
        }
    }

    function updateCell (i, j) {
        var numNeighbours = getNumNeighbours(i, j);

        if (isAlive(i, j) && numNeighbours !== 3) {
            kill(i, j);
        }
        else if (numNeighbours === 3) {
            spawn(i, j);
        }
    }

    function getNumNeighbours(i, j) {
        var count = 0;

        count += isAlive(i - 1, j - 1) ? 1 : 0;
        count += isAlive(i, j - 1) ? 1 : 0;
        count += isAlive(i + 1, j - 1) ? 1 : 0;
        count += isAlive(i - 1, j) ? 1 : 0;
        count += isAlive(i + 1, j) ? 1 : 0;
        count += isAlive(i - 1, j + 1) ? 1 : 0;
        count += isAlive(i, j + 1) ? 1 : 0;
        count += isAlive(i + 1, j + 1) ? 1 : 0;

        return count;
    }

    function isAlive(i, j) {
        return grid[getX(i)][getY(j)];
    }

    function kill(i, j) {
        grid[getX(i)][getY(j)] = false;
    }

    function spawn(i, j) {
        grid[getX(i)][getY(j)] = true;
    }

    function getX(i) {
        return (width + i) % width;
    }

    function getY(j) {
        return (height + j) % height;
    }

    this.randomize = randomize;
    this.update = update;
    this.grid = grid;
}

module.exports = Game;