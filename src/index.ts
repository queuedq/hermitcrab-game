import * as PIXI from "pixi.js";
import { Point } from "./core/Point";
import { Level } from "./state/Level";
import { LevelRenderer } from "./renderer/LevelRenderer";

//Create a Pixi Application
let app = new PIXI.Application({ width: 800, height: 600 });

const levelRep = {
  layout: [
    ".#....1",
    "....2..",
    ".3332..",
    ".3.3...",
    ".......",
    ".......",
    "......."
  ],
  player: new Point(0, 0),
};

const level = Level.parse(levelRep);

const renderer = new LevelRenderer(level);
renderer.render(app.stage);

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);
