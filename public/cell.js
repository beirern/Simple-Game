import { inGrid } from "./functions.js";

class Cell {
  x;
  y;
  alive;
  numNeighbors;

  // Set new
  constructor(x, y, alive = false) {
    this.x = x;
    this.y = y;

    this.numNeighbors = 0;

    this.alive = alive;
  }

  // Check all 8 directions for neighbors
  getNeighbors(currentCells) {
    this.numNeighbors = 0;
    if (inGrid(currentCells, this.y - 1, this.x - 1)) {
      if (currentCells[this.y - 1][this.x - 1].alive) {
        this.numNeighbors++;
      }
    }
    if (inGrid(currentCells, this.y - 1, this.x)) {
      if (currentCells[this.y - 1][this.x].alive) {
        this.numNeighbors++;
      }
    }
    if (inGrid(currentCells, this.y - 1, this.x + 1)) {
      if (currentCells[this.y - 1][this.x + 1].alive) {
        this.numNeighbors++;
      }
    }
    if (inGrid(currentCells, this.y, this.x - 1)) {
      if (currentCells[this.y][this.x - 1].alive) {
        this.numNeighbors++;
      }
    }
    if (inGrid(currentCells, this.y, this.x + 1)) {
      if (currentCells[this.y][this.x + 1].alive) {
        this.numNeighbors++;
      }
    }
    if (inGrid(currentCells, this.y + 1, this.x - 1)) {
      if (currentCells[this.y + 1][this.x - 1].alive) {
        this.numNeighbors++;
      }
    }
    if (inGrid(currentCells, this.y + 1, this.x)) {
      if (currentCells[this.y + 1][this.x].alive) {
        this.numNeighbors++;
      }
    }
    if (inGrid(currentCells, this.y + 1, this.x + 1)) {
      if (currentCells[this.y + 1][this.x + 1].alive) {
        this.numNeighbors++;
      }
    }
  }

  // Update Neighboring cells to have correct neighbor count
  updateNeighbors(currentCells) {
    if (inGrid(currentCells, this.y - 1, this.x - 1)) {
      if (this.alive) {
        currentCells[this.y - 1][this.x - 1].numNeighbors++;
      } else {
        currentCells[this.y - 1][this.x - 1].numNeighbors--;
      }
    }
    if (inGrid(currentCells, this.y - 1, this.x)) {
      if (this.alive) {
        currentCells[this.y - 1][this.x].numNeighbors++;
      } else {
        currentCells[this.y - 1][this.x].numNeighbors--;
      }
    }
    if (inGrid(currentCells, this.y - 1, this.x + 1)) {
      if (this.alive) {
        currentCells[this.y - 1][this.x + 1].numNeighbors++;
      } else {
        currentCells[this.y - 1][this.x + 1].numNeighbors--;
      }
    }
    if (inGrid(currentCells, this.y, this.x - 1)) {
      if (this.alive) {
        currentCells[this.y][this.x - 1].numNeighbors++;
      } else {
        currentCells[this.y][this.x - 1].numNeighbors--;
      }
    }
    if (inGrid(currentCells, this.y, this.x + 1)) {
      if (this.alive) {
        currentCells[this.y][this.x + 1].numNeighbors++;
      } else {
        currentCells[this.y][this.x + 1].numNeighbors--;
      }
    }
    if (inGrid(currentCells, this.y + 1, this.x - 1)) {
      if (this.alive) {
        currentCells[this.y + 1][this.x - 1].numNeighbors++;
      } else {
        currentCells[this.y + 1][this.x - 1].numNeighbors--;
      }
    }
    if (inGrid(currentCells, this.y + 1, this.x)) {
      if (this.alive) {
        currentCells[this.y + 1][this.x].numNeighbors++;
      } else {
        currentCells[this.y + 1][this.x].numNeighbors--;
      }
    }
    if (inGrid(currentCells, this.y + 1, this.x + 1)) {
      if (this.alive) {
        currentCells[this.y + 1][this.x + 1].numNeighbors++;
      } else {
        currentCells[this.y + 1][this.x + 1].numNeighbors--;
      }
    }
  }
}

export { Cell };
