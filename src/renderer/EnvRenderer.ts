import { Graphics, DisplayObject, Container } from "pixi.js";
import { Point } from "../core/Point";
import { Environment, Tile } from "../puzzleElement/Environment";
import { map2d } from "../core/helpers";
import { RendererOption } from "./RendererOption";
import { setSpritePos } from "./renderHelper";

export class EnvRenderer {
  private sprites: DisplayObject[] = [];

  constructor(
    readonly env: Environment,
    readonly option: RendererOption,
  ) {
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
        tileSprite.beginFill(0xffffff);
        break;
    }

    tileSprite.drawRect(2, 2, this.option.tileSize - 4, this.option.tileSize - 4);
    tileSprite.endFill();
    setSpritePos(tileSprite, pos, this.option.tileSize);

    return tileSprite;
  }

  render(container: Container) {
    this.sprites.forEach(sprite => container.addChild(sprite));
  }
}
