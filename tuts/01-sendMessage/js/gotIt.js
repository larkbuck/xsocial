"use strict";

// this js file handles all calls to firebase

// fires upon receiving FB data
function gotData(data) {

  // need to retrieve firebase data with val() method
  // this returns an object of all data
  fbData = data.val();

  if (fbData) { // check to see if there is something in your database to start
    console.log('received data:');
    console.log(fbData);

    // this creates an array of the data (easier to loop thru)
    fbDataArray = Object.values(fbData);
  }
}

function errData(err) {
  console.log("error! did not receive data");
  console.log(err);
}

function createMessageNode() {
  // first, assign timestamp for the message
  // we will use this both for the message ID and include it in the message object itself
  // *** this is a little redundant but helps when we update the message values
  let timeStamp = Date.now(); // milliseconds since midnight of January 1, 1970 (beginning of time ;)

  // first, create object of messageData
  messageData = {
    message: messageText,
    messageReceived: false,
    timeStamp: timeStamp
  }


  // now, push message data to firebase!
  // this will create an object with timestamp as a key
  // it will appear inside a folder 'messagesBottle' --> must be same name as line 51 in sketch.js
  firebase.database().ref('messagesBottle/' + timeStamp).set(messageData);

  console.log('sent message:');
  console.log(messageData);

  // Lastly, let's reset the input field on the webpage
  messageInput.value = '';
}


// // Note:
// // this would be the most concise way to create a new node
// // the node folder name, id, and object are all passed in as parameters
// function createNodeWParameters(_nodeFolder, _nodeId, _nodeObject){
//   firebase.database().ref(_nodeFolder + '/' + _nodeId).set(_nodeObject);
// }
