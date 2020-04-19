"use strict";

// this js file handles all calls to firebase

function gotData(data) {
  // need to retrieve firebase data with val() method
  // this returns an object of all data
  fbData = data.val();

  if (fbData) { // check to see if there is something in your database to start
    console.log('received data:');
    console.log(fbData);

    // this creates an array of the data (easier to loop thru)
    fbDataArray = Object.values(fbData);
  }
}

function errData(err) {
  console.log("error! did not receive data");
  console.log(err);
}


function createNode() {

  // assign timestamp for the node
  // we will use this both for the node ID and include it in the node object itself
  // *** this is a little redundant but helps when we update the node values
  let timeStamp = Date.now(); // milliseconds since midnight of January 1, 1970 (beginning of time ;)

  // first, create object of nodeData
  nodeData = {
    timeStamp: timeStamp
  }


  // now, push node data to firebase!
  // this will create an object with timestamp as a key
  // it will appear inside a folder 'folderName' --> must be same name as line 51 in sketch.js
  let result = firebase.database().ref('folderName/' + timeStamp).set(nodeData);

}



function updateNode() {
      // the update method will update an existing node

      // update the node with same timeStamp
      firebase.database().ref('folderName/' + timeStamp).update({
        // key: value
        // this will update existing key-value pair OR add new one to your object
      });

  }
