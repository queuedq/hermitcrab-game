import { Point, PointRep } from "../core/Point";
import { Direction } from "../core/Direction";
import { toCharMap } from "../core/helpers";
import { Cell, Shape } from "../model/Shape";
import { RigidBody } from "../model/RigidBody";
import { PuzzleElementType, PuzzleElementBase } from "./puzzleElementBase";

export interface ShellRep {
  id: string;
  pos: PointRep;
  shape: string[];
}

export type ShellState = {
  type: PuzzleElementType.Shell;
  id: string;
  pos: Point;
  shape: Shape;
}

export class Shell extends RigidBody implements PuzzleElementBase<ShellState> {
  readonly type: PuzzleElementType.Shell = PuzzleElementType.Shell;

  constructor(id: string, pos: Point, shape: Shape) {
    super(id, pos, shape, true);
  }

  static parse(rep: ShellRep): Shell {
    const shapeArr = toCharMap(rep.shape);
    const cells: Cell[] = [];

    for (let y = 0; y < shapeArr.length; y++) {
      for (let x = 0; x < shapeArr[0].length; x++) {
        const bits = parseInt(shapeArr[y][x], 16);
        if (isNaN(bits)) { continue; }

        cells.push(Cell.fill(2, new Point(x, y)));
        if (bits & 8) { cells.push(Cell.fence(1, new Point(x, y), Direction.Up)); }
        if (bits & 4) { cells.push(Cell.fence(1, new Point(x, y), Direction.Right)); }
        if (bits & 2) { cells.push(Cell.fence(1, new Point(x, y), Direction.Down)); }
        if (bits & 1) { cells.push(Cell.fence(1, new Point(x, y), Direction.Left)); }
      }
    }

    return new Shell(rep.id, Point.parse(rep.pos), new Shape(cells));
  }

  exportState(): ShellState {
    return {
      type: PuzzleElementType.Shell,
      id: this.id,
      pos: this.pos,
      shape: this.collider,
    };
  }

  importState(state: ShellState) {
    this.pos = state.pos;
  }
}
