import { Container, DisplayObject, Graphics } from "pixi.js";
import { RendererOption } from "./RendererOption";
import { Cell } from "../core/Shape";
import { setSpritePos } from "./renderHelper";
import { Direction } from "../core/Direction";
import { Shell } from "../puzzleElement/Shell";

export class ShellRenderer {
  private sprites = new Map<string, DisplayObject>();

  constructor(
    readonly shells: Shell[],
    readonly option: RendererOption,
  ) {
    this.sprites = new Map();
    shells.forEach(this.addShell);
  }

  private addShell = (shell: Shell): void => {
    this.sprites.set(shell.id, this.getShellSprite(shell));
  }

  private getShellSprite(shell: Shell): DisplayObject {
    const sprite = new Graphics();

    shell.collider.cells.forEach(cell => {
      switch(cell.cellType.type) {
        case "Fill": {
          sprite.beginFill(0x007F00);
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
          sprite.beginFill(0x00FF00);
          this.drawFence(sprite, cell);
          sprite.endFill();
          break;
      }
    })

    setSpritePos(sprite, shell.pos, this.option.tileSize);
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

  private updateShell = (shell: Shell) => {
    const sprite = this.sprites.get(shell.id);
    if (sprite === undefined) { console.error("Error: EntityRenderer"); return; }

    sprite.position.set(
      shell.pos.x * this.option.tileSize,
      shell.pos.y * this.option.tileSize
    );
  }

  update(shells: Shell[]) {
    shells.forEach(this.updateShell);
  }

  render(container: Container) {
    this.sprites.forEach(sprite => container.addChild(sprite));
  }
}
