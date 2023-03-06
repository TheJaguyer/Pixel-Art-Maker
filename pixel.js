// Let's Make Pixel Art!!

var canvas = document.querySelector('#squares');
var heightInput = document.querySelector('#height');
var set = document.querySelector('#set');
var palette = document.querySelector('#colors');
var height = 25;
var mycolor = 'white';
var myborder = 'white';
var indicator = document.querySelector('#indicator');
var select = document.querySelector('#color-picker');
var circle;
var saveButton = document.querySelector('#save');
var loadButton = document.querySelector('#load');
var title = '';
const screenshotTarget = canvas;

function makeSquare() {
  let square = document.createElement('square');
  square.classList.add('square');
  square.addEventListener('mousedown', clickColor);
  square.addEventListener('mouseenter', dragColor);
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
  if (e.ctrlKey && e.altKey) {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < height; j++) {
        canvas.children[i].children[j].style.backgroundColor = 'aliceblue';
        canvas.children[i].children[j].style.borderColor = 'rgb(200, 200, 200)';
      }
    }
  }
  if (e.ctrlKey) {
    e.target.style.backgroundColor = 'aliceblue';
    e.target.style.borderColor = 'rgb(200, 200, 200)';
  } else if (e.shiftKey) {
    indicator.style.backgroundColor = e.target.style.backgroundColor;
    mycolor = e.target.style.backgroundColor;
    myborder = e.target.style.borderColor;
  } else if (e.altKey) {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < height; j++) {
        canvas.children[i].children[j].style.backgroundColor = mycolor;
        canvas.children[i].children[j].style.borderColor = myborder;
      }
    }
  } else {
    e.target.style.backgroundColor = mycolor;
    e.target.style.borderColor = myborder;
  }
}

function dragColor(e) {
  if (e.buttons === 1) {
    if (e.ctrlKey) {
      e.target.style.backgroundColor = 'aliceblue';
      e.target.style.borderColor = 'rgb(200, 200, 200)';
    } else {
      e.target.style.backgroundColor = mycolor;
      e.target.style.borderColor = myborder;
    }
  }
}

function newColor() {
  indicator.style.backgroundColor = mycolor;
}

function alter(e) {
  let alteredColor = e.target.value;
  circle.style.backgroundColor = alteredColor;
  mycolor = alteredColor;
  myborder = alteredColor;
  newColor();
}

function saveToLocal() {
  title = prompt('Name your creation!', title);
  localStorage.setItem(title, canvas.innerHTML);
}

function pullFromLocal() {
  let saves = '';
  let load = '';
  let data = '';
  for (let i = 0; i < localStorage.length; i++) {
    saves += '\n' + localStorage.key(i);
  }
  data = prompt('Which one?\n' + saves);
  load = localStorage.getItem(data);
  canvas.innerHTML = load;
  canvas.addEventListener('mousedown', clickColor);
  canvas.addEventListener('mouseover', dragColor);
}

// Actual Running Code

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
    myborder = mycolor;
    newColor();
  });
}
