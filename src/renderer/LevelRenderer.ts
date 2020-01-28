import { Container } from "pixi.js";
import { Level } from "../game/Level";
import { EnvRenderer } from "./EnvRenderer";
import { PuzzleElementRenderer } from "./puzzleElementRenderer";
import { RendererOption } from "./RendererOption";
import { Point } from "../core/Point";

export class LevelRenderer {
  private envRenderer: EnvRenderer;
  private elementRenderer: PuzzleElementRenderer;

  readonly option: RendererOption = {
    origin: new Point(80, 80),
    tileSize: 40
  };

  constructor(readonly level: Level) {
    this.envRenderer = new EnvRenderer(this.level.env, this.option);
    this.elementRenderer = new PuzzleElementRenderer(this.level.getElementList(), this.option);
  }

  render(container: Container) {
    this.envRenderer.render(container);
    this.elementRenderer.render(container);
  }

  update(level: Level) {
    this.elementRenderer.update(level.getElementList());
  }
}
