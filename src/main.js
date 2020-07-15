require('./main.css');

let canvas = document.getElementById('photoAlbum');
// 模拟重力加速度，这里值为10px/帧
const g = 10;
const startTime = new Date().getTime();
// 坐标
let xPoint = 150;
let yPoint = 150;
// 相框按18寸计算，水平居中，初始位置在画布以外
let width = 50;
let height = 40;
// 速度
let xv = 0;
let yv = 0;
// 走过的距离
let xs = 0;
let ys = 0;
//##陈欢|2020-07-14|md-1##
tUtil.pushEvent('md-1');
// 色值玫瑰红
const bg = 'rgb(230, 28, 100)'
if (canvas.getContext) {
    window.requestAnimationFrame(draw);
}

function draw() {
    const ctx = document.getElementById('photoAlbum').getContext('2d');
    ctx.clearRect(0, 0, 300, 300);
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = bg;
    const time = new Date();

    ctx.save();
    ctx.translate(150, 150);
    ctx.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());
    ctx.fillStyle = 'black';
    ctx.fillRect(-25, -20, 50, 40);
    ctx.restore();

    ctx.save();
    ctx.translate(150, 150);
    ctx.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());
    ctx.beginPath();
    ctx.arc(0, 0, 50, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();

    //##陈欢|2020-07-15|md-2##
    tUtil.pushEvent('md-2');

    window.requestAnimationFrame(draw);
}