import { Point } from "../core/Point";
import { Direction } from "../core/Direction";
import { Shape } from "./Shape";

export class RigidBody {
  constructor(
    readonly id: string,
    public pos: Point,
    readonly collider: Shape,
    public pushable: boolean,
  ) { }

  private displacedCollider(): Shape {
    return this.collider.add(this.pos);
  }

  moveCollides(dir: Direction, body: RigidBody): boolean {
    return this.displacedCollider().moveCollides(
      dir,
      body.displacedCollider(),
    );
  }

  moveTo(dir: Direction): void {
    this.pos = this.pos.moveTo(dir);
  }
}
