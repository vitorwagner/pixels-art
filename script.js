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
  document.getElementById('randomColor1').style.backgroundColor = colors[0];
  document.getElementById('randomColor2').style.backgroundColor = colors[1];
  document.getElementById('randomColor3').style.backgroundColor = colors[2];
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

const clearButton = document.getElementById('clear-board');
clearButton.addEventListener('click', () => {
  const pixels = document.querySelectorAll('.pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].style.backgroundColor = 'white';
  }
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
  });
}

paintPixel();

window.onload = assignRandomPalette;
