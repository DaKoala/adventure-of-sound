import p5 from 'p5';
import 'ml5';
import sound from './sound';

function setup() {
  createCanvas(800, 600);
  sound.setup();
}

async function draw() {
  background(0);
  console.log('volume', sound.getVolume());
  console.log('pitch', sound.getPitch());
}

// p5.js requires `setup` and `draw` to be methods of global object
window.setup = setup;
window.draw = draw;
