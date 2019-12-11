import { startPoint, trackWidth, trackHeight } from './constants';
import { tempTranslate } from './utils';
import colorTheme from './ColorTheme';

class SoundBox {
  width = 100;
  height = 100;
  private length = 100;

  setSize(widthIndex: number, heightIndex: number) {
    const expectedWidth = trackWidth * widthIndex;
    const expectedHeight = trackHeight * heightIndex;
    const nextWidth = lerp(this.width, expectedWidth, 0.5);
    const nextHeight = lerp(this.width, expectedHeight, 0.5);
    this.width = nextWidth > 100 ? nextWidth : 100;
    this.height = nextHeight > 100 ? nextHeight : 100;
  }

  draw() {
    strokeWeight(5);
    stroke(0);
    fill(colorTheme.getColor().boxColor);
    tempTranslate(() => {
      box(this.width, this.length, this.height);
    }, 0, startPoint, this.height / 2)
  }
}

export default new SoundBox();
