import Obstacle from './Obstacle';
import { trackWidth, trackHeight } from './constants';

const SPEED_LIMIT = 5;

class GameManager {
  speed = 0;
  obstacles: Obstacle[] = [];

  generateObstacle() {
    const obstacle = new Obstacle(random(200, trackWidth), random(200, trackHeight));
    this.obstacles.push(obstacle);
  }

  updateObstacles() {
    const firstObstacle = this.obstacles[0];
    if (firstObstacle && firstObstacle.isExpired) {
      this.obstacles.shift();
    }
    for (const ob of this.obstacles) {
      ob.update();
    }
  }

  drawObstacles() {
    for (const ob of this.obstacles) {
      ob.draw();
    }
  }

  increaseSpeed() {
    if (this.speed < SPEED_LIMIT) {
      this.speed += 1;
    }
  }
}

export default new GameManager();
