import p5 from 'p5';
import 'ml5';
import sound from './Sound';
import soundBox from './SoundBox';

function setup() {
  createCanvas(800, 600, WEBGL);
  smooth();
  sound.setup();
}

async function draw() {
  background(0);
  camera(0, height * 2, height, 0, 0, 0, 0, 1, 0);
  const volume = sound.getVolume();
  const pitch = sound.getPitch();
  soundBox.draw();
  fill(0, 255, 0);
  noStroke();
  plane(500, 2000);
}

// p5.js requires `setup` and `draw` to be methods of global object
window.setup = setup;
window.draw = draw;
