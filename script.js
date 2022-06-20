const DEFAULT_COLOR = "rgb(100, 100, 100)";
const DEFAULT_MODE = "draw";
const DEFAULT_SIZE = 16;

const colorPicker = document.querySelector("#colorPicker");
const drawBtn = document.querySelector("#draw");
const eraseBtn = document.querySelector("#erase");
const rainbowBtn = document.querySelector("#rainbowPen");
const shadeBtn = document.querySelector("#shade");
const lightBtn = document.querySelector("#light");
const boardSize = document.querySelector("#boardSize");

const drawBoard = document.querySelector(".draw-board");

function makeGrid(size) {
  drawBoard.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  drawBoard.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  for (let i = 0; i < size * size; i++) {
    const pixel = document.createElement("div");
    pixel.classList.add("pixel");
    // pixel.addEventListener("mouseover", changeColor);
    // pixel.addEventListener("mousedown", changeColor);
    drawBoard.appendChild(pixel);
  }
}

function clearBoard() {
  drawBoard.innerHTML = "";
}

function setActiveButton(mode) {
  if (mode === "rainbow") {
    rainbowBtn.classList.add("active");
  } else if (mode === "draw") {
    drawBtn.classList.add("active");
  } else if (mode === "erase") {
    eraseBtn.classList.add("active");
  } else if (mode === "shade") {
    shadeBtn.classList.add("active");
  } else if (mode === "light") {
    lightBtn.classList.add("active");
  }
}

window.onload = () => {
  makeGrid(DEFAULT_SIZE);
  setActiveButton(DEFAULT_MODE);
};
