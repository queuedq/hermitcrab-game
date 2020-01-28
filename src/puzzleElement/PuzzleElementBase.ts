export enum PuzzleElementType {
  Environment,
  Player,
  Shell,
}

export type PuzzleElementBase<T> = Readonly<{
  type: PuzzleElementType;
  exportState(): T;
  importState(state: T): void;
}>;
