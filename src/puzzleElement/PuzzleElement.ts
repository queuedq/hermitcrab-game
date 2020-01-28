import { Environment, EnvironmentState } from "./Environment";
import { Player, PlayerState } from "./Player";
import { Shell, ShellState } from "./Shell";

export type PuzzleElement = Environment | Player | Shell;
export type PuzzleElementState = EnvironmentState | PlayerState | ShellState;
