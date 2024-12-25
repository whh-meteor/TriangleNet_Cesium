<template>
    <div class="home">
      <div class="header">
        <h1>智慧海洋系统</h1>
        <p>监测、管理与分析海洋数据的综合平台</p>
      </div>
      <div class="system-cards">
        <div class="card" @click="navigateTo('/system1')">
          <h2>系统一</h2>
          <p>环境监测系统</p>
        </div>
        <div class="card" @click="navigateTo('/system2')">
          <h2>系统二</h2>
          <p>数据分析系统</p>
        </div>
        <div class="card" @click="navigateTo('/system3')">
          <h2>系统三</h2>
          <p>海洋管理系统</p>
        </div>
      </div>
      <div class="footer">
        <p>© 2024 智慧海洋系统. 版权所有.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      navigateTo(path) {
        this.$router.push(path);
      },
    },
  };
  </script>
  
  <style scoped>
  /* 全屏布局，背景与字体保持一致 */
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100vh;
    background: url('https://example.com/ocean-background.jpg') no-repeat center center;
    background-size: cover;
    color: white;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
  }
  
  /* 顶部标题区域 */
  .header {
    margin-top: 20px;
    text-align: center;
  }
  .header h1 {
    font-size: 4em; /* 增大标题字体 */
    margin: 0;
    font-weight: bold;
  }
  .header p {
    font-size: 1.5em; /* 增大描述字体 */
    margin-top: 10px;
    color: #e0f7ff;
  }
  
  /* 系统入口卡片区域，水平排列 */
  .system-cards {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px; /* 调整卡片间距 */
    margin-top: 20px;
    flex-wrap: wrap; /* 如果屏幕较窄，卡片会自动换行 */
  }
  
  /* 单个卡片的样式调整，使其更大 */
  .card {
    width: 350px; /* 卡片宽度 */
    height: 250px; /* 卡片高度 */
    background: rgba(0, 80, 160, 0.8);
    border: 2px solid #0099ff;
    border-radius: 20px;
    text-align: center;
    padding: 30px;
    cursor: pointer;
    transition: transform 0.3s, background 0.3s, box-shadow 0.3s;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4); /* 添加更明显的阴影效果 */
  }
  .card:hover {
    transform: scale(1.1);
    background: rgba(0, 120, 200, 0.9);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5); /* 增强悬停效果 */
  }
  .card h2 {
    font-size: 2.5em; /* 调整标题大小 */
    margin: 0;
    color: #e0f7ff;
  }
  .card p {
    font-size: 1.3em; /* 调整描述文字大小 */
    margin-top: 15px;
    color: #bbecff;
  }
  
  /* 页脚 */
  .footer {
    background: rgba(0, 0, 50, 0.7);
    width: 100%;
    text-align: center;
    padding: 15px 0;
    color: #e0f7ff;
    position: fixed;
    bottom: 0;
  }
  </style>
  