import { Container, DisplayObject, Graphics } from "pixi.js";
import { PuzzleElement } from "../model/PuzzleElement/PuzzleElement";
import { RendererOption } from "./RendererOption";
import { Cell } from "../model/Shape";
import { setSpritePos } from "./renderHelper";
import { Direction } from "../core/Direction";

export class PuzzleElementRenderer {
  private sprites: Map<string, DisplayObject>;

  constructor(
    readonly elements: PuzzleElement[],
    readonly option: RendererOption,
  ) {
    this.sprites = new Map();

    elements.forEach(element => {
      this.sprites.set(element.id, this.getElementSprite(element));
    })
  }

  private getElementSprite(element: PuzzleElement): DisplayObject {
    const sprite = new Graphics();

    element.getBody().collider.cells.forEach(cell => {
      switch(cell.cellType.type) {
        case "Fill": {
          sprite.beginFill(0x00FF00);
          sprite.drawRect(
            cell.pos.x * this.option.tileSize,
            cell.pos.y * this.option.tileSize,
            this.option.tileSize,
            this.option.tileSize,
          );
          sprite.endFill();
          break;
        }
        case "Fence":
          sprite.beginFill(0x007F00);
          this.drawFence(sprite, cell);
          sprite.endFill();
          break;
      }
    })

    setSpritePos(sprite, element.pos, this.option.tileSize);
    return sprite;
  }

  private drawFence(sprite: Graphics, cell: Cell) {
    if (cell.cellType.type !== "Fence") { return; }
    switch(cell.cellType.dir) {
      case Direction.Up:
        sprite.drawRect(
          cell.pos.x * this.option.tileSize,
          cell.pos.y * this.option.tileSize,
          this.option.tileSize, 4,
        );
        break;
      case Direction.Down:
        sprite.drawRect(
          cell.pos.x * this.option.tileSize,
          (cell.pos.y + 1) * this.option.tileSize - 4,
          this.option.tileSize, 4,
        );
        break;
      case Direction.Left:
        sprite.drawRect(
          cell.pos.x * this.option.tileSize,
          cell.pos.y * this.option.tileSize,
          4, this.option.tileSize,
        );
        break;
      case Direction.Right:
        sprite.drawRect(
          (cell.pos.x + 1) * this.option.tileSize - 4,
          cell.pos.y * this.option.tileSize,
          4, this.option.tileSize,
        );
        break;
    }
  }

  private updateElement(element: PuzzleElement) {
    const sprite = this.sprites.get(element.id);
    if (sprite === undefined) { console.error("Error: EntityRenderer"); return; }

    sprite.position.set(
      element.pos.x * this.option.tileSize,
      element.pos.y * this.option.tileSize
    );
  }

  // update(container: Container, entities: Map<string, Entity>) {
  //   this.sprites.forEach((sprite, id) => {

  //   });
  // }

  render(container: Container) {
    this.sprites.forEach(sprite => container.addChild(sprite));
  }
}
