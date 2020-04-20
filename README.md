# Experimental Social Media Projects


For Art 101 @ SJSU



⊱ ────── {.⋅ ♫ ⋅.} ───── ⊰

## *BASIC FIREBASE SETUP*

### **0: Set up new GitHub repo**

* I created a quick video in case you forgot some steps...
* Download prepped blank p5 project [here](https://larkvcr.com/xsocial/tuts/blankP5Setup.zip)

<br>

### **1: Set up Firebase project**

* NOTE: When you set up your realtime database, make note of the URL that previews your database on the Firebase website, I weirdly couldn't navigate back to mine when making the tutorial
    * WHHHY? Perhaps bc I didn't enable analytics when I set it up?
    * Or just needs time to register? Stumped

<br>

### **2: Initialize Firebase in p5 repo**

Here is code to copy along with video tutorial. **Students! Please watch video and follow along.** There are a few things I left out so you need the video too =). Also, If you don't know what code is doing you will get lost further down the road.



#### Variables to declare in global scope:

    let nodeData; // object we will push to firebase
    let fbData; // data we pull from firebase
    let fbDataArray; // firebase data values converted to an array
    let database; // reference to our firebase database
    let folderName; // name of folder you create in db
<br>

 #### To copy into setup:

     // Initialize firebase
    // support for Firebase Realtime Database 4 web here: https://firebase.google.com/docs/database/web/start
    // Copy and paste your config here (replace object commented out)
    // ---> directions on finding config below

    // paste your config file here
    let config = {
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

<br>

#### To copy into gotIt.js file (which you have to create and link to in the HTML):

    'use strict';

    function gotData(data) {

      // need to retrieve firebase data with val() method
      // this returns an object of all data
      fbData = data.val();

      if (fbData) { // check to see if there is something in your database to start
        console.log('received data:');
        console.log(fbData);

        // create an array of the post values (if you need to loop through it retaining order of entries)
        fbDataArray = Object.values(fbData);
      } else {
        console.log('nothing in this folder yet');
      }
    }


    function errData(err) {
      console.log("error! did not receive data");
      console.log(err);
    }


<br>

#### Also to paste into gotIt.js file = general functions to write data to Firebase



    // create a new node
    // the node folder name, id, and object are all passed in as parameters

    function createNode(_nodeFolder, _nodeId, _nodeObject) {
    firebase.database().ref(_nodeFolder + '/' + _nodeId).set(_nodeObject);

    // call this function to create and seed the folder!
    // createNode(folderName, "seed", {text: "this is to seed folder"});
    // (to test you can just paste it into the web console)

    }


    // the update method will update an existing node

    function updateNode(_nodeFolder, _nodeID, _updateObject) {
    firebase.database().ref(_nodeFolder + '/' + _nodeId).update(_updateObject);
    // this will update existing key:value pair(s) OR add new ones to your object
    // so your object might look like:
    // { existingKey: updatedKeyValue,
    //   newKey: newValue }
    // Where the existing key is updated and newKey is added
    }

    // And this removes an entire node from your folder

    function deleteNode(_nodeFolder, _nodeID) {
    firebase.database().ref(_nodeFolder + '/' + _nodeID).remove();
    }
