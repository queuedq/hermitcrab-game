import { Cell } from "./Cell";
import { Entity } from "../Entity";
import { Point } from "../../core/Point";
import { map2d } from "../../core/helpers";
import { Environment } from "../Environment";

export class CellMap {
  constructor(
    public layout: Cell[][],
  ) { }

  static create(environment: Environment, entities: ReadonlyMap<string, Entity>) {
    const layout = map2d(environment.layout, tile => new Cell(tile));
    const cellMap = new CellMap(layout);

    entities.forEach(entity => {
      entity.getBlocks().forEach(pos => {
        cellMap.at(pos).entity = entity;
      })
    })

    return cellMap;
  }

  at(pos: Point) {
    if (pos.y < 0 || pos.y >= this.layout.length) { return Cell.oobCell(); }
    if (pos.x < 0 || pos.x >= this.layout[0].length) { return Cell.oobCell(); }
    return this.layout[pos.y][pos.x];
  }
}
