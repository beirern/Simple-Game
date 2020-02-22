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

  ctx.fillStyle = "green";
  const numBins = 50; // numBins x numBins Grid
  let i;
  for (i = 0; i < width; i += width / numBins) {
    ctx.fillRect(i, 0, 1, height);
    xCoords.push(i);
  }
  ctx.fillRect(width - 1, 0, 1, height);
  xCoords.push(width - 1);

  for (i = 0; i < height; i += height / numBins) {
    ctx.fillRect(0, i, width, 1);
    yCoords.push(i);
  }
  ctx.fillRect(0, height - 1, width, 1);
  yCoords.push(height - 1);
}

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

// Arrays to store coordinates
const xCoords = [];
const yCoords = [];

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
  ctx.fillRect(x, y, 10, 10);
  console.log(xCoords);
  console.log(yCoords);
  console.log(binarySearch(xCoords, x));
});
