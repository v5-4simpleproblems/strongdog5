const { createCanvas } = require('canvas');
const fs = require('fs');

// 创建180x180的画布
const canvas = createCanvas(180, 180);
const ctx = canvas.getContext('2d');

// 设置常量
const size = 180;
const center = size / 2;
const radius = size * 0.4;

// 绘制渐变背景
const bgGradient = ctx.createLinearGradient(0, 0, size, size);
bgGradient.addColorStop(0, '#4A90B9');
bgGradient.addColorStop(1, '#6CB2D6');
ctx.fillStyle = bgGradient;
ctx.fillRect(0, 0, size, size);

// 绘制白色棒球
ctx.beginPath();
ctx.arc(center, center, radius, 0, Math.PI * 2);
ctx.fillStyle = '#FFFFFF';
ctx.fill();

// 绘制缝线
ctx.strokeStyle = '#e74c3c';
ctx.lineWidth = size * 0.04;
ctx.lineCap = 'round';

// 左侧缝线
ctx.beginPath();
ctx.arc(center, center, radius * 0.7, -Math.PI * 0.3, Math.PI * 0.3);
ctx.stroke();

// 右侧缝线
ctx.beginPath();
ctx.arc(center, center, radius * 0.7, Math.PI * 0.7, Math.PI * 1.3);
ctx.stroke();

// 添加高光效果
const highlightGradient = ctx.createRadialGradient(
    center - size * 0.2, center - size * 0.2, 0,
    center, center, radius
);
highlightGradient.addColorStop(0, 'rgba(255,255,255,0.4)');
highlightGradient.addColorStop(0.5, 'rgba(255,255,255,0.1)');
highlightGradient.addColorStop(1, 'rgba(255,255,255,0)');

ctx.fillStyle = highlightGradient;
ctx.beginPath();
ctx.arc(center, center, radius, 0, Math.PI * 2);
ctx.fill();

// 保存为PNG文件
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('favicon/apple-touch-icon.png', buffer);

console.log('Apple Touch Icon已生成在favicon/apple-touch-icon.png'); 