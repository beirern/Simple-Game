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

// Caller for Game of Life Recursive Function
function gameOfLifeLoop(grid, stopButton, clearButton) {
  gameOfLifetimeout(grid, stopButton, clearButton, false);
}

// Recursively Call a Timeout Function every msec milliseconds
function gameOfLifetimeout(grid, stopButton, clearButton, stop, msec = 500) {
  if (grid.isEmpty()) {
    stop = true;
  }
  stopButton.onclick = function() {
    stop = true;
  };
  clearButton.onclick = function() {
    stop = true;
  };
  setTimeout(function() {
    grid.getNextStage();
    if (!stop) {
      gameOfLifetimeout(grid, stopButton, clearButton, stop);
    }
  }, msec);
}

export { binarySearch, inGrid, gameOfLifeLoop };
