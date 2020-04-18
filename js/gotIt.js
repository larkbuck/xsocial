"use strict";

// this js file handles all calls to firebase

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


  // nofollow, push message data to firebase!
  // this will create an object with timestamp as a key
  // it will appear inside a folder 'messagesBottle' --> must be same name as line 51 in post.js
  let result = firebase.database().ref('messagesBottle/' + timeStamp).set(messageData);

  console.log('sent message:');
  console.log(messageData);

  // Lastly, let's reset the input field on the webpage
  messageInput.value = '';
}



function receiveMessage() {

  // we'll search all the messages for one that hasn't been received yet,
  // then display it!!!
  // let's first shuffle the array so it doesn't automatically return them
  // in order they were posted
  shuffleArray(fbDataArray); // function defined in post.js

  // now iterate thru the shuffled array and check for one not received
  for (let i = 0; i < fbDataArray.length; i++) {
    if (fbDataArray[i].messageReceived === false) {

      console.log('message received:')
      console.log(fbDataArray[i]);

      // after we display it we can update it to indicate the message was received!
      firebase.database().ref('messagesBottle/' + fbDataArray[i].timeStamp).update({
        messageReceived: true
      });

      break;
    }
  }
}
