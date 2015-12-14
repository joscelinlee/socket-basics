var socket = io(); // io() is defined by the socket.io script above

socket.on('connect', function() {
	console.log('Connected to socket.io server!');
});