# Experiments in Social Media


#### *For Art 101 @ San José State University, Spring 2020*


#### LINKS:
* [Website w/ demos](https://larkvcr.com/xsocial/)
* [YouTube tutorial playlist](https://www.youtube.com/playlist?list=PLT6L9mOkCXcO1XM6Aj-qMYljSDgNutQGy) - unlisted pls do not repost =)
* [Atom keyboard shortcuts](atom-shortcuts)

<br>

#### ON THIS PAGE:


* [0: Basic Firebase Setup](#-basic-firebase-setup)
  * Vids 0.0-0.3
* [1: "Old media" - send and receive unique messages](#-send-and-receive-unique-messages)
  * Vids 1.0 - 1.8
  * [Sending Data](#sending-data-to-firebase)
  * [Receiving Data](#receiving-data)
  * [Shuffling arrays](#shuffling-arrays)
  * [Seeding the database](#seeding-the-database) (fortune cookie api)
* [2: Basic + wild chatrooms](#-make-a-basic-chatroom)
  * Vids 2.0 - 2.4
  * [Basic: display messages](#basic-chat)
  * [Wild: experiment with chat position](#wild-chat)
* [3: Autoscroll chat](#-chatroom-with-autoscroll-div)
  * Vids 3.0-3.2
  * [Include time stamp and username](#include-timestamp-and-username)




<br>

### ⊱ ────── {.⋅ ♫ ⋅.} ───── ⊰

# ▼△▼△▼ Basic Firebase Setup

[Videos 0.0 - 0.3](https://www.youtube.com/playlist?list=PLT6L9mOkCXcO1XM6Aj-qMYljSDgNutQGy)

### **0.0: Set up new GitHub repo**

* I created a quick video in case you forgot some steps...
* Download prepped blank p5 project [here](https://larkvcr.com/xsocial/tuts/blankP5Setup.zip)

<br>

### **0.1: Set up Firebase project**

* NOTE: When you set up your realtime database on the Firebase website, make note of the URL for the database. The Firebase Web Console might lag in linking to your database.

***Important:***
* Firebase databases are NOT SECURE when anyone is allowed to read and write to them in the rules. For secure dynamic databases you need to host your website with a "virtual machine," aka back end. This is not possible on a GitHub pages website.
* Do not store private information here.
* Also someone might 'accidentally' delete or hijack your database. Make backups! Firebase will automatically backup your data with a Blaze plan (not free but I only pay 4-6 cents a month for two big projects). You can set alerts for when your monthly costs exceed a dollar amount.

<br>

### **0.2: Initialize Firebase in p5**

Here is code to copy along with video tutorial 0.2. **Students! Please follow along with the videos.** There are a few things I left out so you need the videos too =). Plus if you don't know what code is doing you will get lost further down the road.

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

    // this points to the folder you want your data to appear in
    let ref = database.ref(folderName);

    // initialize Firebase connection
    // callback functions are gotData() and errData()
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

### **0.3: Initialize Firebase in p5**


#### Write data to Firebase by creating a new node!!!




    // create a new node
    // the node folder name, id, and object are all passed in as parameters

    function createNode(_nodeFolder, _nodeId, _nodeObject) {
    firebase.database().ref(_nodeFolder + '/' + _nodeId).set(_nodeObject);

    // call this function in the web console to create and seed the folder!
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
*Create a template repository with just this code. Create a new repo and call it "firebase template." Click "make this a template repository." Copy these files into it (minus the .git file) -- be sure to delete your config API!!

Now all this will be set up for next time. You can just create a new repository from this template. =)* [Link to download here](tuts/firebaseSetup-basic.zip)

<br>
<br>
<br>

### ⊱ ────── {.⋅ ♫ ⋅.} ───── ⊰

# ▼△▼△▼ Send and Receive Unique Messages

Send and receive messages, the old way.

I will be building a "fortune cookie-ish" project, you could also choose another form from the [History of Messaging](https://simpletexting.com/history-of-messaging/) (ie. message-in-a-bottle, carrier pigeons, telegraphs, letters, time capsules)


* [Videos 1.0 - 1.8](https://www.youtube.com/playlist?list=PLT6L9mOkCXcO1XM6Aj-qMYljSDgNutQGy)




<br>

## Sending data to Firebase

* we already wrote a function for this in our gotIt.js file!
* we made it easy by passing the node folder name, id, and object as parameters



    function createNode(_nodeFolder, _nodeId, _nodeObject) {
      firebase.database().ref(_nodeFolder + '/' +
      _nodeId).set(_nodeObject);
    }


But you don't really need that whole function. The basic method for this is:

      firebase.database().ref(_nodeFolder + '/' + _nodeId).set(_nodeObject);

In this project, we simply included the createNode() function in a callback for a "send message" button

The object for each message is:

      nodeData = {
        messageText: messageInput.value,
        timestamp: timestamp,
        messageReceived: false,
      }

...we add the messageReceived value in the next section....

## Receiving data

* The basic idea is that you sort through data in the function gotData(data), which is the callback from when we initialize firebase
  * We already wrote gotData() in our basic setup but here it is again =)
  * Node we store the data in our variables fbData (object) and fbDataArray (fbData converted to an array)


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

The essence of this is:

      function gotData(data) {
        fbData = data.val();
      }

<br>

## Shuffling Arrays

We need to shuffle all the data in our database so that you receive a random message, not the next one in the order they were received.

Turns out shuffling arays is not as easy as you might think....

The Fisher-Yates algorithm is efficient and avoids having to create duplicate arrays. But it is a little confusing.
* [Easy explanation here](https://medium.com/@qjawe/js-shuffle-cards-or-any-elements-with-the-fisher-yates-shuffle-algorithm-b70750c497d5)
* [Javascript.info tutorial here](https://javascript.info/task/shuffle) (click solution and scroll down)



    function shuffle(array) {

      // iterate backwards through an array
      for (let i = array.length - 1; i > 0; i--) {

        // grab random index from 0 to i
        let randomIndex = Math.floor(Math.random() * (i + 1));

        // swap elements array[i] and array[j]
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]]; // using "destructuring assignment" syntax

        // same can be written as:
        // let arrayItem = array[i]; // array item in original position array[i]
        // array[i] = array[randomIndex]; // overwrite array[i] with new item at random index
        // array[randomIndex] = arrayItem; // now move array item from original position into random position

      }
    }

<br>

### ⊱ ────── {.⋅ ♫ ⋅.} ───── ⊰

# ▼△▼△▼ Make a basic chatroom



## Basic chat

* Vids 2.0 - 2.1

Have messages appear instantaneously on screen.

---> save this code as template

<br>

## Wild chat

* Vids 2.2 - 2.4

Experiment with chat position. First have messages appear randomly in the window, then experiment with what happens when they are placed beyond the windowWidth or windowHeight.




### ⊱ ────── {.⋅ ♫ ⋅.} ───── ⊰

# ▼△▼△▼ Chatroom with autoscroll div

* Vids 3.0-3.2

## Include timestamp and username

For the timestamp: We already included Date.now() in our object for each chat. These returns the milliseconds from midnight on Jan 1st 1970 (the beginning of computer time). Use the Javascript date object to convert that to readable date:


    let dateObject = new Date(fbDataArray[index].timestamp);

    let humanDate = dateObject.toString();



For the username: Create another input field for the username and store it in the object/node for each message.

**Challenge:** can you create unique passwords?
-- > this is much more complicated... look up how other people have approached this with Firebase.
