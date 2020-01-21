export function map2d<T, U>(arr: T[][], callback: (val: T, x: number, y: number) => U): U[][] {
  return arr.map((row, y) => (
    row.map((val, x) => callback(val, x, y))
  ));
}
