
$(function() {
    'use strict';

    var socket = io.connect(),
        mousedown = false,
        $table = $('[data-role=gameContainer]');

    function buildCell (j, cell, i) {
        var cssClass = cell ? 'alive' : '';

        return '<td data-j="' + j + '" data-i="' + i + '" class="' + cssClass +  '"/>';
    }

    function buildRow (row, j) {
        return '<tr>' + _.map(row, _.partial(buildCell, j)).join() + '</tr>';
    }

    function tick (data) {
        $table.html(_.map(data, buildRow).join());
    }

    function toggle (event) {
        if (mousedown) {
            $(event.target).toggleClass('alive');

            socket.emit('toggle', { 
                i: event.target.dataset.i, 
                j: event.target.dataset.j
            });            
        }
    }

    socket.on('tick', tick);
    $table.on('mousedown', function () { mousedown = true; });
    $table.on('mouseup', function () { mousedown = false; });
    $table.on('mouseover', 'td', toggle);
});

