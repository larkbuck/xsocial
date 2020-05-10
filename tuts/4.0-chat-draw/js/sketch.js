"use strict";
// Chat with drawing grid

// for firebase
let nodeData; // object we will push to firebase
let fbData; // data we pull from firebase
let fbDataArray; // firebase data values converted to an array
let database; // reference to our firebase database
let loaded = false;

// for chat
let folderName = "chat"; // name of folder you create in db
let messageDiv;
let messageInput;
let usernameInput;
let sendBtn;
let chatsLoaded = false;

// for drawing
let cols = 32;
let rows = 18;
let cellWidth;
let cellHeight;
let pixelArray = [];
let bgColorHex = '#fcf9ed'
let bgColor;
let colorPicker;
let pixelColorHex = '#00ff00';
let pixelColor;
let spriteData = {};

let keyCodePressed;


function setup() {

  let cnv = createCanvas(720, 480);
  cnv.parent('#canvasDiv');
  // mouse event specific to canvas! after something is drawn, it's sent to firebase
  cnv.mouseReleased(updateFBPixels);

  // create p5 color picker
  colorPicker = createColorPicker('#ed225d');
  colorPicker.parent('#colorPickerDiv');

  // have to create p5 color object from the hex
  pixelColor = color(pixelColorHex);
  bgColor = color(bgColorHex);
  background(bgColor);

  strokeWeight(0);
  // stroke(color('#f0efeb'));

  // initialize array
  cellWidth = width / cols;
  cellHeight = height / rows;
  pixelArray = make2DArray(cols, rows, cellWidth, cellHeight);


  // save png of canvas when button pressed
  let saveBtn = select('#saveBtn');
  saveBtn.mousePressed(function() {
    save('!!!.png');
  });


  // div for chatbox
  // using vanilla js (not p5) so we can control scroll position
  messageDiv = document.querySelector('#messageDiv'); //this is to scroll output using js dom

  // submit field and button
  usernameInput = select('#usernameInput');
  messageInput = select('#messageInput');
  sendBtn = select('#sendBtn');

  messageInput.changed(sendMessage);
  sendBtn.mousePressed(sendMessage);


  // Initialize firebase
  let config = {
    apiKey: "AIzaSyBLxp2m1Crw_u-oQ1URGAka5yiQgJ5PZ0g",
    authDomain: "messageinabottle-691e5.firebaseapp.com",
    databaseURL: "https://messageinabottle-691e5.firebaseio.com",
    projectId: "messageinabottle-691e5",
    storageBucket: "messageinabottle-691e5.appspot.com",
    messagingSenderId: "97423592542",
    appId: "1:97423592542:web:e164c4afe507d37a3ff8cf"
  };

  firebase.initializeApp(config);

  database = firebase.database();

  // this database reference is for the chat folder
  let ref = database.ref(folderName);
  ref.on('value', gotData, errData);

  // this references the pixel array folder
  // ** this folder name could change to create different "rooms"
  let refPixel = database.ref('drawing');
  refPixel.on('value', gotDataPix, errDataPix);
}

function draw() {
  let rgbArray = colorPicker.color().levels;
  pixelColorHex = '#' + rgbToHex(rgbArray[0], rgbArray[1], rgbArray[2]);

  draw2DArray(pixelArray, cellWidth, cellHeight);
  mouseOverHighlight(pixelArray, cellWidth, cellHeight);
}

function sendMessage() {

  if (usernameInput.value() !== '' && messageInput.value() != '') {
    let timestamp = Date.now();
    let chatObject = {
      username: usernameInput.value(),
      message: messageInput.value(),
      timestamp: timestamp,
    }

    createNode(folderName, timestamp, chatObject);
    messageInput.value('');

  } else {
    alert('type username and message first!')
  }

}


function displayPastChats() {
  let length = fbDataArray.length;

  for (let i = 0; i < length; i++) {
    let p = createP(`${fbDataArray[i].username}: ${fbDataArray[i].message}`);
    p.parent('messageDiv');
  }

  messageDiv.scrollTop = messageDiv.scrollHeight - messageDiv.clientHeight;

}

