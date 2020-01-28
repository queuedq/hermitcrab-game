import { Direction } from "../core/Direction";
import { RigidBody } from "./RigidBody";

export type BodySystemUpdate = {
  type: "Updated";
} | {
  type: "Idle";
}

export class BodySystem {
  constructor(private readonly bodies: Map<string, RigidBody>) { }

  static fromBodies(bodies: RigidBody[]) {
    const bodyMap = new Map();
    bodies.forEach(body => bodyMap.set(body.id, body));
    return new BodySystem(bodyMap);
  }

  private getBody(id: string) {
    return this.bodies.get(id) as RigidBody; // TODO: Write safer code
  }

  pushBody(
    body: RigidBody,
    dir: Direction,
  ): BodySystemUpdate {
    const toMove = new Set<string>([body.id]);

    const movable = this.dfsPushBody(body, dir, toMove);
    if (!movable) { return { type: "Idle" }; }

    toMove.forEach(id => {
      const body = this.getBody(id);
      body.moveTo(dir);
    });
    return { type: "Updated" };
  }

  private dfsPushBody(
    body: RigidBody,
    dir: Direction,
    toMove: Set<string>,
  ): boolean {
    if (!body.pushable) { return false; }

    for (const entry of this.bodies) {
      const [id, nextBody] = entry;

      if (toMove.has(id)) { continue; }
      if (!body.moveCollides(dir, nextBody)) { continue; }

      toMove.add(id);
      const movable = this.dfsPushBody(nextBody, dir, toMove);
      if (!movable) { return false; }
    }

    return true;
  }
}
