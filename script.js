document.getElementById('black').style.backgroundColor = 'black';
const generateInput = document.getElementById('board-size');
const generateButton = document.getElementById('generate-board');

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
  const pixelBoard = [];
  const pixels = document.querySelectorAll('.pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    pixelBoard[index] = pixels[index].style.backgroundColor;
  }

  localStorage.setItem('pixelBoard', JSON.stringify(pixelBoard));
}

function getBoard() {
  if (!localStorage.getItem('pixelBoard')) {
    return;
  }
  const pixelBoard = JSON.parse(localStorage.getItem('pixelBoard'));
  const pixels = document.querySelectorAll('.pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].style.backgroundColor = pixelBoard[index];
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

function reset() {
  board.innerHTML = '';
}

function inputCheck(inputValue) {
  const size = inputValue;
  if (size < 5) {
    localStorage.setItem('boardSize', 5);
    return 5;
  } if (size > 50) {
    localStorage.setItem('boardSize', 50);
    return 50;
  }
  localStorage.setItem('boardSize', size);
  return size;
}

function createBoard(N) {
  const size = inputCheck(N);
  board.style.setProperty('--size', size);
  for (let i = 0; i < size * size; i += 1) {
    const pixelSquare = document.createElement('div');
    pixelSquare.className = 'pixel';
    pixelSquare.style.backgroundColor = 'white';
    board.appendChild(pixelSquare);
  }
  getBoard();
}

function changeBoardSize() {
  if (generateInput.value === '') {
    alert('Board inválido!');
  }
  reset();
  createBoard(generateInput.value);
}

generateButton.addEventListener('click', changeBoardSize);

window.addEventListener('load', () => {
  assignRandomPalette();
  if (!localStorage.getItem('boardSize')) {
    createBoard(5);
  }
  createBoard(localStorage.getItem('boardSize'));
});

// Referência para método de criação do board: https://www.youtube.com/watch?v=wZZyhrJxZRU
