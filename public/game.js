import { Grid } from "./grid.js";

// Get canvas from HTML
const canvas = document.getElementById("canvas");

// TODO: CHANGE numBins to be more responsive (smaller screen less bins)
let numBins = 50;
const grid = new Grid(numBins, canvas);

// Checking for resize
window.addEventListener("resize", function() {
  grid.setUpGrid(numBins);
});

// Onclick Event for Grid
canvas.addEventListener("click", function(event) {
  grid.markCell(event);
  console.log(grid.currentCells);
});

const startButton = document.getElementById("start");
startButton.addEventListener("click", function() {});

const stopButton = document.getElementById("stop");
stopButton.addEventListener("click", function() {});
