# Canvas
### 什么是canvas
>`<canvas>` 是 HTML5 新增的元素，可用于通过使用 JavaScript 中的脚本来绘制图形。例如，它可以用于绘制图形、制作照片、创建动画，甚至可以进行实时视频处理或渲染

**`<canvas>` 只是一个画布，本身并不具有绘图的能力，绘图必须使用 JavaScript 等脚本语言**
Canvas 是为了解决 Web 页面中只能显示静态图片这个问题而提出的，一个可以使用 JavaScript 等脚本语言向其中绘制图像的 HTML 标签。
### `canvas`应用场景
1. 绘制图表 现在的一些数据可视化的 js 库（如 ECharts）大部分都是使用 Canvas 实现的
2. 小游戏
3. 活动页
4. 小特效
### 入门 Canvas
改变画布的大小有三种方式
- HTML 设置 width、height;
- CSS 设置 width、height;
- JS 动态设置 width、height;

使用 CSS 来设置宽高的话，画布就会按照 300 * 150 的比例进行缩放，尽量使用 HTML 的width 和 height 属性或者直接使用 JS 动态来设置宽高，不要使用 CSS 设置
### 获取 Canvas 对象
获取到 Canvas 的上下文环境
- 2d（本小册所有的示例都是 2d 的）：代表一个二维渲染上下文
- webgl（或"experimental-webgl"）：代表一个三维渲染上下文
- webgl2（或"experimental-webgl2"）：代表一个三维渲染上下文；
```
<canvas id="myCanvas" width="200" height="100"></canvas>
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
```
### 完整属性
参考[Canvas 参考手册](https://www.runoob.com/tags/ref-canvas.html).

### 常用应用实践
1. 保存图片
- 使用插件 html2canvas 可以将渲染的dom，生成图片。一般可用作生成海报和截图场景。
- 复杂场景建议结合属性手写canvas
所需方法 `canvas.toDataURL("image/png")`
2. 图片灰度

所需方法`getImageData() putImageData()`
```
const blackWhite = function() {
    ctx.drawImage(img, 0, 0, 450, 800);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
      var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i]     = avg; // red
      data[i + 1] = avg; // green
      data[i + 2] = avg; // blue
    }
    ctx.putImageData(imageData, 0, 0);
}
```
3. 签名
```
  <canvas id="canvas" width="450" height="300">
      当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <div id="clear">清空画布</div>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
    var clear = document.getElementById('clear');
    const ctx = canvas.getContext("2d");
    canvas.addEventListener('mouseenter', () => {
        canvas.addEventListener('mousedown', (e) => {
            ctx.beginPath()
            ctx.moveTo(e.offsetX, e.offsetY)
            canvas.addEventListener('mousemove', draw)
        })
        canvas.addEventListener('mouseup', () => {
            canvas.removeEventListener('mousemove', draw)
        })
    })
    function draw(e) {
        ctx.lineTo(e.offsetX, e.offsetY)
        ctx.stroke()
    }
    clear.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    })
```
4. 刮刮奖

应用到的方法是`globalCompositeOperation`
```
  <canvas id="canvas" width="1000" height="500">
    当前浏览器不支持canvas元素，请升级或更换浏览器！
  </canvas>
  <script>
    // 获取 canvas 元素
    var canvas = document.getElementById('canvas');
   
    // 通过判断getContext方法是否存在来判断浏览器的支持性
    if(canvas.getContext) {
      // 获取绘图上下文
      var ctx = canvas.getContext('2d');
      const imageUrl = "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20160909%2Feca561d1ecce4fcab4f600a74f15b221_th.jpeg&refer=http%3A%2F%2Fimg.mp.itc.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1672410563&t=65c34c7d49a899c2f2a3c0f99827312f";

      // 设置画笔
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.lineWidth = 50

      // 为canvas添加鼠标按下事件
      canvas.addEventListener("mousedown", mousedownFn, false)
      let downX,downY
      // 鼠标按下触发的方法
      function mousedownFn(e) {
        e.preventDefault()
        downX = e.pageX
        downY = e.pageY
        drawLine({startX: downX, startY: downY})
        // 为canvas添加鼠标移动和鼠标抬起事件
        canvas.addEventListener("mousemove", mousemoveFn, false)
        canvas.addEventListener("mouseup", mouseupFn, false)
      }

      // 鼠标移动触发
      function mousemoveFn(e) {
        e.preventDefault()
        const moveX = e.pageX
        const moveY = e.pageY
        drawLine({endX: moveX, endY: moveY})
        downX = moveX
        downY = moveY
      }

      // 鼠标抬起触发
      function mouseupFn() {
        // 鼠标抬起以后移除事件
        canvas.removeEventListener("mousemove", mousemoveFn, false)
        canvas.removeEventListener("mouseup", mouseupFn, false)
      }

      // 画线
      function drawLine(position) {
        const { startX, startY, endX, endY } = position
        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX || startX, endY || startY)
        ctx.stroke()
      }

      drawImage(imageUrl)
      function drawImage(src) {
        const img = new Image()
        img.crossOrigin = ''
        img.src = src
        img.onload = () => {
          const imageAspectRatio = img.width / img.height
          const canvasAspectRatio = canvas.width / canvas.height
          ctx.drawImage( img, 0, 0, canvas.width, canvas.height )
          ctx.globalCompositeOperation = 'destination-out'
        }
      }
    }

```
### canvas框架
[pixijs](http://pixijs.huashengweilai.com/)

### 常见的 Canvas 优化方法
1. 避免浮点数的坐标点
2. 使用多层画布去画一个复杂的场景
3. 用 CSS transform 特性缩放画布调用的是 GPU 尽量不使用 left、top 这些 CSS 
4. 离屏渲染: 设置缓存，绘制图像的时候在屏幕之外的地方绘制好，然后再直接拿过来用