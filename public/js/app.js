var socket = io(); // io() is defined by the socket.io script above

// listen to the connect event
socket.on('connect', function() {
	console.log('Connected to socket.io server!');
});

// front-end to listen to the message event
socket.on('message', function(message) {
	console.log('New message: ');
	console.log(message.text);

	jQuery('.messages').append('<p>' + message.text + '</p>');
});

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function(event) { // event object
	event.preventDefault(); // Doesn't want to submit in the old fashioned way by refreshing the entire page. Handles the form submission on your own.

	var $message = $form.find('input[name=message]');

	socket.emit('message', { // send msg to server
		text: $message.val()
	});

	$message.val('');
}); // all browsers know of this submit event 
