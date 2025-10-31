// config.js - 为惯性教学项目配置
export const GGB_CONFIG = {
  // GeoGebra 显示参数
  ggbParams: {
    width: 1470,
    height: 647,
    showMenuBar: false,
    showAlgebraInput: false,
    showToolBar: false,
    showToolBarHelp: false,
    showResetIcon: false,
    enableShiftDragZoom: true,
    showZoomButtons: true,
    appName: "classic",
    // 建议添加一个唯一的id，防止缓存问题
    // material_id: "your_unique_id_here" 
  },

  // 音频映射：滑块 n 的值 → 音频文件名
  audioMapping: {
    1: 'step1.mp3',
    2: 'step2.mp3',
    3: 'step3.mp3',
    4: 'step4.mp3',
  },

  // 因为GGB内部有 n_max=3 的滑块，这个可以不设置，但保留也无妨
  defaultNMax: 3 
};