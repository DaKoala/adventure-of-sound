import Obstacle from './Obstacle';
import soundBox from './SoundBox';
import colorTheme from './ColorTheme';
import { trackWidth, trackHeight } from './constants';

const SPEED_LIMIT = 5;

class GameManager {
  box = soundBox;
  speed = 0;
  timeCounter = 0;
  obstacleCounter = 0;
  obstacles: Obstacle[] = [];

  generateObstacle() {
    const obstacle = new Obstacle(random(200, trackWidth), random(200, trackHeight));
    this.obstacles.push(obstacle);
  }

  updateObstacles() {
    const firstObstacle = this.obstacles[0];
    if (firstObstacle && firstObstacle.isExpired) {
      this.obstacles.shift();
      this.collide(firstObstacle);
    }
    for (const ob of this.obstacles) {
      ob.update(this.speed);
    }
  }

  drawObstacles() {
    for (const ob of this.obstacles) {
      ob.draw();
    }
  }

  collide(obstacle: Obstacle) {
    const { holeWidth, holeHeight } = obstacle;
    const { width, height } = this.box;
    this.obstacleCounter += 1;
    const scorePercent = (width * height) / (holeWidth * holeHeight);
    console.log(scorePercent);
    if (this.obstacleCounter >= 5) {
      this.increaseSpeed();
      colorTheme.updateColorTheme();
      this.obstacleCounter = 0;
    }
    console.log(colorTheme);
  }

  increaseSpeed() {
    if (this.speed < SPEED_LIMIT) {
      this.speed += 1;
    }
  }

  update() {
    this.timeCounter += 0.3 + this.speed * 0.06;
    if (this.timeCounter >= 100) {
      this.generateObstacle();
      this.timeCounter = 0;
    }
    this.updateObstacles();
  }

  draw() {
    this.drawObstacles();
  }
}

export default new GameManager();
