// Let's Make Pixel Art!!

var canvas = document.querySelector('#squares');
var heightInput = document.querySelector('#height');
var set = document.querySelector('#set');
var palette = document.querySelector('#colors');
var height = 25;
var mycolor = 'white';
var indicator = document.querySelector('#indicator');
var red = document.querySelector('#red');
var blue = document.querySelector('.blue');
var green = document.querySelector('.green');
var yellow = document.querySelector('.yellow');
var black = document.querySelector('.black');
var white = document.querySelector('.white');
var select = document.querySelector('#color-picker');
var circle;
var saveButton = document.querySelector('#save');
var loadButton = document.querySelector('#load');

function makeSquare() {
  let square = document.createElement('square');
  square.style.borderStyle = 'solid';
  square.style.borderColor = 'rgb(200, 200, 200)';
  square.style.borderWidth = '1px';
  square.style.margin = 0;
  square.classList.add('square');
  square.addEventListener('mousedown', clickColor);
  square.addEventListener('mouseover', dragColor);
  return square;
}

function makeRow() {
  let row = document.createElement('row');
  row.classList.add('row');
  for (let i = 0; i < height; i++) {
    row.appendChild(makeSquare());
  }
  return row;
}

function stackRows() {
  while (canvas.children[0]) {
    canvas.removeChild(canvas.children[0]);
  }
  for (let i = 0; i < height; i++) {
    canvas.appendChild(makeRow());
  }
}

function clickColor(e) {
  if (e.shiftKey) {
    indicator.style.backgroundColor = e.target.style.backgroundColor;
    mycolor = e.target.style.backgroundColor;
  } else {
    e.target.style.backgroundColor = mycolor;
    e.target.style.borderColor = mycolor;
  }
}

function dragColor(e) {
  if (e.buttons === 1) {
    e.target.style.backgroundColor = mycolor;
    e.target.style.borderColor = mycolor;
  }
}

function newColor() {
  indicator.style.backgroundColor = mycolor;
}

function alter(e) {
  let alteredColor = e.target.value;
  circle.style.backgroundColor = alteredColor;
  mycolor = alteredColor;
  newColor();
}

function saveToLocal() {
  let fullData = [];
  fullData.push(height);
  fullData.push(canvas.innerHTML);
  localStorage.setItem(prompt('Name your creation!'), JSON.stringify(fullData));
}

function pullFromLocal() {
  let saves = '';
  let load = '';
  let data = '';
  for (let x in localStorage) {
    saves += x + '\n';
  }
  data = prompt('Which one?\n' + saves);
  load = JSON.parse(localStorage.getItem(data));
  height = load[0];
  console.log(canvas);
  console.log(load[1]);
  canvas.innerHTML = load[1];
}

// Actually Running Code

stackRows();

saveButton.addEventListener('click', saveToLocal);
loadButton.addEventListener('click', pullFromLocal);

set.addEventListener('click', function () {
  let newH = heightInput.value;
  if (newH > 0 && newH < 151) {
    height = newH;
    console.log(height);
    stackRows();
  } else {
    alert('Please pick a number from 1 to 100!');
  }
});

select.addEventListener('input', alter);

for (let i = 0; i < palette.children.length - 1; i++) {
  palette.children[i].addEventListener('click', function (e) {
    circle = e.target;
    if (e.shiftKey) {
      select.focus();
      select.click();
    }
    console.log(getComputedStyle(circle).backgroundColor);
    mycolor = getComputedStyle(circle).backgroundColor;
    newColor();
  });
}

// red.addEventListener('mousedown', function (e) {
//   console.log(getComputedStyle(e.target).backgroundColor);
//   mycolor = getComputedStyle(e.target).backgroundColor;
//   newColor();
// });
