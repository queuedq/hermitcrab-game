import { Application } from "pixi.js";
import { Level } from "../state/Level";
import { EnvRenderer } from "./EnvRenderer";

export class LevelRenderer {
  private envRenderer: EnvRenderer;
  private envRendered: boolean;

  constructor(readonly app: Application, readonly level: Level) {
    this.envRenderer = new EnvRenderer(app, this.level.environment);
    this.envRendered = false;
  }

  render() {
    if (!this.envRendered) { this.envRenderer.render(); }
  }
}
