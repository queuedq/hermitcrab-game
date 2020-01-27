import { Container, DisplayObject, Graphics } from "pixi.js";
import { Player } from "../model/PuzzleElement/Player";
import { RendererOption } from "./RendererOption";

export class PlayerRenderer {
  private readonly playerSprite: DisplayObject

  constructor(
    readonly player: Player,
    readonly option: RendererOption,
  ) {
    this.playerSprite = this.getPlayerSprite();
  }

  private getPlayerSprite(): DisplayObject {
    const sprite = new Graphics();
    sprite.beginFill(0xFF0000);
    sprite.drawCircle(0, 0, this.option.tileSize / 2 - 6);
    sprite.position.set(
      (this.player.pos.x + 0.5) * this.option.tileSize,
      (this.player.pos.y + 0.5) * this.option.tileSize,
    );
    sprite.endFill();
    console.log(sprite.position);
    return sprite;
  }

  render(container: Container) {
    container.addChild(this.playerSprite);
  }
}
