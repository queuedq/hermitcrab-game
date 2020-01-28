import { Container, DisplayObject, Graphics } from "pixi.js";
import { Player } from "../puzzleElement/Player";
import { RendererOption } from "./RendererOption";

export class PlayerRenderer {
  private readonly sprite: DisplayObject

  constructor(
    private player: Player,
    readonly option: RendererOption,
  ) {
    this.sprite = this.getPlayerSprite();
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
    return sprite;
  }

  render(container: Container) {
    container.addChild(this.sprite);
  }

  update(player: Player) {
    this.player = player;
    this.sprite.position.set(
      (player.pos.x + 0.5) * this.option.tileSize,
      (player.pos.y + 0.5) * this.option.tileSize,
    );
  }
}
