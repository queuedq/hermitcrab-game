import { Point } from "../core/Point";
import { DisplayObject } from "pixi.js";

export function setSpritePos(sprite: DisplayObject, pos: Point, tileSize: number) {
  sprite.position.set(pos.x * tileSize, pos.y * tileSize);
}
