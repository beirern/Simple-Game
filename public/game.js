import { binarySearch } from "./functions";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Setting up Grid Function
function setUpGrid() {
  // Making canvas full screen
  canvas.width = window.outerWidth;
  canvas.height = window.outerHeight;

  // Getting Canvas Size
  let width = canvas.width;
  let height = canvas.height;

  // Empty the Arrays
  xCoords = [];
  yCoords = [];

  ctx.fillStyle = "green";
  const numBins = 50; // numBins x numBins Grid
  let i;
  let j;

  // Do not reset array on size rechange
  if (filledCells.length == 0) {
    for (i = 0; i < numBins; i++) {
      filledCells.push([]);
      for (j = 0; j < numBins; j++) {
        filledCells[i].push(false);
      }
    }
  }

  for (i = 0; i < filledCells.length; i++) {
    ctx.fillRect(i * (width / numBins), 0, 1, height);
    xCoords.push(i * (width / numBins));
  }
  ctx.fillRect(width - 1, 0, 1, height);
  xCoords.push(width - 1);

  for (i = 0; i < filledCells.length; i++) {
    ctx.fillRect(0, i * (height / numBins), width, 1);
    yCoords.push(i * (height / numBins));
  }
  ctx.fillRect(0, height - 1, width, 1);
  yCoords.push(height - 1);

  // Redraw Filled in Spaces
  for (i = 0; i < filledCells.length; i++) {
    for (j = 0; j < filledCells.length; j++) {
      if (filledCells[i][j]) {
        ctx.fillStyle = "black";
        ctx.fillRect(
          xCoords[j],
          yCoords[i],
          xCoords[1] - xCoords[0],
          yCoords[1] - yCoords[0]
        );
      }
    }
  }
}

// Arrays to store coordinates
let xCoords = [];
let yCoords = [];
let filledCells = [];

setUpGrid();

// Checking for resize
window.addEventListener("resize", function() {
  setUpGrid();
});

// Onclick Event for Grid
canvas.addEventListener("click", function(event) {
  const x = event.pageX - 9; // 9 is offset to correct for click being off
  const y = event.pageY - 9;

  ctx.fillStyle = "black";

  // Do binary search to get coords and for some reason subtract 2 to get correct index
  let newX = -1 * binarySearch(xCoords, x) - 2;
  let newY = -1 * binarySearch(yCoords, y) - 2;
  ctx.fillRect(
    xCoords[newX],
    yCoords[newY],
    xCoords[1] - xCoords[0],
    yCoords[1] - yCoords[0]
  );

  // Mark the filled Cells
  filledCells[newY][newX] = true;
  console.log(filledCells);
});
