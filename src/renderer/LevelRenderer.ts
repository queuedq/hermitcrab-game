import { Container } from "pixi.js";
import { Level } from "../model/Level";
import { EnvRenderer } from "./EnvRenderer";
import { PuzzleElementRenderer } from "./PuzzleElementRenderer";
import { PlayerRenderer } from "./PlayerRenderer";
import { RendererOption } from "./RendererOption";
import { Point } from "../core/Point";

export class LevelRenderer {
  private envRenderer: EnvRenderer;
  private entityRenderer: PuzzleElementRenderer;
  private playerRenderer: PlayerRenderer;

  readonly option: RendererOption = {
    origin: new Point(80, 80),
    tileSize: 40
  };

  constructor(readonly level: Level) {
    this.envRenderer = new EnvRenderer(this.level.env, this.option);
    this.entityRenderer = new PuzzleElementRenderer(this.level.shells, this.option);
    this.playerRenderer = new PlayerRenderer(this.level.player, this.option);
  }

  render(container: Container) {
    this.envRenderer.render(container);
    this.entityRenderer.render(container);
    this.playerRenderer.render(container);
  }
}
