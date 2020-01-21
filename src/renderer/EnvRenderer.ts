import { Graphics, DisplayObject, Container } from "pixi.js";
import { Point } from "../core/Point";
import { Environment } from "../state/Environment";
import { Tile } from "../state/Tile";
import { map2d } from "../core/helpers";

const TILE_SIZE = 40;

export class EnvRenderer {
  private sprites: DisplayObject[] = [];

  constructor(readonly env: Environment) {
    map2d(env.layout, (tile, x, y) => {
      this.sprites.push(this.getTileSprite(tile, new Point(x, y)));
    });
  }

  private getTileSprite(tile: Tile, pos: Point) {
    const tileSprite = new Graphics();

    switch (tile) {
      case Tile.Floor:
        tileSprite.beginFill(0x444444);
        break;
      case Tile.Wall:
        tileSprite.beginFill(0x000000);
        break;
    }

    tileSprite.drawRect(2, 2, TILE_SIZE - 4, TILE_SIZE - 4);
    tileSprite.endFill();
    tileSprite.position.set(pos.x * TILE_SIZE, pos.y * TILE_SIZE);

    return tileSprite;
  }

  render(container: Container) {
    this.sprites.forEach(sprite => container.addChild(sprite));
  }
}
