"use strict";
// template for firebase

let nodeData; // object we will push to firebase
let fbData; // data we pull from firebase
let fbDataArray; // firebase data values converted to an array
let database; // reference to our firebase database
let folderName = "demo-messages"; // name of folder you create in db
let messageInput;
let sendMessageBtn;
let receiveMessageBtn;
let sendAgainBtn;
let receivedMessage;
let receiveDiv, sendDiv, loadingDiv;

function setup() {

  noCanvas();

  // access DOM elements
  // messageInput = select("#messageInput");
  messageInput = document.querySelector("#messageInput");
  sendMessageBtn = document.querySelector("#sendMessageBtn");
  receiveMessageBtn = document.querySelector("#receiveMessageBtn");
  receivedMessage = document.querySelector("#receivedMessage");
  sendAgainBtn = document.querySelector("#sendAgainBtn");
  receiveDiv = document.querySelector("#receiveDiv");
  sendDiv = document.querySelector("#sendDiv");
  loadingDiv = document.querySelector("#loadingDiv");


  sendMessageBtn.addEventListener('click', sendMessage);
  receiveMessageBtn.addEventListener('click', receiveMessage);
  sendAgainBtn.addEventListener('click', sendAgain);

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
      received: false,
    }

    // push to firebase!!!
    createNode(folderName, timestamp, nodeData);

    console.log("sent message:");
    console.log(nodeData);

    // // create confirmation paragraph (using p5 DOM createP())
    // createP(`sent message: ${nodeData.messageText}`);

    // zero out text area
    messageInput.value = ''

    sendDiv.style.display = 'none';
    receiveDiv.style.display = 'block';


  } else {
    // if they didn't type anything in the textarea
    alert("uh oh. type message first (ﾟ∇^d) ｸﾞｯ!!")
  }

}

function receiveMessage() {

  for (let i = 0; i < fbDataArray.length; i++) {
    if (fbDataArray[i].received === false) {
      // console.log("received message:");
      // console.log(fbDataArray[i].messageText);

      receivedMessage.innerHTML = fbDataArray[i].messageText;

      updateNode(folderName, fbDataArray[i].timestamp, {
        received: true
      });

      // toggle display of buttons
      receiveMessageBtn.style.display = 'none';
      sendAgainBtn.style.display = 'block';

      break;

    } else {

      receivedMessage.innerHTML = "no more messages out at sea";
      // console.log("no more messages out at sea");
    }
  }
}

function sendAgain() {

  // reset receive div
  receivedMessage.innerHTML = "";
  receiveMessageBtn.style.display = 'block';
  sendAgainBtn.style.display = 'none';

  // return to beginning
  receiveDiv.style.display = 'none';
  sendDiv.style.display = 'block';
}
