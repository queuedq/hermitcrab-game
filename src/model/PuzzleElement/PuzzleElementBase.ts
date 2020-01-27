import { Point } from "../../core/Point";
import { RigidBody } from "../RigidBody";

export enum PuzzleElementType {
  Environment,
  Player,
  Shell,
}

export type PuzzleElementBase = Readonly<{
  type: PuzzleElementType;
  id: string;
  pos: Point;
  updatePos(pos: Point): PuzzleElementBase;
  getBody(): RigidBody;
}>;
