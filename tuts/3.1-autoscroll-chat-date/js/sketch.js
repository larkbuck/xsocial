"use strict";
// Basic chat div with autoscroll to bottom
// with date + time of post!

let nodeData; // object we will push to firebase
let fbData; // data we pull from firebase
let fbDataArray; // firebase data values converted to an array
let database; // reference to our firebase database
let folderName = "chatMessages"; // name of folder you create in db
let messageDiv;
let input;
let sendBtn;
let chatsLoaded = false;


function setup() {

  noCanvas();

  // Initialize firebase
  // support for Firebase Realtime Database 4 web here: https://firebase.google.com/docs/database/web/start
  // Copy and paste your config here (replace object commented out)
  // ---> directions on finding config below

  // div for chatbox
  // using vanilla js (not p5) so we can control scroll position
  messageDiv = document.querySelector('#messageDiv'); //this is to scroll output using js dom

  // submit field and button
  input = select('#input');
  sendBtn = select('#sendBtn');

  input.changed(sendMessage);
  sendBtn.mousePressed(sendMessage);

  let config = {
    apiKey: "AIzaSyC-4LvZ39_rdJp8LpCwdD2LT4Xpi7RoVKE",
    authDomain: "xsocial-bafa7.firebaseapp.com",
    databaseURL: "https://xsocial-bafa7.firebaseio.com",
    projectId: "xsocial-bafa7",
    storageBucket: "xsocial-bafa7.appspot.com",
    messagingSenderId: "885435903629",
    appId: "1:885435903629:web:cdaaa02cee4c2fc9acbcc4",
    measurementId: "G-YX8LWSB5MB"
  };

  firebase.initializeApp(config);

  database = firebase.database();

  // this references the folder you want your data to appear in
  let ref = database.ref(folderName);
  // **** folderName must be consistant across all calls to this folder

  ref.on('value', gotData, errData);
}

function draw() {

}

function sendMessage() {

  let timestamp = Date.now();
  let chatObject = {
    message: input.value(),
    timestamp: timestamp,
  }

  createNode(folderName, timestamp, chatObject);
  input.value('');
}


function displayPastChats() {
  let length = fbDataArray.length;

  for (let i = 0; i < length; i++) {

    let date = new Date(fbDataArray[i].timestamp);

    let p = createP(`${date.toString()} <br> ${fbDataArray[i].message}`);
    p.parent('messageDiv');
  }

  messageDiv.scrollTop = messageDiv.scrollHeight - messageDiv.clientHeight;


}

function displayLastChat() {
  let index = fbDataArray.length - 1;
  let p = createP(fbDataArray[index].message);
  p.parent('messageDiv');

  messageDiv.scrollTop = messageDiv.scrollHeight - messageDiv.clientHeight;

}
