"use strict";
// template for firebase

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
    let p = createP(fbDataArray[i].message);
    // p.position(i * 50, random(windowHeight)); // move them across screen via time
    // p.position(random(windowWidth), random(windowHeight)); // gives them random position
    // p.style('background-color', `rgb(255, 0, ${i * 10})`);
    // p.style('opacity', i / length);

    // p.class('message'); //if you wanted to assign it a class
    // p.parent('messagesDiv') //parent it to a div
    // ^^ note you have to define a message class and messages div for that to work
  }

}

function displayLastChat() {

  let length = fbDataArray.length;

  let p = createP(fbDataArray[length - 1].message); // this just shows last message

  // p.position(length * 50, random(windowHeight)); // move them across screen via time
  // // p.position(random(windowWidth), random(windowHeight)); // gives them random position
  // p.style('background-color', 'rgb(80, 200, 255)');
  // ^^ note you have to define a message class and messages div for that to work
  // p.class('message');
  // p.parent('messagesDiv');


}
// function displayChat(){
//
//   let length = fbDataArray.length;
//
//   createP(fbDataArray[length-1].message);
//
//   input.value('');
//
//   // for (let i = 0; i < length; i++){
//   //   createP(fbDataArray[i].message);
//   // }
// }
