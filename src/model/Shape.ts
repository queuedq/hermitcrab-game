import { Point } from "../core/Point";
import { Direction, oppositeDir } from "../core/Direction";

export type CellType = { type: "Fill"; } | { type: "Fence"; dir: Direction; };

export class Cell {
  // TODO: Implement more robust & customizable layer system, e.g. grouped layer
  // ==== Current layer system ====
  // layer 1: Environment, Player, Shell fences
  // layer 2: Environment, Shell ceilings
  private constructor(
    readonly layer: number,
    readonly pos: Point,
    readonly cellType: CellType,
  ) { }

  static fill(layer: number, position: Point): Cell {
    return new Cell(layer, position, { type: "Fill" });
  }

  static fence(layer: number, position: Point, dir: Direction): Cell {
    return new Cell(layer, position, { type: "Fence", dir });
  }

  add(pos: Point) {
    return new Cell(this.layer, this.pos.add(pos), this.cellType);
  }

  sweepArea(dir: Direction): Cell[] {
    switch (this.cellType.type) {
      case "Fill":
        return [
          Cell.fence(this.layer, this.pos, dir),
          Cell.fence(this.layer, this.pos.moveTo(dir), oppositeDir(dir)),
          Cell.fill(this.layer, this.pos.moveTo(dir)),
        ];

      case "Fence":
        // Only need fills currently
        switch (dir) {
          case this.cellType.dir:
            return [Cell.fill(this.layer, this.pos.moveTo(dir))];
          case oppositeDir(this.cellType.dir):
            return [Cell.fill(this.layer, this.pos)];
          default:
            return []; // Useless currently
        }

    }
  }

  hash(): string {
    switch (this.cellType.type) {
      case "Fill":
        return `Fill:${this.layer}:${this.pos.x}:${this.pos.y}`;
      case "Fence":
        return `Fence:${this.layer}:${this.pos.x}:${this.pos.y}:${this.cellType.dir}`;
    }
  }
}

export class Shape {
  private readonly cellHashes: Set<string>;

  constructor(
    readonly cells: Cell[],
  ) {
    this.cellHashes = new Set();
    this.cells.forEach(cell => {
      this.cellHashes.add(cell.hash());
    });
  }

  add(pos: Point) {
    const newCells = this.cells.map(cell => cell.add(pos));
    return new Shape(newCells);
  }

  moveTo(dir: Direction) {
    return this.add(Point.origin.moveTo(dir));
  }

  contains(cell: Cell): boolean {
    return this.cellHashes.has(cell.hash());
  }

  collides(shape: Shape): boolean {
    for (const cell of this.cells) {
      if (shape.contains(cell)) { return true; }
    }
    return false;
  }

  moveCollides(dir: Direction, shape: Shape): boolean {
    for (const cell of this.cells) {
      for (const sweep of cell.sweepArea(dir)) {
        if (shape.contains(sweep)) { return true; }
      }
    }
    return false;
  }
}
