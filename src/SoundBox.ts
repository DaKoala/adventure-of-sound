class SoundBox {
  width = 100;
  height = 100;
  length = 100;

  draw() {
    fill(255, 0, 0);
    translate(0, 0, this.height / 2);
    box(this.width, this.length, this.height);
    translate(0, 0, -this.height / 2);
  }
}

export default new SoundBox();
