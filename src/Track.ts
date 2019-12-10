import { trackWidth } from './constants';

class Track {
  width: number;

  constructor(width: number) {
    this.width = width;
  }

  draw() {
    fill(0, 255, 0);
    noStroke();
    plane(this.width, 10000);
  }
}

export default new Track(trackWidth);
