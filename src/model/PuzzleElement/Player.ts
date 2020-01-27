import { Point, PointRep } from "../../core/Point";
import { generateId } from "../../core/helpers";
import { RigidBody } from "../RigidBody";
import { Shape, Cell } from "../Shape";
import { PuzzleElementType, PuzzleElementBase } from "./PuzzleElementBase";

export type PlayerRep = PointRep;

export class Player implements PuzzleElementBase {
  readonly type = PuzzleElementType.Player;
  private readonly shape = new Shape([Cell.fill(1, Point.origin)]);

  private constructor(
    readonly id: string,
    readonly pos: Point,
  ) { }

  static create(pos: Point): Player {
    return new Player(generateId(), pos);
  }

  static parse(pos: PlayerRep): Player {
    return Player.create(Point.parse(pos));
  }

  updatePos(pos: Point) {
    return new Player(this.id, pos);
  }

  getBody() {
    return new RigidBody(this.id, this.pos, this.shape, true);
  }
}
