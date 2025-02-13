export default class ColorManager {
  private readonly colors: Record<string, string>;

  constructor() {
    this.colors = {
      color1: '#1DB954',
      color2: '#145A32',
      color3: '#0B3D02',
      color4: '#064F26',
      color5: '#121212',
      white: '#E0E0E0',
      black: '#111111',
      blackGreen: '#1A3322',
    };
  }

  getColor(key: string): string {
    return this.colors[key];
  }
}