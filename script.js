function randomColor() {
  const r = Math.random() * 255;
  const g = Math.random() * 255;
  const b = Math.random() * 255;
  return `rgb(${r}, ${g}, ${b})`;
}

function generateRandomPalette() {
  document.getElementById('randomColor1').style.backgroundColor = randomColor();
  document.getElementById('randomColor2').style.backgroundColor = randomColor();
  document.getElementById('randomColor3').style.backgroundColor = randomColor();
}

window.onload = generateRandomPalette;
