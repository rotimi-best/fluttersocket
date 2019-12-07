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

    socket.on('onVerticalDragUpdate', function (msg) {
        console.log('onVerticalDragUpdate: ' + msg);
    });

    socket.on('onHorizontalDragUpdate', function (msg) {
        console.log('onHorizontalDragUpdate: ' + msg);
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
