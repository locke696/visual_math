// js/InertiaController.js
import { GeoGebraManager } from './GeoGebraManager.js';
import { AudioManager } from './AudioManager.js';
import { GGB_CONFIG } from '../config.js';

class InertiaController {
  constructor() {
    this.ggbManager = new GeoGebraManager('ggbApplet');
    this.audioManager = new AudioManager('tutorial_audio');
  }

  async init() {
    // 加载 base64 并初始化 GeoGebra
    const base64 = await this.ggbManager.loadBase64('./assets/ggb/inertia.ggb.base64.txt');
    await this.ggbManager.init(base64, GGB_CONFIG.ggbParams);

    // 绑定事件
    this.ggbManager.onUpdate((objName) => this.handleGGBUpdate(objName));

    // 教程开始时，手动触发一次，播放第一步的音频
    this.playAudioForStep(1);
  }

  handleGGBUpdate(objectName) {
    // 我们只关心步骤控制器 'n' 的变化
    if (objectName === "n") {
      const n = this.ggbManager.getValue('n');
      console.log(`进入步骤: n = ${n}`);
      this.playAudioForStep(n);
    }
  }

  playAudioForStep(step) {
    const audioFile = GGB_CONFIG.audioMapping[step];
    if (audioFile) {
      this.audioManager.play(`./assets/audio/${audioFile}`);
    }
  }
}

// 启动应用
document.addEventListener('DOMContentLoaded', () => {
  const app = new InertiaController();
  app.init().catch(console.error);
});