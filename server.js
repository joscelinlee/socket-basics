var PORT = process.env.PORT || 3000; // Heroku will set this 'process.env.PORT'
var moment = require('moment');
var express = require('express');
var app = express(); // Call express as a function. Create express app.
// create a server using built-in node modules instead of sockets
var http = require('http').Server(app); // http server
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

var clientInfo = {}; // set of key-value pairs, where key is unique socket id (socket.io generates), value is the user info

/*var clientInfo = {
	'123abd': {
		name: 'Andrew',
		room: 'LOTR Fans'
	}
}*/

// Sends current users to provided socket
function sendCurrentUsers(socket) {
	// use socketid on the socket to know the room the user is in
	var info = clientInfo[socket.id];
	var users = []; // push string elements in to array

	if (typeof info === 'undefined') { // for room that doesn't exist
		return;
	}

	Object.keys(clientInfo).forEach(function(socketId) { // key is socketid
		var userInfo = clientInfo[socketId];

		if (info.room === userInfo.room) {
			users.push(userInfo.name);
		}
	}); // take an object and return an array of all the attributes on the object

	socket.emit('message', {
		name: 'System', 
		text: 'Current users: ' + users.join(', '),
		timestamp: moment().valueOf()
	});
}

io.on('connection', function(socket) { // individual connection/socket
	console.log('User connected via socket.io!');

	socket.on('disconnect', function() {
		var userData = clientInfo[socket.id];
		if (typeof  userData !== 'undefined') { // 'socket.id' is a dynamic attribute. If there is client info for this socket, this code will run.
			socket.leave(userData.room);
			io.to(userData.room).emit('message', {
				name: 'System',
				text: userData.name + ' has left!',
				timestamp: moment().valueOf()
			});
			delete clientInfo[socket.id]; // delete an attribute from an object
		}
	}); // 'disconect' is a fixed name unlike the other event names

	socket.on('joinRoom', function(req) {
		// clientInfo.name = 'test'; // not dynamic, hence we don't use this line of code
		clientInfo[socket.id] = req; // set it to equal the req object
		socket.join(req.room); // built-in method to add the socket to a specific room
		socket.broadcast.to(req.room).emit('message', {
			name: 'System',
			text: req.name + ' has joined!',
			timestamp: moment().valueOf()
		}); // only people in this room see the message
	});

	socket.on('message', function(message) {
		console.log('Message received: ' + message.text);

		if (message.text === '@currentUsers') {
			sendCurrentUsers(socket);
		} else {
			message.timestamp = moment().valueOf();
			io.to(clientInfo[socket.id].room).emit('message', message); // send to everybody including the person who sent it
			//socket.broadcast.emit('message', message); // send to everybody except the person who sent it. First atgument is the type and second argument contains the reference message parameter.
		}
	});

	socket.emit('message', {
		name: 'System',
		text: 'Welcome to the chat application!',
		timestamp: moment().valueOf()
	}); // emit an event 'message'
}); // listen for event 'connection'

http.listen(PORT, function() {
	console.log('Server started!');
});