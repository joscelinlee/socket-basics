var PORT = process.env.PORT || 3000; // Heroku will set this 'process.env.PORT'
var express = require('express');
var app = express(); // Call express as a function. Create express app.
// create a server using built-in node modules instead of sockets
var http = require('http').Server(app); // http server
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) { // individual connection/socket
	console.log('User connected via socket.io!');

	socket.on('message', function(message) {
		console.log('Message received: ' + message.text);

		// io.emit // send to everybody including the person who sent it
		socket.broadcast.emit('message', message); // send to everybody except the person who sent it. First atgument is the type and second argument contains the reference message parameter.
	});

	socket.emit('message', {
		text: 'Welcome to the chat application!'
	}); // emit an event 'message'
}); // listen for event 'connection'

http.listen(PORT, function() {
	console.log('Server started!');
});