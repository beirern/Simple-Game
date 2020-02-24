import { binarySearch } from "./functions.js";

class Grid {
  canvas;
  ctx;
  numBims;
  xCoords;
  yCoords;
  currentCells;
  nextCells;

  fillCellColor = "#66a3ff";
  borderColor = "#333300";
  backgroundColor = "white";

  constructor(numBins, canvas) {
    // Arrays to store coordinates
    this.xCoords = [];
    this.yCoords = [];
    this.currentCells = [];
    this.nextCells = [];

    this.numBins = numBins;
    this.canvas = canvas;

    this.ctx = canvas.getContext("2d");

    this.setUpGrid(this.numBins);
  }

  // Setting up Grid Function and handling resizing
  setUpGrid(numBins) {
    this.numBims = numBins;

    // Making canvas full screen
    this.canvas.width = window.outerWidth;
    this.canvas.height = window.outerHeight;

    // Getting Canvas Size
    let width = canvas.width;
    let height = canvas.height;

    // Empty the Arrays
    this.xCoords = [];
    this.yCoords = [];

    this.ctx.fillStyle = this.borderColor;
    let i;
    let j;

    // Do not reset array on size rechange
    if (this.currentCells.length == 0) {
      for (i = 0; i < numBins; i++) {
        this.currentCells.push([]);
        for (j = 0; j < numBins; j++) {
          this.currentCells[i].push(false);
        }
      }
    }

    for (i = 0; i < this.currentCells.length; i++) {
      this.ctx.fillRect(i * (width / this.numBins), 0, 1, height);
      this.xCoords.push(i * (width / this.numBins));
    }
    this.ctx.fillRect(width - 1, 0, 1, height);
    this.xCoords.push(width - 1);

    for (i = 0; i < this.currentCells.length; i++) {
      this.ctx.fillRect(0, i * (height / this.numBins), width, 1);
      this.yCoords.push(i * (height / this.numBins));
    }
    this.ctx.fillRect(0, height - 1, width, 1);
    this.yCoords.push(height - 1);

    // Redraw Filled in Spaces
    for (i = 0; i < this.currentCells.length; i++) {
      for (j = 0; j < this.currentCells.length; j++) {
        if (this.currentCells[i][j]) {
          this.ctx.fillStyle = this.fillCellColor;
          this.ctx.fillRect(
            this.xCoords[j],
            this.yCoords[i],
            this.xCoords[1] - this.xCoords[0],
            this.yCoords[1] - this.yCoords[0]
          );
        }
      }
    }
  }

  markCell(event) {
    const x = event.pageX - 9; // 9 is offset to correct for click being off
    const y = event.pageY - 9;

    // Do binary search to get coords and for some reason subtract 2 to get correct index
    let newX = -1 * binarySearch(this.xCoords, x) - 2;
    let newY = -1 * binarySearch(this.yCoords, y) - 2;

    if (this.currentCells[newY][newX]) {
      this.ctx.fillStyle = this.backgroundColor;
    } else {
      this.ctx.fillStyle = this.fillCellColor;
    }

    this.ctx.fillRect(
      this.xCoords[newX] + 1,
      this.yCoords[newY] + 1,
      this.xCoords[1] - this.xCoords[0] - 1,
      this.yCoords[1] - this.yCoords[0] - 1
    );

    // Mark the filled Cells
    this.currentCells[newY][newX] = !this.currentCells[newY][newX];
  }
}

export { Grid };
