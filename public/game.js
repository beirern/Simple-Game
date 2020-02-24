import { Grid } from "./grid.js";
import { gameOfLifeLoop } from "./functions.js";

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
});

// Clicking Next takes you one stage forward
const nextButton = document.getElementById("next");
nextButton.addEventListener("click", function() {
  grid.getNextStage();
});

// Clicking Start Infinitely loops the game
const startButton = document.getElementById("start");
startButton.addEventListener("click", function() {
  gameOfLifeLoop(grid);
});

// Clicking Stop stops the infite loop
const stopButton = document.getElementById("stop");
stopButton.addEventListener("click", function() {
  gameOfLifeLoop(grid, true);
});
