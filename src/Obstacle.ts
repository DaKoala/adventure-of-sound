import { startPoint, trackLength, trackWidth, trackHeight } from './constants';
import { tempTranslate } from './utils'
import gameManager from './GameManager';
import colorTheme from './ColorTheme';

const columnDepth = 1;

export default class Obstacle {
  holeWidth: number;
  holeHeight: number;
  distance: number;

  constructor(holeWidth: number, holeHeight: number) {
    this.holeWidth = holeWidth;
    this.holeHeight = holeHeight;
    this.distance = trackLength / 3;
  }

  get isExpired() {
    return this.distance <= -startPoint;
  }

  draw() {
    const { holeHeight, holeWidth, distance } = this;
    const columnWidth = (trackWidth - holeWidth) / 2;
    const columnHeight = trackHeight;
    const beamHeight = columnHeight - holeHeight;
    const leftColumnCenter = -trackWidth / 2 + columnWidth / 2;
    const rightColumnCenter = trackWidth / 2 - columnWidth / 2;
    tempTranslate(() => {
      // left column
      noStroke();
      fill(colorTheme.getColor().obstacleColor);
      tempTranslate(
        () => {
          box(columnWidth, columnDepth, columnHeight);
        },
        leftColumnCenter,
        0,
        columnHeight / 2
      );
      // right column
      tempTranslate(
        () => {
          box(columnWidth, columnDepth, columnHeight);
        },
        rightColumnCenter,
        0,
        columnHeight / 2
      );
      // beam
      tempTranslate(
        () => {
          box(trackWidth, columnDepth, beamHeight);
        },
        0,
        0,
        holeHeight + beamHeight / 2
      );
    }, 0, -distance, 0);
  }

  update(speed: number) {
    this.distance -= 10 + speed * 2;
  }
}
