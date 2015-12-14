var PORT = process.env.PORT || 3000; // Heroku will set this 'process.env.PORT'
var express = require('express');
var app = express(); // Call express as a function. Create express app.
// create a server using built-in node modules instead of sockets
var http = require('http').Server(app); // http server
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function() {
	console.log('User connected via socket.io');
}); // listen for event 'connection'

http.listen(PORT, function() {
	console.log('Server started!');
});