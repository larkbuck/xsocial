"use strict";
// template for firebase

let nodeData; // object we will push to firebase
let fbData; // data we pull from firebase
let fbDataArray; // firebase data values converted to an array
let database; // reference to our firebase database

function setup() {

  noCanvas();

  // Initialize firebase
  // support for Firebase Realtime Database 4 web here: https://firebase.google.com/docs/database/web/start
  // Copy and paste your config here (replace object commented out)
  // ---> directions on finding config below


  let config = {
    // apiKey: "",
    // authDomain: "",
    // databaseURL: "",
    // projectId: "",
    // storageBucket: "",
    // messagingSenderId: "",
    // appId: "",
    // measurementId: ""
  };

  firebase.initializeApp(config);

  database = firebase.database();

  // this references the folder you want your data to appear in
  let ref = database.ref('folderName'); // change folderName ****
  // **** whatever you name it must be same as line 44 in gotIt.js

  ref.on('value', gotData, errData);


  // ---> To find your config object:
  // They will provide it during Firebase setup)
  // or (if your project already created)
  // 1. Go to your the Settings icon Project settings in the Firebase web console.
  // 2. In the Your apps card, select the nickname of the app for which you need
  // a config object.
  // 3. Select Config from the Firebase SDK snippet pane.
  // 4. Copy the config object snippet, then add it to your app's HTML.
}

function draw() {

}
