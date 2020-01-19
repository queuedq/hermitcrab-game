import * as PIXI from "pixi.js";

//Create a Pixi Application
let app = new PIXI.Application({ width: 800, height: 600 });

// const level = [
//   ".x....1",
//   "....2..",
//   ".3332..",
//   ".3.3...",
//   ".......",
//   ".......",
//   "......."
// ];
// const shells = {
//   1: {}
// };

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);
