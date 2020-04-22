"use strict";
// template for firebase

let nodeData; // object we will push to firebase
let fbData; // data we pull from firebase
let fbDataArray; // firebase data values converted to an array
let database; // reference to our firebase database
let folderName = "demo-messages"; // name of folder you create in db
let messageInput;
let sendMessageBtn;

function setup() {

  noCanvas();

  // messageInput = select("#messageInput");
  messageInput = document.querySelector("#messageInput");
  sendMessageBtn = document.querySelector("#sendMessageBtn");

  sendMessageBtn.addEventListener('click', sendMessage);

  // Initialize firebase
  // support for Firebase Realtime Database 4 web here: https://firebase.google.com/docs/database/web/start
  // Copy and paste your config here (replace object commented out)
  // ---> directions on finding config below

  let config = {
    apiKey: "AIzaSyC-4LvZ39_rdJp8LpCwdD2LT4Xpi7RoVKE",
    authDomain: "xsocial-bafa7.firebaseapp.com",
    databaseURL: "https://xsocial-bafa7.firebaseio.com",
    projectId: "xsocial-bafa7",
    storageBucket: "xsocial-bafa7.appspot.com",
    messagingSenderId: "885435903629",
    appId: "1:885435903629:web:cdaaa02cee4c2fc9acbcc4",
    measurementId: "G-YX8LWSB5MB"
    // apiKey: "",
    // authDomain: "",
    // databaseURL: "",
    // projectId: "",
    // storageBucket: "",
    // messagingSenderId: "",
    // appId: "",
  };

  firebase.initializeApp(config);

  database = firebase.database();

  // this references the folder you want your data to appear in
  let ref = database.ref(folderName);
  // **** folderName must be consistant across all calls to this folder

  ref.on('value', gotData, errData);


  // ---> To find your config object:
  // They will provide it during Firebase setup
  // or (if your project already created)
  // 1. Go to main console page
  // 2. Click on project
  // 3. On project home page click on name of app under project name (in large font)
  // 4. Click the gear icon --> it's in there!
}

function draw() {

}

function sendMessage() {

  if (messageInput.value) { // check to make sure they typed something

    // first, assign timestamp for the message
    // we will use this both for the message ID and include it in the message object itself
    // *** this is a little redundant but helps when we update the message values
    let timestamp = Date.now(); // milliseconds since midnight of January 1, 1970 (beginning of time ;)

    // first, create object of messageData
    nodeData = {
      messageText: messageInput.value,
      timestamp: timestamp,
    }

    // push to firebase!!!
    createNode(folderName, timestamp, nodeData);

    console.log("sent message:");
    console.log(nodeData);

    // create confirmation paragraph (using p5 DOM createP())
    createP(`sent message: ${nodeData.messageText}`);

    // zero out text area
    messageInput.value = ''


  } else {
    // if they didn't type anything in the textarea
    alert("uh oh. type message first (ﾟ∇^d) ｸﾞｯ!!")
  }

}
