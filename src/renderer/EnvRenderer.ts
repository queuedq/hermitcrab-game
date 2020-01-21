import { Graphics, Application } from "pixi.js";
import { Point } from "../core/Point";
import { Environment } from "../state/Environment";
import { Tile } from "../state/Tile";
import { map2d } from "../core/helpers";

const TILE_SIZE = 40;

export class EnvRenderer {
  constructor(readonly app: Application, readonly env: Environment) { }

  private renderTile(tile: Tile, pos: Point) {
    const tileSprite = new Graphics();

    switch (tile) {
      case Tile.Floor:
        tileSprite.beginFill(0x444444);
        break;
      case Tile.Wall:
        tileSprite.beginFill(0x000000);
        break;
    }

    tileSprite.drawRect(2, 2, TILE_SIZE - 2, TILE_SIZE - 2);
    tileSprite.endFill();
    tileSprite.position.set(pos.x * TILE_SIZE, pos.y * TILE_SIZE);

    this.app.stage.addChild(tileSprite);

    return tileSprite;
  }

  render() {
    map2d(this.env.layout, (tile, x, y) => this.renderTile(tile, new Point(x, y)));
  }
}
