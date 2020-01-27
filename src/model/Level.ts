import { Point } from "../core/Point";
import { Direction } from "../core/Direction";
import { BodySystem } from "./BodySystem";
import { PuzzleElementType } from "./PuzzleElement/PuzzleElementBase";
import { Environment, EnvironmentRep } from "./PuzzleElement/Environment";
import { Player, PlayerRep } from "./PuzzleElement/Player";
import { Shell, ShellRep } from "./PuzzleElement/Shell";
import { PuzzleElement } from "./PuzzleElement/PuzzleElement";

export interface LevelRep {
  env: EnvironmentRep;
  player: PlayerRep;
  shells: ShellRep[];
}

export class Level {
  private world: BodySystem;
  private elementMap: Map<string, PuzzleElement>;

  constructor(
    readonly env: Environment,
    readonly elements: PuzzleElement[],
  ) {
    this.world = this.createWorld();
    this.elementMap = new Map();
    elements.map(el => {
      this.elementMap.set(el.id, el);
    });
  }

  private createWorld(): BodySystem {
    return BodySystem.fromBodies([
      this.env.getBody(),
      ...this.elements.map(el => el.getBody()),
    ]);
  }

  private getCurrentPlayer(): Player {
    return this.elements.filter(el => el.type === PuzzleElementType.Player)[0] as Player;
  }

  updateElementsPos(updates: Map<string, Point>): Level {
    const newElementMap = new Map(this.elementMap);
    updates.forEach((pos, id) => {
      const el = newElementMap.get(id) as PuzzleElement;
      newElementMap.set(id, el.updatePos(pos));
    })

    const newElements = [...newElementMap.values()];

    return new Level(this.env, newElements);
  }

  pushElement(element: PuzzleElement, dir: Direction): Level {
    const update = this.world.pushBody(element.getBody(), dir);
    console.log("Update:", update);
    if (update.type === "Idle") { return this; }

    const posUpdates = new Map<string, Point>();
    update.bodies.forEach(body => posUpdates.set(body.id, body.pos));

    return this.updateElementsPos(posUpdates);
  }

  movePlayer(dir: Direction): Level {
    return this.pushElement(this.getCurrentPlayer(), dir);
  }

  static parse(rep: LevelRep) {
    const env = Environment.parse(rep.env);
    const player = Player.parse(rep.player);
    const shells = rep.shells.map(Shell.parse);

    return new Level(env, [player, ...shells]);
  }
}
