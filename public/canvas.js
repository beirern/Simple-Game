import { Grid } from "./grid.js";

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
