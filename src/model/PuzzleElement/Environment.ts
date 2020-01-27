import { Tile } from "../Tile";
import { map2d, toCharMap, generateId } from "../../core/helpers";
import { Point } from "../../core/Point";
import { RigidBody } from "../RigidBody";
import { Shape, Cell } from "../Shape";
import { PuzzleElementType, PuzzleElementBase } from "./PuzzleElementBase";

export type EnvironmentRep = string[];

export class Environment implements PuzzleElementBase {
  readonly type = PuzzleElementType.Environment;
  readonly pos = Point.origin;
  private bodyCache: RigidBody | undefined;

  private constructor(
    readonly id: string,
    readonly layout: Tile[][]
  ) { }

  static create(layout: Tile[][]) {
    return new Environment(generateId(), layout);
  }

  at(pos: Point) {
    return this.layout[pos.y][pos.x];
  }

  get width() {
    return this.layout[0].length;
  }

  get height() {
    return this.layout.length;
  }

  getBody() {
    if (this.bodyCache !== undefined) { return this.bodyCache; }

    const cells: Cell[] = [];

    // Walls
    map2d(this.layout, (tile, x, y) => {
      if (tile === Tile.Wall) {
        cells.push(Cell.fill(1, new Point(x, y)));
        cells.push(Cell.fill(2, new Point(x, y)));
      }
    });

    // Boundaries
    for (let y = 0; y < this.layout.length; y++) {
      cells.push(Cell.fill(1, new Point(-1, y)));
      cells.push(Cell.fill(2, new Point(-1, y)));
      cells.push(Cell.fill(1, new Point(this.width, y)));
      cells.push(Cell.fill(2, new Point(this.width, y)));
    }
    for (let x = 0; x < this.layout.length; x++) {
      cells.push(Cell.fill(1, new Point(x, -1)));
      cells.push(Cell.fill(2, new Point(x, -1)));
      cells.push(Cell.fill(1, new Point(x, this.height)));
      cells.push(Cell.fill(2, new Point(x, this.height)));
    }

    return this.bodyCache = new RigidBody(this.id, Point.origin, new Shape(cells), false);
  }

  updatePos(pos: Point) { return this; }

  static parse(rep: EnvironmentRep): Environment {
    const mapTile = (cell: string): Tile => {
      switch (cell) {
        case "#":
          return Tile.Wall;
        case ".":
          return Tile.Floor;
        default:
          return Tile.Floor;
      }
    }

    return Environment.create(map2d(toCharMap(rep), mapTile));
  }
}
