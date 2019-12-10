import { startPoint } from './constants';
import { tempTranslate } from './utils';

class SoundBox {
  width = 100;
  height = 100;
  private length = 100;

  draw() {
    strokeWeight(5);
    stroke(0);
    fill(255, 0, 0);
    tempTranslate(() => {
      box(this.width, this.length, this.height);
    }, 0, startPoint, this.height / 2)
  }
}

export default new SoundBox();
