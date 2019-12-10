import p5 from 'p5';
import 'p5/lib/addons/p5.sound';
// @ts-ignore
import ml5 from 'ml5';

class Sound {
  private audioIn: p5.AudioIn;
  private pitchDetection: any;
  private modelReady = false;
  private pitchValue: null | number = null;

  private handleModelLoaded = () => {
    this.modelReady = true;
    this.updatePitch();
  }

  private updatePitch = () => {
    this.pitchDetection.getPitch((err: any, frequency: number) => {
      if (err) {
        this.pitchValue = null;
      } else {
        this.pitchValue = frequency;
      }
      this.updatePitch();
    });
  }

  private startPitchDetection = () => {
    // @ts-ignore
    this.pitchDetection = ml5.pitchDetection('./crepe', getAudioContext(), this.audioIn.stream, this.handleModelLoaded);
  }

  setup() {
    this.audioIn = new p5.AudioIn();
    this.audioIn.start(this.startPitchDetection);
  }

  getVolume() {
    return this.audioIn.getLevel();
  }

  getPitch() {
    if (!this.modelReady || !this.pitchValue) {
      return null;
    }
    return map(this.pitchValue, 0, 512, 0, 1);
  }
}

export default new Sound();
