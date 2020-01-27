import { Point } from "../core/Point";
import { Direction } from "../core/Direction";
import { Shape } from "./Shape";

export class RigidBody {
  constructor(
    readonly id: string,
    readonly pos: Point,
    readonly collider: Shape,
    readonly pushable: boolean,
  ) { }

  displacedCollider() {
    return this.collider.add(this.pos);
  }

  moveCollides(dir: Direction, body: RigidBody) {
    return this.displacedCollider().moveCollides(
      dir,
      body.displacedCollider(),
    );
  }

  moveTo(dir: Direction) {
    return new RigidBody(
      this.id,
      this.pos.moveTo(dir),
      this.collider,
      this.pushable,
    );
  }
}
