var io = require('socket.io').listen(8021),
    grid = [],
    size = {
        width: 40,
        height: 30
    },
    tickLength = 200;

initGrid();

setInterval(tick, tickLength);

function initGrid () {
    for (var i = 0; i < size.width; i++) {
        grid[i] = [];

        for (var j = 0; j < size.height; j++) {
            grid[i][j] = Math.random() > 0.7 ;
        }
    }
}

function updateGrid () {
    for (var i = 0; i < size.width; i++) {
        for (var j = 0; j < size.height; j++) {
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
    count += isAlive(i, j) ? 1 : 0;
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
    return (size.width + i) % size.width;
}

function getY(j) {
    return (size.height + j) % size.height;
}

function tick () {
    updateGrid();
    console.log(grid);
    io.sockets.emit('tick', grid);
}