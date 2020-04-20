"use strict";

// this js file handles all calls to firebase

// fires upon receiving FB data
function gotData(data) {

  // need to retrieve firebase data with val() method
  // this returns an object of all data
  fbData = data.val();

  if (fbData) { // check to see if there is something in your database to start
    console.log('received data:');
    console.log(fbData);

    // create an array of the post values (if you need to loop through it retaining order of entries)
    fbDataArray = Object.values(fbData);
  }
}

function errData(err) {
  console.log("error! did not receive data");
  console.log(err);
}

// this is how we structured it for our simple message chat....
function createNode() {

  // assign timestamp for the node
  // we will use this both for the node ID and include it in the node object itself
  // *** this is redundant but helps retain reference to the keys when we update the node values in an array
  let timeStamp = Date.now(); // milliseconds since midnight of January 1, 1970 (beginning of time ;)

  // first, create object you want to submit as nodeData
  nodeData = {
    timeStamp: timeStamp,
    // add other key:value pairs here
  }

  // now, push node data to firebase!
  // this will create an object with timestamp as a key and timestamp as a value
  // again, totally redundant but easy way to work with fbDataArray and still access keys
  // it will appear inside a folder 'folderName' --> must be same name as line 44 in sketch.js
  firebase.database().ref('folderName/' + timeStamp).set(nodeData); // CHANGE 'folderName to your folder name'

  // note: if you later want to change timestamp to date...
  // let date = new Date(timeStamp); // create date object with that timestamp
  // console.log(date); // will print: Mon Apr 20 2020 09:56:15 GMT-0700 (Pacific Daylight Time)
}

// most concise way to create a new node
// the node folder name, id, and object are all passed in as parameters
function createNodeWParameters(_nodeFolder, _nodeId, _nodeObject){
  firebase.database().ref(_nodeFolder + '/' + _nodeId).set(_nodeObject);
}

// the update method will update an existing node
function updateNode(_nodeID) {
  // in our example _nodeID is the timestamp

  // update the node with same timeStamp
  // this will update existing key:value pair(s) OR add new ones to your object
  firebase.database().ref('folderName/' + _nodeID).update({
    // key: value,
    // key2: value2,
  });
}

// And this removes an entire node from your folder
function deleteNode(_nodeID) {
  firebase.database().ref('folderName/' + _nodeID).remove();
}
