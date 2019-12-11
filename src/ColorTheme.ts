interface Theme {
  trackColor: [number, number, number];
  boxColor: [number, number, number];
  obstacleColor: [number, number, number];
}

class ColorTheme {
  private colorThemeList: Theme[] = [
    {
      trackColor: [41, 115, 115],
      boxColor: [233, 215, 88],
      obstacleColor: [255, 133, 82],
    },
    {
      trackColor: [102, 106, 134],
      boxColor: [237, 175, 184],
      obstacleColor: [232, 221, 181],
    },
    {
      trackColor: [225, 188, 41],
      boxColor: [225, 85, 84],
      obstacleColor: [77, 157, 224],
    }
  ];
  private colorThemeIndex = 0;
  private colorTheme = this.colorThemeList[this.colorThemeIndex];

  getColor() {
    return this.colorTheme;
  }

  updateColorTheme() {
    this.colorThemeIndex = (this.colorThemeIndex + 1) % this.colorThemeList.length;
    this.colorTheme = this.colorThemeList[this.colorThemeIndex];
  }
}

export default new ColorTheme();
