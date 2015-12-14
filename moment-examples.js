var moment = require('moment');
var now = moment(); // now variable is equal to a moment object

// console.log(now.format());
// console.log(now.format('X')); // unix-timestamp. represents in seconds since 1 Jan 1970
// console.log(now.format('x')); // represents in mili-seconds since 1 Jan 1970
// console.log(now.valueOf()); // get javascript timestamp, for comparison

var timestamp = 1450078848531;
var timestampMoment = moment.utc(timestamp); // moment object that represents timestamp

console.log(timestampMoment.local().format('h:mm a')); // 11:06 am

// now.subtract(1, 'year');

// console.log(now.format());
// console.log(now.format('MMM Do YYYY, h:mma')); // Oct 5th 2015, 6:45 pm
