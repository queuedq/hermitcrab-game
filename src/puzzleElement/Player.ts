import { Point, PointRep } from "../core/Point";
import { RigidBody } from "../model/RigidBody";
import { Shape, Cell } from "../model/Shape";
import { PuzzleElementType, PuzzleElementBase } from "./puzzleElementBase";

export type PlayerRep = {
  id: string;
  pos: PointRep;
};

export type PlayerState = {
  type: PuzzleElementType.Player;
  id: string;
  pos: Point;
};

export class Player extends RigidBody implements PuzzleElementBase<PlayerState> {
  readonly type: PuzzleElementType.Player = PuzzleElementType.Player;
  private static playerShape = new Shape([Cell.fill(1, Point.origin)]);

  constructor(id: string, pos: Point) {
    super(id, pos, Player.playerShape, true);
  }

  static parse(rep: PlayerRep): Player {
    return new Player(rep.id, Point.parse(rep.pos));
  }

  exportState(): PlayerState {
    return {
      type: PuzzleElementType.Player,
      id: this.id,
      pos: this.pos,
    };
  }

  importState(state: PlayerState): void {
    this.pos = state.pos;
  }
}
