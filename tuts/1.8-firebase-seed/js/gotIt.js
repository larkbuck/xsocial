"use strict";
// this js file handles all calls to firebase

// fires upon receiving FB data
function gotData(data) {

  // seed array (uncomment on first time initializing database only)
  // seedDatabase(fortunes);

  // need to retrieve firebase data with val() method
  // this returns an object of all data
  fbData = data.val();

  if (fbData) { // check to see if there is something in your database to start
    console.log('received data:');
    console.log(fbData);

    // create an array of the post values (if you need to loop through it retaining order of entries)
    fbDataArray = Object.values(fbData);

    console.log(fbDataArray);

  } else {
    console.log('nothing in this folder yet');
  }
}

function errData(err) {
  console.log("error! did not receive data");
  console.log(err);
}


// create a new node
// the node folder name, id, and object are all passed in as parameters
function createNode(_nodeFolder, _nodeId, _nodeObject) {
  firebase.database().ref(_nodeFolder + '/' + _nodeId).set(_nodeObject);

  // call this function in the web console to create and seed the folder!
  // createNode(folderName, "seed", {text: "this is to seed folder"});
  // (to test you can just paste it into the web console)

}


// the update method will update an existing node
function updateNode(_nodeFolder, _nodeID, _updateObject) {
  firebase.database().ref(_nodeFolder + '/' + _nodeID).update(_updateObject);
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

function seedDatabase(_array) {

  _array.forEach(function(item) {
    // first, assign timestamp for the message
    // we will use this both for the message ID and include it in the message object itself
    // *** this is a little redundant but helps when we update the message values
    let timestamp = Date.now(); // milliseconds since midnight of January 1, 1970 (beginning of time ;)

    // first, create object of messageData
    nodeData = {
      messageText: item,
      timestamp: timestamp,
      received: false,
    }

    // push to firebase!!!
    createNode(folderName, timestamp, nodeData);
  })

}
