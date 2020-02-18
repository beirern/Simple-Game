const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Getting Canvas Size
const width = canvas.width;
const height = canvas.height;

// Setting up Grid
ctx.fillStyle = "green";
let i;
for (i = 0; i < width; i += width / 10) {
  ctx.fillRect(i, 0, 1, height);
}
ctx.fillRect(width - 1, 0, 1, height);

for (i = 0; i < height; i += height / 10) {
  ctx.fillRect(0, i, width, 1);
}
ctx.fillRect(0, height - 1, width, 1);
