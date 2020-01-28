import { Direction } from "../core/Direction";
import { BodySystem } from "../physics/BodySystem";
import { PuzzleElementType } from "../puzzleElement/puzzleElementBase";
import { Environment, EnvironmentRep, EnvironmentState } from "../puzzleElement/Environment";
import { Player, PlayerRep } from "../puzzleElement/Player";
import { Shell, ShellRep } from "../puzzleElement/Shell";
import { PuzzleElement, PuzzleElementState } from "../puzzleElement/puzzleElement";

export interface LevelRep {
  env: EnvironmentRep;
  player: PlayerRep;
  shells: ShellRep[];
}

export type LevelState = {
  env: EnvironmentState;
  elements: PuzzleElementState[];
}

export class Level {
  private world: BodySystem;
  elements: Map<string, PuzzleElement>;

  constructor(
    readonly env: Environment,
    elements: PuzzleElement[],
  ) {
    this.elements = new Map(elements.map(el => [el.id, el]));
    this.world = this.createWorld();
  }

  private createWorld(): BodySystem {
    return BodySystem.fromBodies([ this.env, ...this.elements.values() ]);
  }

  getElementList(): PuzzleElement[] {
    return [...this.elements.values()];
  }

  private getCurrentPlayer(): Player {
    return this.getElementList().filter(el => (
      el.type === PuzzleElementType.Player
    ))[0] as Player; // TODO: Write safer code
  }

  private pushElement(element: PuzzleElement, dir: Direction) {
    this.world.pushBody(element, dir);
  }

  movePlayer(dir: Direction) {
    return this.pushElement(this.getCurrentPlayer(), dir);
  }

  static parse(rep: LevelRep) {
    const env = Environment.parse(rep.env);
    const player = Player.parse(rep.player);
    const shells = rep.shells.map(Shell.parse);

    return new Level(env, [player, ...shells]);
  }

  exportState(): LevelState {
    return {
      env: this.env.exportState(),
      elements: this.getElementList().map(el => el.exportState()),
    };
  }

  importState(state: LevelState) {
    state.elements.map(el => {
      switch (el.type) {
        case PuzzleElementType.Environment:
          break;

        case PuzzleElementType.Player:
          (this.elements.get(el.id) as Player).importState(el);
          break;

        case PuzzleElementType.Shell:
          (this.elements.get(el.id) as Shell).importState(el);
          break;
      }
    });
  }
}
