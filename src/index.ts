import p5 from 'p5';
import 'ml5';
import sound from './Sound';
import soundBox from './SoundBox';
import track from './Track';
import gameManager from './GameManager';

enum State {
  Start,
  Game,
  End,
}

let state = State.Start;
let robotoFont: p5.Font;

function preload() {
  robotoFont = loadFont('assets/Roboto-Regular.ttf');
}

function setup() {
  createCanvas(800, 600, WEBGL);
  smooth();
  textFont(robotoFont);
  textAlign(CENTER, CENTER);
  sound.setup();
  gameManager.registerFailCallback(() => {
    state = State.End;
    camera(0, 0, (height / 2) / tan(PI * 30 / 180), 0, 0, 0, 0, 1, 0);
  });
}

function draw() {
  background(0);
  const volume = sound.getVolume();
  const pitch = sound.getPitch();
  if (state === State.Start) {
    strokeWeight(1);
    fill(225, 188, 41);
    textSize(48);
    text('Adventure', -115, -200);
    fill(225, 85, 84);
    text('of', 30, -200);
    fill(77, 157, 224);
    text('Sound', 135, -200);
    textSize(20);
    fill(255);
    text('Use sound to control the size of the box. Try your best to fit obstacles.', 0, -100);
    fill(59, 178, 115);
    text('Volume test', -260, -30);
    text('Pitch test', -270, 30);
    noFill();
    stroke(59, 178, 115);
    rect(-180, -38, 500, 20);
    rect(-180, 22, 500, 20);
    noStroke();
    fill(59, 178, 115);
    rect(-180, -38, 500 * volume, 20);
    rect(-180, 22, 500 * pitch, 20);
    textSize(32);
    fill(255);
    text('Press space to start', 0, 200);
  } else if (state === State.Game) {
    camera(0, height * 2, height, 0, 0, 0, 0, 1, 0);
    soundBox.setSize(volume, pitch);
    track.draw();
    soundBox.draw();
    gameManager.update();
    gameManager.draw();
  } else {
    fill(225, 85, 84);
    textSize(64);
    text('GAME OVER!', 0, 0);
    fill(255);
    textSize(32);
    text('Press space to restart', 0, 200);
  }
}

function keyReleased() {
  if (keyCode === 32) {
    if (state === State.Start) {
      state = State.Game;
    } else if (state === State.End) {
      gameManager.reset();
      state = State.Start;
    }
  }
}

// p5.js requires `setup` and `draw` to be methods of global object
window.preload = preload;
window.setup = setup;
window.draw = draw;
window.keyReleased = keyReleased;
