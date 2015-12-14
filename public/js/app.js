var socket = io(); // io() is defined by the socket.io script above

// listen to the connect event
socket.on('connect', function() {
	console.log('Connected to socket.io server!');
});

// front-end to listen to the message event
socket.on('message', function(message) {
	console.log('New message: ');
	console.log(message.text);
});