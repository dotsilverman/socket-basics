var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
    console.log('User connected via socket.io!');

    // listens to events
    socket.on('message', function (message) {
        console.log('Message received: ' + message.text);

        // emit event to yourself + other connections.
        io.emit('message', message);
    });

    // new events
    socket.emit('message', {
        text: 'Welcome to the chat application!'
    });
});

http.listen(PORT, function() {
    console.log('Server started!')
});
