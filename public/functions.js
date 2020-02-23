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

export { binarySearch };
