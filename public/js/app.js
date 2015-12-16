var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
var socket = io(); // io() is defined by the socket.io script above

console.log(name + ' wants to join ' + room);

// listen to the connect event
socket.on('connect', function() {
	console.log('Connected to socket.io server!');
});

// front-end to listen to the message event
socket.on('message', function(message) {
	var momentTimeStamp = moment.utc(message.timestamp);
	var $message = jQuery('.messages'); // $ to mean jquery selectors

	console.log('New message: ');
	console.log(message.text);

	$message.append('<p><strong>' + message.name + ' ' + momentTimeStamp.local().format('h:mm a') + ': </strong></p>');
	$message.append('<p>' + message.text + '</p>');
	//jQuery('.messages').append('<p><strong>' + momentTimeStamp.local().format('h:mm a') + ': </strong>' + message.text + '</p>');
});

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function(event) { // event object
	event.preventDefault(); // Doesn't want to submit in the old fashioned way by refreshing the entire page. Handles the form submission on your own.

	var $message = $form.find('input[name=message]');

	socket.emit('message', { // send msg to server
		name: name,
		text: $message.val()
	});

	$message.val('');
}); // all browsers know of this submit event 
