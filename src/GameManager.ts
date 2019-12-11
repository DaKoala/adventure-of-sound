import Obstacle from './Obstacle';
import soundBox from './SoundBox';
import colorTheme from './ColorTheme';
import { trackWidth, trackHeight } from './constants';

const SPEED_LIMIT = 9;
const scoreEle = document.getElementById('score');
const stageEle = document.getElementById('stage');
const targetEle = document.getElementById('target');
const obstacleEle = document.getElementById('obstacle');

const targetScores: Record<number, number> = {
  0: 50,
  1: 110,
  2: 180,
  3: 260,
  4: 350,
  5: 450,
  6: 560,
  7: 680,
  8: 810,
  9: 950,
  10: 1100,
}

class GameManager {
  box = soundBox;
  score = 0;
  speed = 0;
  targetScore = targetScores[this.speed];
  timeCounter = 0;
  obstacleCounter = 0;
  obstacles: Obstacle[] = [];
  failCallback: () => void = () => {};

  constructor() {
    this.writeScore();
    this.writeStage();
    this.writeTargetScore();
    this.writeObstacle();
  }

  registerFailCallback(cb: () => void) {
    this.failCallback = cb;
  }

  writeScore() {
    scoreEle.textContent = String(this.score);
  }

  writeStage() {
    stageEle.textContent = String(this.speed + 1);
  }

  writeTargetScore() {
    targetEle.textContent = String(this.targetScore);
  }

  writeObstacle() {
    obstacleEle.textContent = String(5 - this.obstacleCounter % 5);
  }

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
    if (width > holeWidth || height > holeHeight) {
      this.failCallback();
      return;
    }
    this.obstacleCounter += 1;
    const scorePercent = (width * height) / (holeWidth * holeHeight);
    this.score += Math.floor(scorePercent * 100);
    if (this.obstacleCounter % 5 === 0) {
      if (this.score < this.targetScore) {
        this.failCallback();
        return;
      }
      this.increaseSpeed();
      colorTheme.updateColorTheme();
    }
    this.writeObstacle();
    this.writeScore();
  }

  increaseSpeed() {
    if (this.speed < SPEED_LIMIT) {
      this.speed += 1;
      this.targetScore = targetScores[this.speed];
      this.writeStage();
      this.writeTargetScore();
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
    fill(255);
    this.drawObstacles();
  }

  reset() {
    this.score = 0;
    this.speed = 0;
    this.targetScore = targetScores[this.speed];
    this.timeCounter = 0;
    this.obstacleCounter = 0;
    this.obstacles = [];
    this.writeScore();
    this.writeStage();
    this.writeTargetScore();
    this.writeObstacle();
  }
}

export default new GameManager();
