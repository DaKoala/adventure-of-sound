import p5 from 'p5';
import 'ml5';
import sound from './Sound';
import soundBox from './SoundBox';
import track from './Track';
import gameManager from './GameManager';

declare function loadSound(path: string): p5.SoundFile;

enum State {
  Start,
  Game,
  End,
}

let state = State.Start;
let robotoFont: p5.Font;
let confirmSound: p5.SoundFile;
let successSound: p5.SoundFile;
let failSound: p5.SoundFile;

function preload() {
  robotoFont = loadFont('assets/Roboto-Regular.ttf');
  confirmSound = loadSound('assets/confirm.wav');
  successSound = loadSound('assets/success.wav');
  failSound = loadSound('assets/fail.wav');
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
    failSound.play();
  });
  gameManager.registerSuccessSound(successSound);
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
    text('Volume relates to width; box relates to height. Just like the rectangle here.', 0, -30);
    rectMode(CENTER);
    const testWidth = max(100 * volume, 25);
    const testHeight = max(100 * pitch, 25);
    rect(0, 100, testWidth, testHeight);
    textSize(32);
    fill(255);
    text('When you are ready, press space to start', 0, 200);
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
      confirmSound.play();
    } else if (state === State.End) {
      gameManager.reset();
      state = State.Start;
      confirmSound.play();
    }
  }
}

// p5.js requires `setup` and `draw` to be methods of global object
window.preload = preload;
window.setup = setup;
window.draw = draw;
window.keyReleased = keyReleased;
