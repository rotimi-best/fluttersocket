const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('touchmove', function (msg) {
      const position = JSON.parse(JSON.stringify(msg))
        io.emit('touchmove', position);
        console.log('touchmove: ', position);
    });

    socket.on('onVerticalDragUpdate', function (msg) {
      const position = JSON.parse(JSON.stringify(msg))
        io.emit('onVerticalDragUpdate', position);
        console.log('onVerticalDragUpdate: ', position);
    });

    socket.on('onHorizontalDragUpdate', function (msg) {
        const position= JSON.parse(JSON.stringify(msg))
        io.emit('onHorizontalDragUpdate', position);
        console.log('onHorizontalDragUpdate: ', position);
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