function displayLastChat() {
  let index = fbDataArray.length - 1;
  let p = createP(`${fbDataArray[index].username}: ${fbDataArray[index].message}`);
  p.parent('messageDiv');

  messageDiv.scrollTop = messageDiv.scrollHeight - messageDiv.clientHeight;

}

function updateFBPixels() {
  // update pixel array in firebase
  createNode('drawing', 'pixelArray', pixelArray);
}


// function to change rgb values from p5 color object to hex
function rgbToHex(r, g, b) {
  let red = toHex(r);
  let green = toHex(g);
  let blue = toHex(b);
  return red + green + blue;
};

// this changes a single number (ie 255) to a two-digit hex
function toHex(number) {
  let hex = Number(number).toString(16);
  if (hex.length < 2) {
    hex = "0" + hex;
  }
  return hex;
};

function saveJSONfile() {
  let object = {
    pixelArray: pixelArray
  }

  let json = JSON.stringify(object);

  saveJSON(json, 'sprite.json');
  console.log("saving JSON");
}

function savePNG() {
  // console.log("saving image");
  save(`sprite_${spriteIndex}.png`);
  console.log(`saved frame ${spriteIndex}`)
}

function make2DArray(_cols, _rows) {
  let arr = [];
  for (let i = 0; i < _cols; i++) {
    arr[i] = [];
    for (let j = 0; j < _rows; j++) {
      // set initial color value to background;
      arr[i][j] = {
        on: false
      };
    }
  }
  return arr;
}


function draw2DArray(_array, _cellWidth, _cellHeight) {
  for (let i = 0; i < _array.length; i++) {
    for (let j = 0; j < _array[i].length; j++) {
      let x = i * _cellWidth;
      let y = j * _cellHeight;




      if (_array[i][j].on == true) {
        fill(_array[i][j].color);
      } else if (_array[i][j].on == false) {
        fill(bgColor);
      }

      // rect(x, y, _cellWidth, _cellHeight, 5, 5, 5, 5);
      rect(x, y, _cellWidth, _cellHeight);
    }
  }
}


function mousePressed() {
  let c = floor(mouseX / cellWidth);
  let r = floor(mouseY / cellHeight);

  if (c >= 0 && c < cols && r >= 0 && r < rows && mouseY > 0 && mouseY < height && mouseX > 0 && mouseX < width) {
    if (keyIsDown(SHIFT)) {
      pixelArray[c][r].on = false;
    } else {
      pixelArray[c][r].on = true;
      pixelArray[c][r].color = pixelColorHex;
    }
  }
}

function mouseDragged() {
  let c = floor(mouseX / cellWidth);
  let r = floor(mouseY / cellHeight);

  if (c >= 0 && c < cols && r >= 0 && r < rows && mouseY > 0 && mouseY < height && mouseX > 0 && mouseX < width) {
    if (keyIsDown(SHIFT)) {
      pixelArray[c][r].on = false;

    } else {
      pixelArray[c][r].on = true;
      pixelArray[c][r].color = pixelColorHex;
    }
  }
}



function mouseOverHighlight(_array, _cellWidth, _cellHeight) {
  let c = floor(mouseX / _cellWidth);
  let r = floor(mouseY / _cellHeight);

  for (let i = 0; i < _array.length; i++) {
    for (let j = 0; j < _array[i].length; j++) {
      let x = i * _cellWidth;
      let y = j * _cellHeight;

      if (mouseX > x && mouseX <= x + _cellWidth && mouseY > y && mouseY <= y + _cellHeight) {
        fill(155, 155, 155, 100);
      } else {
        fill(255, 255, 255, 0);
      }

      rect(x, y, _cellWidth, _cellHeight);
      // rect(x, y, _cellWidth, _cellHeight, 5, 5, 5, 5);
    }
  }
}
