import { Container } from "pixi.js";
import { PuzzleElementType } from "../puzzleElement/puzzleElementBase";
import { Shell } from "../puzzleElement/Shell";
import { Player } from "../puzzleElement/Player";
import { PuzzleElement } from "../puzzleElement/puzzleElement";
import { RendererOption } from "./RendererOption";
import { ShellRenderer } from "./ShellRenderer";
import { PlayerRenderer } from "./PlayerRenderer";

export class PuzzleElementRenderer {
  private shellRenderer: ShellRenderer;
  private playerRenderer: PlayerRenderer;

  constructor(
    readonly elements: PuzzleElement[],
    readonly option: RendererOption,
  ) {
    this.shellRenderer = new ShellRenderer(
      elements.filter(el => el.type === PuzzleElementType.Shell) as Shell[], option,
    );
    this.playerRenderer = new PlayerRenderer(
      elements.filter(el => el.type === PuzzleElementType.Player)[0] as Player, option,
    );
  }

  render(container: Container) {
    this.shellRenderer.render(container);
    this.playerRenderer.render(container);
  }

  update(elements: PuzzleElement[]) {
    const shells = elements.filter(el => el.type === PuzzleElementType.Shell) as Shell[];
    const player = elements.filter(el => el.type === PuzzleElementType.Player)[0] as Player;
    this.shellRenderer.update(shells);
    this.playerRenderer.update(player);
  }
}
