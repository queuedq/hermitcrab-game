import uuidv4 from "uuid/v4";

export function map2d<T, U>(arr: T[][], callback: (val: T, x: number, y: number) => U): U[][] {
  return arr.map((row, y) => (
    row.map((val, x) => callback(val, x, y))
  ));
}

export function toCharMap(strArr: string[]): string[][] {
  return strArr.map(s => s.split(''));
}

export function generateId(): string {
  return uuidv4();
}
