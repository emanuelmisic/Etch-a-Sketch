const DEFAULT_COLOR = "rgba(0, 0, 0, 1)";
const DEFAULT_MODE = "draw";
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

function setColor(newColor) {
  currentColor = newColor;
}

function setMode(newMode) {
  setActiveButton(newMode);
  currentMode = newMode;
}

function setSize(newSize) {
  currentSize = newSize;
}

const colorPicker = document.querySelector("#colorPicker");
const drawBtn = document.querySelector("#draw");
const eraseBtn = document.querySelector("#erase");
const rainbowBtn = document.querySelector("#rainbowPen");
const shadeBtn = document.querySelector("#shade");
const lightBtn = document.querySelector("#light");
const boardSize = document.querySelector("#boardSize");
const gridDisplay = document.querySelector(".grid-display");
const clearBtn = document.querySelector("#clear");

const drawBoard = document.querySelector(".draw-board");

colorPicker.oninput = (e) => setColor(e.target.value);
drawBtn.onclick = () => setMode("draw");
rainbowBtn.onclick = () => setMode("rainbow");
eraseBtn.onclick = () => setMode("erase");
shadeBtn.onclick = () => setMode("shade");
lightBtn.onclick = () => setMode("light");
clearBtn.onclick = () => {
  clearBoard();
  makeGrid(currentSize);
};
boardSize.onmousemove = (e) => updateGridDisplay(e.target.value);
boardSize.onchange = (e) => applyGridSize(e.target.value);

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function makeGrid(size) {
  drawBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  drawBoard.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  for (let i = 0; i < size * size; i++) {
    const pixel = document.createElement("div");
    pixel.classList.add("pixel");
    pixel.style.backgroundColor = "rgba(255, 255, 255, 1)";
    pixel.addEventListener("mouseover", changeColor);
    pixel.addEventListener("mousedown", changeColor);
    drawBoard.appendChild(pixel);
  }
}

function clearBoard() {
  drawBoard.innerHTML = "";
}

function setActiveButton(mode) {
  if (mode === "rainbow") {
    rainbowBtn.classList.add("active");
    drawBtn.classList.remove("active");
    eraseBtn.classList.remove("active");
    lightBtn.classList.remove("active");
    shadeBtn.classList.remove("active");
  } else if (mode === "draw") {
    drawBtn.classList.add("active");
    rainbowBtn.classList.remove("active");
    eraseBtn.classList.remove("active");
    shadeBtn.classList.remove("active");
    lightBtn.classList.remove("active");
  } else if (mode === "erase") {
    eraseBtn.classList.add("active");
    rainbowBtn.classList.remove("active");
    drawBtn.classList.remove("active");
    shadeBtn.classList.remove("active");
    lightBtn.classList.remove("active");
  } else if (mode === "shade") {
    shadeBtn.classList.add("active");
    drawBtn.classList.remove("active");
    lightBtn.classList.remove("active");
    eraseBtn.classList.remove("active");
    rainbowBtn.classList.remove("active");
  } else if (mode === "light") {
    lightBtn.classList.add("active");
    drawBtn.classList.remove("active");
    shadeBtn.classList.remove("active");
    eraseBtn.classList.remove("active");
    rainbowBtn.classList.remove("active");
  }
}

function changeColor(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  if (currentMode === "rainbow") {
    const randomR = Math.floor(Math.random() * 256);
    const randomG = Math.floor(Math.random() * 256);
    const randomB = Math.floor(Math.random() * 256);
    const A = 1;
    e.target.style.backgroundColor = `rgba(${randomR}, ${randomG}, ${randomB}, ${A})`;
  } else if (currentMode === "draw") {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === "erase") {
    e.target.style.backgroundColor = "rgba(255, 255, 255, 1)";
  }
  // else if (currentMode === "shade") {
  //   applyShading(e.target.style.backgroundColor);
  // } else if (currentMode === "light") {
  //   applyLightening(e.target.style.backgroundColor);
  // }
}

function updateGridDisplay(value) {
  gridDisplay.innerHTML = `Grid Size: ${value} x ${value}`;
}

function applyGridSize(value) {
  setSize(value);
  updateGridDisplay(value);
  clearBoard();
  makeGrid(value);
}

// function applyShading(color) {
//   console.log(color);
// }

window.onload = () => {
  makeGrid(DEFAULT_SIZE);
  setActiveButton(DEFAULT_MODE);
};
