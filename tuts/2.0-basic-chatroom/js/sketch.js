"use strict";
// template for firebase basic chatroom
// YOU WILL NEED TO PASTE YOUR CONFIG INFO FROM FIREBASE - LINE 31

let nodeData; // object we will push to firebase
let fbData; // data we pull from firebase
let fbDataArray; // firebase data values converted to an array
let database; // reference to our firebase database
let folderName = "chatMessages"; // name of folder you create in db
let input;
let sendBtn;
let chatsLoaded = false;


function setup() {

  noCanvas();

  // Initialize firebase
  // support for Firebase Realtime Database 4 web here: https://firebase.google.com/docs/database/web/start
  // Copy and paste your config here (replace object commented out)
  // ---> directions on finding config below

  input = select('#input');
  sendBtn = select('#sendBtn');

  input.changed(sendMessage);
  sendBtn.mousePressed(sendMessage);

  // PASTE YOUR FIREBASE CONFIG DATA HERE
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

  // ---> To find your config object:
  // They will provide it during Firebase setup
  // or (if your project already created)
  // 1. Go to main console page
  // 2. Click on project
  // 3. On project home page click on name of app under project name (in large font)
  // 4. Click the gear icon --> it's in there!

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
    let p = createP(fbDataArray[i].message);
  }

}

function displayLastChat() {
  let index = fbDataArray.length - 1;
  let p = createP(fbDataArray[index].message);
}
