"use strict";


let messageData;
let fbData; // firebase data
let fbDataArray;
let database;
let messageInput;
let messageText;
let sendMessageBtn;

function setup() {

  noCanvas();

  messageInput = document.querySelector('#messageInput');
  sendMessageBtn = document.querySelector('#sendMessageBtn');

  // create message when button clicked
  sendMessageBtn.onclick = function() {
    // check to make sure they have written something in text field
    if (messageInput.value) {
      messageText = messageInput.value;
      createMessageNode();
    } else {
      alert("please type your message first =)")
    }
  }



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
  };

  firebase.initializeApp(config);

  database = firebase.database();

  // this references folder 'messagesBottle' --> whatever you name it must be same as line 44 in sketch.js
  let ref = database.ref('messagesBottle');
  ref.on('value', gotData, errData);


  // ---> To find your config object:
  // (Find it in your Firebase SDK in Firebase setup)
  // or (if your project already created)
  // 1. Go to your the Settings icon Project settings in the Firebase web console.
  // 2. In the Your apps card, select the nickname of the app for which you need
  // a config object.
  // 3. Select Config from the Firebase SDK snippet pane.
  // 4. Copy the config object snippet, then add it to your app's HTML.


}

function draw() {

}

function shuffleArray(array) {
  // shuffle entries using Fisher-Yates Shuffle: https://javascript.info/task/shuffle
  for (let i = array.length - 1; i > 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

    // swap elements array[i] and array[randomIndex]
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
}
