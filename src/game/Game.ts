import { Container } from "pixi.js";
import { keyboard } from "../pixi/keyboard";
import { Direction } from "../core/Direction";
import { LevelRenderer } from "../renderer/LevelRenderer";
import { Level, LevelState } from "./Level";

export class Game {
  private undoStack: LevelState[] = [];
  private renderer: LevelRenderer;

  constructor(public level: Level, container: Container) {
    this.renderer = new LevelRenderer(level);
    this.renderer.render(container);
    this.registerKeys();
  }

  movePlayerAction = (dir: Direction) => () => {
    this.undoStack.push(this.level.exportState());
    this.level.movePlayer(dir);
    this.renderer.update(this.level);
  }

  undoAction = () => {
    const state = this.undoStack.pop();
    if (state === undefined) { return; }
    this.level.importState(state);
    this.renderer.update(this.level);
  }

  registerKeys() {
    const up = keyboard("ArrowUp");
    const right = keyboard("ArrowRight");
    const down = keyboard("ArrowDown");
    const left = keyboard("ArrowLeft");
    const undo = keyboard("z");

    up.press = this.movePlayerAction(Direction.Up);
    right.press = this.movePlayerAction(Direction.Right);
    down.press = this.movePlayerAction(Direction.Down);
    left.press = this.movePlayerAction(Direction.Left);

    undo.press = this.undoAction;
  }
}
