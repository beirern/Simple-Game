// Binary Search for arrays
// https://stackoverflow.com/questions/22697936/binary-search-in-javascript
function binarySearch(arr, el) {
  var m = 0;
  var n = arr.length - 1;
  while (m <= n) {
    var k = (n + m) >> 1;
    if (el > arr[k]) {
      m = k + 1;
    } else if (el < arr[k]) {
      n = k - 1;
    } else {
      return k;
    }
  }
  return -m - 1;
}

// Helper function to see if a 2D coordinate is in the array
function inGrid(arr, i, j) {
  if (i < 0 || i >= arr.length || j < 0 || j >= arr[0].length) {
    return false;
  }
  return true;
}

function gameOfLifeLoop(grid, stop = false) {
  if (!stop) {
    gameOfLifetimeout(grid);
  }
}

function gameOfLifetimeout(grid, msec = 1000) {
  setTimeout(function() {
    grid.getNextStage();
    gameOfLifetimeout(grid);
  }, msec);
}

export { binarySearch, inGrid, gameOfLifeLoop };
