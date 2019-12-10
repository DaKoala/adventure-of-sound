export const tempTranslate = (func: () => void, x: number, y: number, z?: number) {
  translate(x, y, z);
  func();
  translate(-x, -y, -z);
}
