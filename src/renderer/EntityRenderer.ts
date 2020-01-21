import { Container, DisplayObject, Graphics } from "pixi.js";
import { Entity } from "../state/Entity";
import { TILE_SIZE } from "../core/constants";

export class EntityRenderer {
  private sprites: Map<string, DisplayObject>;

  constructor(entities: ReadonlyMap<string, Entity>) {
    this.sprites = new Map();

    entities.forEach(entity => {
      const sprite = new Graphics();

      entity.getBlocks().forEach(pos => {
        sprite.beginFill(0xFF0000);
        sprite.drawRect(
          pos.x * TILE_SIZE, pos.y * TILE_SIZE, TILE_SIZE, TILE_SIZE,
        );
        sprite.endFill();
      })

      sprite.position.set(entity.position.x * TILE_SIZE, entity.position.y * TILE_SIZE);
      this.sprites.set(entity.id, sprite);
    })
  }

  private updateEntity(entity: Entity) {
    const sprite = this.sprites.get(entity.id);
    if (sprite === undefined) { console.error("Error: EntityRenderer"); return; }

    sprite.position.set(entity.position.x * TILE_SIZE, entity.position.y * TILE_SIZE);
  }

  // update(container: Container, entities: Map<string, Entity>) {
  //   this.sprites.forEach((sprite, id) => {

  //   });
  // }

  render(container: Container) {
    this.sprites.forEach(sprite => container.addChild(sprite));
  }
}
