import * as PIXI from "pixi.js";
import { Level } from "./game/Level";
import { Game } from "./game/Game";

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
  player: { id: "player", pos: [6, 0] },
  shells: [
    { id: "startshell", pos: [6, 0], shape: ["7"], },
    { id: "endshell", pos: [4, 1], shape: ["5", "1"] },
    { id: "ushell", pos: [1, 2], shape: ["8ac", "4.6"] },
  ],
};

const level = Level.parse(levelRep);
const game = new Game(level, app.stage);

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);
