# 王世隆 - 个人主页

一个现代化、响应式的个人主页网站，展示个人信息、技能、项目和联系方式。

## 特性

- 📱 **完全响应式设计** - 在所有设备上都有良好的显示效果
- 🎨 **现代化UI设计** - 美观的渐变色彩和动画效果
- ⚡ **快速加载** - 优化的代码和资源，确保快速加载
- 🖱️ **交互式体验** - 丰富的动画和交互效果
- 🌐 **多语言支持** - 中英文一键切换
- 🔗 **社交媒体链接** - 集成社交媒体平台链接
- 📊 **技能展示** - 清晰的技能分类展示
- 🎯 **项目展示** - 精美的项目卡片展示

## 技术栈

- **HTML5** - 语义化标记
- **CSS3** - 现代CSS特性，包括Flexbox、Grid、动画
- **JavaScript (ES6+)** - 原生JavaScript，无依赖
- **Font Awesome** - 图标库
- **响应式设计** - 移动优先的设计方法

## 功能模块

### 1. 导航栏
- 固定顶部导航
- 平滑滚动到各个部分
- 移动端汉堡菜单
- 滚动时的透明度效果

### 2. 首页英雄区域
- 渐变背景
- 打字机效果标题
- 行动号召按钮
- 个人头像区域

### 3. 关于我
- 个人介绍
- 教育背景
- 研究兴趣
- CSDN博客统计

### 4. 技能展示
- 专业技能分类
- 包含机器人、GPU、编程和AI等领域

### 5. 项目展示
- 项目卡片布局
- 技术标签
- GitHub和演示链接
- 悬停效果

## 文件结构

```
personal_homepage/
├── index.html          # 主HTML文件
├── styles.css          # CSS样式文件
├── script.js           # JavaScript交互文件
├── README.md           # 项目说明文档
```

## 快速开始

1. **克隆或下载项目**
   ```bash
   git clone <repository-url>
   cd personal_homepage
   ```

2. **直接打开网页**
   ```bash
   # 使用浏览器打开 index.html
   open index.html
   # 或者
   python -m http.server 8000  # 启动本地服务器
   ```

3. **自定义内容**
   - 编辑 `index.html` 中的个人信息
   - 修改 `styles.css` 中的颜色和样式
   - 在 `script.js` 中添加自定义功能

## 自定义指南

### 更新个人信息

1. **修改基本信息**：
   - 在 `translations.js` 中搜索 "profile_name" 并替换为您的姓名
   - 更新联系信息（邮箱、电话、地址）
   - 修改个人描述和介绍

2. **更新技能**：
   - 在 `index.html` 的 `skills` 部分修改技能项
   - 在 `translations.js` 中更新对应的翻译

3. **更新项目**：
   - 替换项目卡片中的内容
   - 添加真实的GitHub链接和演示链接
   - 更新项目描述和技术栈

4. **更新样式**：
   - 修改 `styles.css` 中的颜色变量
   - 调整布局和间距
   - 添加自定义动画

### 颜色主题自定义

项目使用以下主要颜色：
- 主色调：`#3498db` (蓝色)
- 强调色：`#f39c12` (橙色)
- 背景色：`#f8f9fa` (浅灰)
- 文字色：`#2c3e50` (深蓝灰)

您可以在 `styles.css` 中搜索这些颜色值并替换为您喜欢的颜色。

## 浏览器兼容性

- ✅ Chrome (推荐)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ 移动端浏览器

## 性能优化

- 使用CDN加载Font Awesome图标
- CSS和JavaScript代码已压缩优化
- 图片使用了适当的尺寸和格式
- 实现了懒加载和动画优化

## 部署

### GitHub Pages
1. 将代码推送到GitHub仓库
2. 在仓库设置中启用GitHub Pages
3. 选择主分支作为源
4. 访问 `https://yourusername.github.io/repository-name`

### Netlify
1. 将代码推送到Git仓库
2. 连接Netlify到您的仓库
3. 设置构建命令（无需构建）
4. 发布目录设置为根目录

### Vercel
1. 安装Vercel CLI：`npm i -g vercel`
2. 在项目目录运行：`vercel`
3. 按照提示完成部署

## 后续改进建议

- [ ] 添加暗色主题切换
- [ ] 集成真实的联系表单后端
- [ ] 添加博客文章部分
- [ ] 添加更多动画效果
- [ ] 集成Google Analytics
- [ ] 添加SEO优化

## 许可证

MIT License - 请随意使用和修改这个项目。

## 联系方式

如果您有任何问题或建议，请通过以下方式联系我：

- 📧 邮箱：your.email@example.com
- 🐙 GitHub：[您的GitHub用户名](https://github.com/yourusername)
---

⭐ 如果这个项目对您有帮助，请给它一个星标！