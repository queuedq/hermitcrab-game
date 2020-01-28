import { map2d, toCharMap } from "../core/helpers";
import { Point } from "../core/Point";
import { RigidBody } from "../model/RigidBody";
import { Shape, Cell } from "../model/Shape";
import { PuzzleElementType, PuzzleElementBase } from "./puzzleElementBase";

export enum Tile {
  Floor = "Floor",
  Wall = "Wall",
}

export type EnvironmentRep = string[];
export type EnvironmentState = Tile[][];

export class Environment extends RigidBody implements PuzzleElementBase<EnvironmentState> {
  readonly type: PuzzleElementType.Environment = PuzzleElementType.Environment;

  private constructor(
    readonly layout: Tile[][],
  ) {
    super("env", Point.origin, Environment.getCollider(layout), false);
  }

  private static getCollider(layout: Tile[][]) {
    const cells: Cell[] = [];

    // Walls
    map2d(layout, (tile, x, y) => {
      if (tile === Tile.Wall) {
        cells.push(Cell.fill(1, new Point(x, y)));
        cells.push(Cell.fill(2, new Point(x, y)));
      }
    });

    // Boundaries
    const height = layout.length;
    const width = layout[0].length;

    for (let y = 0; y < height; y++) {
      cells.push(Cell.fill(1, new Point(-1, y)));
      cells.push(Cell.fill(2, new Point(-1, y)));
      cells.push(Cell.fill(1, new Point(width, y)));
      cells.push(Cell.fill(2, new Point(width, y)));
    }
    for (let x = 0; x < width; x++) {
      cells.push(Cell.fill(1, new Point(x, -1)));
      cells.push(Cell.fill(2, new Point(x, -1)));
      cells.push(Cell.fill(1, new Point(x, height)));
      cells.push(Cell.fill(2, new Point(x, height)));
    }

    return new Shape(cells);
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

    return new Environment(map2d(toCharMap(rep), mapTile));
  }

  exportState(): EnvironmentState {
    return this.layout;
  }

  importState(state: EnvironmentState) {
    // Do nothing
  }
}
