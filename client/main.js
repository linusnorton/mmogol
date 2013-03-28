
$(function() {
    'use strict';

    var socket = io.connect('http://localhost:8021');

    function buildCell(cell) {
        var cssClass = cell ? 'alive' : 'dead';

        return '<td class="' + cssClass +  '""/>';
    }

    function buildRow(row) {
        return '<tr>' + _.map(row, buildCell).join() + '</tr>';
    }

    function tick (data) {
        $('[data-role=gameContainer]').html(_.map(data, buildRow).join());
    }

    socket.on('tick', tick);
});

