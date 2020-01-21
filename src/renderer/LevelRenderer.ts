import { Container } from "pixi.js";
import { Level } from "../state/Level";
import { EnvRenderer } from "./EnvRenderer";
import { EntityRenderer } from "./EntityRenderer";

export class LevelRenderer {
  private envRenderer: EnvRenderer;
  private entityRenderer: EntityRenderer;

  constructor(readonly level: Level) {
    this.envRenderer = new EnvRenderer(this.level.environment);
    this.entityRenderer = new EntityRenderer(this.level.entities);
  }

  render(container: Container) {
    this.envRenderer.render(container);
    this.entityRenderer.render(container);
  }
}
