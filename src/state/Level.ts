import { Direction } from "../core/constants";
import { Entity } from "./Entity";
import { CellMap } from "./internal/CellMap";
import { Point } from "../core/Point";
import { Shell } from "./Shell";
import { Environment } from "./Environment";

export type LevelStateUpdate = {
  updated: true;
  newState: Level;
} | {
  updated: false;
}

export interface LevelRep {
  layout: string[];
  player: Point;
}

export class Level {
  constructor(
    readonly environment: Environment,
    readonly entities: ReadonlyMap<string, Entity>,
  ) { }

  getEntity(id: string) {
    return this.entities.get(id) as Entity; // TODO: Write safer code
  }

  moveEntity(entity: Entity, direction: Direction): LevelStateUpdate {
    const toMove = new Set<string>();
    const cellMap = CellMap.create(this.environment, this.entities);

    const movable = this.dfsMoveEntity(entity, direction, cellMap, toMove);

    if (!movable) {
      return { updated: false };
    }

    const newEntities = new Map(this.entities);
    toMove.forEach(id => {
      const entity = this.getEntity(id);
      newEntities.set(id, entity.move(direction));
    });

    return {
      updated: true,
      newState: new Level(this.environment, newEntities),
    };
  }

  private dfsMoveEntity(
    entity: Entity,
    direction: Direction,
    cellMap: CellMap,
    toMove: Set<string>,
  ): boolean {
    for (const block of entity.getBlocks()) {
      const nextCell = cellMap.at(block.moveTo(direction));
      if (nextCell.isBlocked()) { return false; }

      const nextEntity = nextCell.entity;
      if (nextEntity === undefined) { continue; }
      if (toMove.has(nextEntity.id)) { continue; }

      toMove.add(nextEntity.id);
      const movable = this.dfsMoveEntity(nextEntity, direction, cellMap, toMove);
      if (!movable) { return false; }
    }

    return true;
  }

  static parse(rep: LevelRep) {
    const layout = rep.layout.map(s => s.split(''));

    // Environment
    const environment = Environment.parse(layout);

    // Entities
    const entityBlocks = new Map<string, Point[]>();
    for (let y = 0; y < layout.length; y++) {
      for (let x = 0; x < layout[0].length; x++) {
        const id = layout[y][x];
        if (id === "#" || id === ".") { continue; }

        const blocks = entityBlocks.get(id);
        if (blocks === undefined) {
          entityBlocks.set(id, [new Point(x, y)]);
        } else {
          blocks.push(new Point(x, y));
        }
      }
    }

    const entities = new Map<string, Entity>();

    entityBlocks.forEach((blocks, id) => {
      entities.set(id, new Shell(id, Point.origin, blocks));
    });

    return new Level(environment, entities);
  }
}
