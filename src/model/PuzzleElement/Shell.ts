import { Point, PointRep } from "../../core/Point";
import { Direction } from "../../core/Direction";
import { generateId, toCharMap } from "../../core/helpers";
import { Cell, Shape } from "../Shape";
import { RigidBody } from "../RigidBody";
import { PuzzleElementType, PuzzleElementBase } from "./PuzzleElementBase";

export interface ShellRep {
  shape: string[];
  pos: PointRep;
}

export class Shell implements PuzzleElementBase {
  readonly type = PuzzleElementType.Shell;

  private constructor(
    readonly id: string,
    readonly pos: Point,
    private readonly shape: Shape,
  ) { }

  static create(pos: Point, shape: Shape): Shell {
    return new Shell(generateId(), pos, shape);
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

    console.log(shapeArr);
    console.log(cells);

    return Shell.create(Point.parse(rep.pos), new Shape(cells));
  }

  updatePos(pos: Point) {
    return new Shell(this.id, pos, this.shape);
  }

  getBody() {
    return new RigidBody(this.id, this.pos, this.shape, true);
  }
}
