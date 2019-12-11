import p5 from 'p5';
import 'ml5';
import sound from './Sound';
import soundBox from './SoundBox';
import track from './Track';
import Obstacle from './Obstacle';
import gameManager from './GameManager';

const obs = new Obstacle(400, 400);

function setup() {
  createCanvas(800, 600, WEBGL);
  smooth();
  sound.setup();
}

function draw() {
  background(0);
  camera(0, height * 2, height, 0, 0, 0, 0, 1, 0);
  const volume = sound.getVolume();
  const pitch = sound.getPitch();
  soundBox.setSize(volume, pitch);
  track.draw();
  soundBox.draw();
  gameManager.update();
  gameManager.draw();
}

// p5.js requires `setup` and `draw` to be methods of global object
window.setup = setup;
window.draw = draw;
