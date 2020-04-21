# Experimental Social Media Projects


For Art 101 @ SJSU

[tut demos here](https://larkvcr.com/xsocial/)


⊱ ────── {.⋅ ♫ ⋅.} ───── ⊰

## *BASIC FIREBASE SETUP*

Videos published in our class YouTube...

### **0.0: Set up new GitHub repo**

* I created a quick video in case you forgot some steps...
* Download prepped blank p5 project [here](https://larkvcr.com/xsocial/tuts/blankP5Setup.zip)

<br>

### **0.1: Set up Firebase project**

* NOTE: When you set up your realtime database, make note of the URL for the database on the Firebase website. I couldn't navigate back to it through the sidebar menu for 3 hrs 

***Important:***
* Firebase databases are NOT SECURE when anyone is allowed to read and write to them in the rules. For secure dynamic databases you need backend hosting (not possible on GitHub pages).
* So basically do not store private information.
* Also someone might 'accidentally' delete or hijack your database. Make backups! You can make auto backups with a Blaze plan (not free but I only pay 4-6 cents a month for two big projects).
* ---> Video tut on how we will approach Firebase security COMING SOON

<br>

### **0.2: Initialize Firebase in p5 Project pt 1**

Here is code to copy along with video tutorial. **Students! Please watch video and follow along.** There are a few things I left out so you need the video too =). Also, If you don't know what code is doing you will get lost further down the road.

[Link to Firebase docs for web app](https://firebase.google.com/docs/database/web/start)



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

### **0.3: Initialize Firebase in p5 Project pt 2**


#### Write data to Firebase by creating a new node!!!




    // create a new node
    // the node folder name, id, and object are all passed in as parameters

    function createNode(_nodeFolder, _nodeId, _nodeObject) {
    firebase.database().ref(_nodeFolder + '/' + _nodeId).set(_nodeObject);

    // call this function to create and seed the folder!
    // createNode(folderName, "seed", {text: "this is to seed folder"});
    // (to test you can just paste it into the web console)

    }

<br>

#### Also to paste into gotIt.js file = general functions to write data to Firebase


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

<br>

#### Tip:
*Delete your config API info and make this a duplicate of this repository a 'template repository'. You can do this in repository settings. That way all this will be set up for next time =)*
