document.getElementById('black').style.backgroundColor = 'black';

function randomColor() {
  const r = Math.random() * 255;
  const g = Math.random() * 255;
  const b = Math.random() * 255;
  return `rgb(${r}, ${g}, ${b})`;
}

function generateRandomPalette() {
  const randomColorArray = [];
  for (let index = 0; index < 3; index += 1) {
    randomColorArray.push(randomColor());
  }
  localStorage.setItem('colorPalette', JSON.stringify(randomColorArray));
}

function assignRandomPalette() {
  if (!localStorage.getItem('colorPalette')) {
    generateRandomPalette();
  }
  const colors = JSON.parse(localStorage.getItem('colorPalette'));
  const palette = document.querySelectorAll('.color');
  for (let i = 0; i < palette.length - 1; i += 1) {
    palette[i + 1].style.backgroundColor = colors[i];
  }
}

function selectColor() {
  const palette = document.getElementById('color-palette');
  palette.addEventListener('click', (event) => {
    const selected = document.querySelector('.selected');
    selected.classList.remove('selected');
    event.target.classList.add('selected');
  });
}

selectColor();

function saveBoard() {
  const boardState = [];
  const pixels = document.querySelectorAll('.pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    boardState[index] = pixels[index].style.backgroundColor;
  }

  localStorage.setItem('boardState', JSON.stringify(boardState));
}

function getBoard() {
  if (!localStorage.getItem('boardState')) {
    return;
  }
  const boardState = JSON.parse(localStorage.getItem('boardState'));
  const pixels = document.querySelectorAll('.pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].style.backgroundColor = boardState[index];
  }
}

const clearButton = document.getElementById('clear-board');
clearButton.addEventListener('click', () => {
  const pixels = document.querySelectorAll('.pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].style.backgroundColor = 'white';
  }
  saveBoard();
});

const paletteButton = document.getElementById('button-random-color');
paletteButton.addEventListener('click', () => {
  generateRandomPalette();
  assignRandomPalette();
});

const board = document.getElementById('pixel-board');

function paintPixel() {
  board.addEventListener('click', (event) => {
    const selectedElement = document.querySelector('.selected');
    const selectedColor = selectedElement.style.backgroundColor;
    const selectedPixel = event.target;
    if (event.target.className === 'pixel') {
      selectedPixel.style.backgroundColor = selectedColor;
    }
    saveBoard();
  });
}

paintPixel();

window.addEventListener('load', () => {
  assignRandomPalette();
  getBoard();
});
