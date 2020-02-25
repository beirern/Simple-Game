import { binarySearch } from "./functions.js";
import { Cell } from "./cell.js";

class Grid {
  canvas;
  width;
  height;
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

    // Making canvas full screen and divisible by numBins
    // Add one to leave room for one pixel border
    this.canvas.width = window.outerWidth - (window.outerWidth % numBins) + 1;
    this.canvas.height =
      window.outerHeight - (window.outerHeight % numBins) + 1;

    // Getting Canvas Size
    this.width = this.canvas.width;
    this.height = this.canvas.height;

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
          this.currentCells[i].push(new Cell(j, i));
        }
      }
    }

    for (i = 0; i < this.currentCells.length; i++) {
      this.ctx.fillRect(
        i * Math.floor(this.width / this.numBins),
        0,
        1,
        this.height
      );
      this.xCoords.push(i * Math.floor(this.width / this.numBins));
    }
    this.ctx.fillRect(this.width - 1, 0, 1, this.height);
    this.xCoords.push(this.width - 1);

    console.log(this.xCoords);

    for (i = 0; i < this.currentCells.length; i++) {
      this.ctx.fillRect(
        0,
        i * Math.floor(this.height / this.numBins),
        this.width,
        1
      );
      this.yCoords.push(i * Math.floor(this.height / this.numBins));
    }
    this.ctx.fillRect(0, this.height - 1, this.width, 1);
    this.yCoords.push(this.height - 1);

    // Redraw Filled in Spaces
    this.redraw();
  }

  redraw() {
    let i;
    let j;
    for (i = 0; i < this.currentCells.length; i++) {
      for (j = 0; j < this.currentCells.length; j++) {
        if (this.currentCells[i][j].alive) {
          this.ctx.fillStyle = this.fillCellColor;
          this.ctx.fillRect(
            this.xCoords[j] + 1,
            this.yCoords[i] + 1,
            this.xCoords[1] - this.xCoords[0] - 1,
            this.yCoords[1] - this.yCoords[0] - 1
          );
        } else {
          this.ctx.fillStyle = this.backgroundColor;
          this.ctx.fillRect(
            this.xCoords[j] + 1,
            this.yCoords[i] + 1,
            this.xCoords[1] - this.xCoords[0] - 1,
            this.yCoords[1] - this.yCoords[0] - 1
          );
        }
      }
    }
  }

  markCell(event) {
    const x = event.pageX - 9; // 9 is offset to correct for click being off
    const y = event.pageY - 9;

    // Do binary search to get coords and for some reason subtract 2 to get correct index
    let newX = binarySearch(this.xCoords, x);
    if (newX < 0) {
      newX = -1 * binarySearch(this.xCoords, x) - 2;
    }
    let newY = binarySearch(this.yCoords, y);
    if (newY < 0) {
      newY = -1 * binarySearch(this.yCoords, y) - 2;
    }

    if (this.currentCells[newY][newX].alive) {
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
    this.currentCells[newY][newX].alive = !this.currentCells[newY][newX].alive;

    // Get Neighbors for Current Cells
    this.currentCells[newY][newX].getNeighbors(this.currentCells);
    this.currentCells[newY][newX].updateNeighbors(this.currentCells);
  }

  // Moves to next stage of life
  getNextStage() {
    let i;
    let j;
    let tempCell;
    for (i = 0; i < this.currentCells.length; i++) {
      this.nextCells.push([]);
      for (j = 0; j < this.currentCells[0].length; j++) {
        tempCell = this.currentCells[i][j];
        if (tempCell.alive) {
          if (tempCell.numNeighbors <= 1) {
            // 0 or 1 neighbors dies
            this.nextCells[i].push(new Cell(j, i));
          } else if (tempCell.numNeighbors <= 3) {
            // 2 or 3 survives
            this.nextCells[i].push(new Cell(j, i, true));
          } else {
            // 4 or more die
            this.nextCells[i].push(new Cell(j, i));
          }
        } else {
          if (tempCell.numNeighbors === 3) {
            // 3 neighbors populates
            this.nextCells[i].push(new Cell(j, i, true));
          } else {
            this.nextCells[i].push(new Cell(j, i));
          }
        }
      }
    }

    for (i = 0; i < this.nextCells.length; i++) {
      for (j = 0; j < this.nextCells[0].length; j++) {
        this.nextCells[i][j].getNeighbors(this.nextCells);
      }
    }

    this.currentCells = this.nextCells;
    this.nextCells = [];

    this.redraw();
  }
}

export { Grid };
