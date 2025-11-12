// js/main.js - 平台主入口 (优化版)
import { PROJECTS } from '../projects.js';
// 确保这里的路径和文件名是正确的
import { TutorialController } from './TutorialController.js'; 

let currentApp = null; // 用于持有当前教程实例

// --- DOM 元素获取 ---
const navElement = document.getElementById('project-nav');
const projectSelector = document.getElementById('project-selector');
const tutorialContainer = document.getElementById('tutorial-container');
const tutorialTitle = document.getElementById('tutorial-title');
const backButton = document.getElementById('back-to-nav');

// --- 视图切换函数 ---
function showNav() {
  projectSelector.style.display = 'block';
  tutorialContainer.style.display = 'none';
  // 清理可能存在的旧 GGB 实例
  document.getElementById('ggbApplet').innerHTML = '<p class="loading">加载中...</p>';
}

function showTutorial() {
  projectSelector.style.display = 'none';
  tutorialContainer.style.display = 'block';
}

// --- 导航与启动逻辑 ---
function renderNav() {
  if (!navElement) return;
  navElement.innerHTML = ''; // 清空旧列表

  for (const projectId in PROJECTS) {
    const project = PROJECTS[projectId];
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = project.title;
    // 使用 dataset 存储 project id，而不是 href
    a.dataset.projectId = projectId; 
    
    // 为每个链接添加点击事件监听器
    a.addEventListener('click', (event) => {
      event.preventDefault(); // 阻止 a 标签的默认跳转行为
      const id = event.target.dataset.projectId;
      launchTutorial(id);
    });

    li.appendChild(a);
    navElement.appendChild(li);
  }
}

function launchTutorial(projectId) {
  const projectData = PROJECTS[projectId];

  if (!projectData) {
    console.error(`未找到项目: ${projectId}`);
    document.getElementById('ggbApplet').innerHTML = `<p class="error">错误：找不到 ID 为 "${projectId}" 的教程。</p>`;
    showTutorial();
    return;
  }
  
  showTutorial();
  tutorialTitle.textContent = projectData.title;

  // 实例化并启动控制器
  currentApp = new TutorialController(projectData);
  currentApp.init().catch(console.error);
}


// --- 应用启动逻辑 ---
document.addEventListener('DOMContentLoaded', () => {
  // 绑定返回按钮事件
  if (backButton) {
    backButton.addEventListener('click', (event) => {
      event.preventDefault();
      // 在返回时，可能需要停止当前的音频或GGB动画
      if (currentApp && currentApp.audioManager) {
        currentApp.audioManager.pause();
      }
      showNav();
    });
  }
  
  // 初始时显示导航
  renderNav();
  showNav();
});