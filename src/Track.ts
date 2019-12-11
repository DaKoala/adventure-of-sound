import { trackWidth } from './constants';
import colorTheme from './ColorTheme';

class Track {
  width: number;

  constructor(width: number) {
    this.width = width;
  }

  draw() {
    fill(colorTheme.getColor().trackColor);
    noStroke();
    plane(this.width, 10000);
  }
}

export default new Track(trackWidth);
