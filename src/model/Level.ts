import { Direction } from "../core/Direction";
import { Point } from "../core/Point";
import { RigidBody } from "./RigidBody";
import { Environment, EnvironmentRep } from "./PuzzleElement/Environment";
import { Player, PlayerRep } from "./PuzzleElement/Player";
import { Shell, ShellRep } from "./PuzzleElement/Shell";

export interface LevelRep {
  env: EnvironmentRep;
  player: PlayerRep;
  shells: ShellRep[];
}

export class Level {
  constructor(
    readonly env: Environment,
    readonly player: Player,
    readonly shells: Shell[],
  ) { }

  static parse(rep: LevelRep) {
    const env = Environment.parse(rep.env);
    const player = Player.parse(rep.player);
    const shells = rep.shells.map(Shell.parse);

    return new Level(env, player, shells);
  }
}
