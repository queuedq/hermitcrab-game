import * as PIXI from "pixi.js";
import { Level } from "./model/Level";
import { LevelRenderer } from "./renderer/LevelRenderer";
import { keyboard } from "./pixi/keyboard";
import { Direction } from "./core/Direction";

//Create a Pixi Application
let app = new PIXI.Application({ width: 800, height: 600 });

const levelRep = {
  env: [".#.....",
        ".......",
        ".......",
        ".......",
        ".......",
        ".......",
        "......."],
  player: [6, 0],
  shells: [
    { pos: [6, 0], shape: ["7"], },
    { pos: [4, 1], shape: ["5", "1"] },
    { pos: [1, 2], shape: ["8ac", "4.6"] },
  ],
};

let level = Level.parse(levelRep);

const renderer = new LevelRenderer(level);
renderer.render(app.stage);


const up = keyboard("ArrowUp");
const right = keyboard("ArrowRight");
const down = keyboard("ArrowDown");
const left = keyboard("ArrowLeft");

up.press = () => {
  level = level.movePlayer(Direction.Up);
  renderer.update(level);
}
right.press = () => {
  level = level.movePlayer(Direction.Right);
  renderer.update(level);
}
down.press = () => {
  level = level.movePlayer(Direction.Down);
  renderer.update(level);
}
left.press = () => {
  level = level.movePlayer(Direction.Left);
  renderer.update(level);
}

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);
