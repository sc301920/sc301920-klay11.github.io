# svg
- SVG 指可伸缩矢量图形 (Scalable Vector Graphics)
- SVG 用于定义用于网络的基于矢量的图形
- SVG 使用 XML 格式定义图形
- SVG 图像在放大或改变尺寸的情况下其图形质量不会有损失

## svg形状
1. 矩形
`<rect>` 标签可用来创建矩形，以及矩形的变种
`<rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:1; stroke:rgb(0,0,0)"/>`
2. 圆形
`<circle>` 标签可用来创建一个圆。
`<circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red"/>`
3. 椭圆
`<ellipse>` 标签可用来创建椭圆
`<ellipse cx="300" cy="150" rx="200" ry="80" style="fill:rgb(200,100,50); stroke:rgb(0,0,100);stroke-width:2"/>`
4. 线条
`<line>` 标签用来创建线条
`<line x1="0" y1="0" x2="300" y2="300" style="stroke:rgb(99,99,99);stroke-width:2"/>`
5. 多边形
`<polygon>` 标签用来创建含有不少于三个边的图形
`<polygon points="220,100 300,210 170,250" style="fill:#cccccc; stroke:#000000;stroke-width:1"/>`
6. 折现
`<polyline>` 标签用来创建仅包含直线的形状
`<polyline points="0,0 0,20 20,20 20,40 40,40 40,60" style="fill:white;stroke:red;stroke-width:2"/>`
7. 路径
`<path>` 标签
- M = moveto
- L = lineto
- H = horizontal lineto
- V = vertical lineto
- C = curveto
- S = smooth curveto
- Q = quadratic Belzier curve
- T = smooth quadratic Belzier curveto
- A = elliptical Arc
- Z = closepath
`<path d="M250 150 L150 350 L350 350 Z" />`

**由于绘制路径的复杂性，因此强烈建议您使用 SVG 编辑器来创建复杂的图形**
## svg滤镜
`<filter>` 标签用来定义 SVG 滤镜。`<filter> `标签使用必需的 id 属性来定义向图形应用哪个滤镜, 必须嵌套在 `<defs>` 标签内
```
<svg width="100%" height="100%" version="1.1">
    <defs>
        <filter id="Gaussian_Blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
        </filter>
    </defs>
    <ellipse cx="200" cy="150" rx="70" ry="40" style="fill:#ff0000;stroke:#000000; stroke-width:2;filter:url(#Gaussian_Blur)"/>
</svg>
```
## svg渐变
`<linearGradient>` 可用来定义 SVG 的线性渐变
```
<linearGradient x1="" y1="" x2="" y2="">
  <stop offset="0%"/>
  ...
  <stop offset="20%"/>
  ...
  <stop offset="100%"/>
</linearGradient>
```
`<radialGradient>` 可用来定义 SVG 的放射性渐变
```
<radialGradient cx="" cy="" r="" fx="" fy="">
  <stop offset="0%"/>
  ...
  <stop offset="20%"/>
  ...
  <stop offset="100%"/>
</radialGradient>
```
## 裁剪和蒙层
1. 裁剪
裁剪的功能主要是使用clipPath标签定义一条裁剪路径，然后用来裁剪掉元素的部分内容
```
<svg width="300" height="300">
    <defs>
      <clipPath id="clipPath">
        <path d="M10 50 A50 50 0 0 1 100 50 A50 50 0 0 1 190 50 Q210 100 100 200  Q-5 100 10 50 Z" />
      </clipPath>
    </defs>
    <rect x="0" y="0" width="200" height="200" fill="#f00" clip-path="url(#clipPath)"  />
</svg>
```
2. 蒙层
蒙层的功能主要实现标签就是mask标签，他的功能和名字正好相反，他不是用来遮住元素的部分内容，而是用来显示元素中mask标签遮住的内容。 他和clipPath标签不同的是他允许使用透明度（透明度为0则无蒙层效果）和灰度值遮罩计算得的软边缘
```
<svg width="300" height="300">
    <defs>
      <mask id="Mask">
        <path d="M10 50 A50 50 0 0 1 100 50 A50 50 0 0 1 190 50 Q210 100 100 200  Q-5 100 10 50 Z" fill="#fff" fill-opacity="0.5" />
      </mask>
    </defs>
    <rect x="0" y="0" width="200" height="200" fill="#f00" mask="url(#Mask)" />
  </svg>
```
## 动画
1. 基础动画

translate scale rotate skew

2. js动画
```
// js控制
svg.setAttribute('transform', `translate(${x}, ${y})`)
```
3. css动画
```
@keyframes draw {
    0% {
    stroke-dasharray: 200 540;
    stroke-dashoffset: -445;
    stroke-width: 8px;
    }
    100% {
    stroke-dasharray: 760;
    stroke-dashoffset: 0;
    stroke-width: 2px;
    }
}
```
## GSAP动画库
使用 [GSAP](https://greensock.com/) 在任何框架中为 JavaScript 可以触及的几乎所有内容制作动画
`<script src="https://cdn.jsdelivr.net/npm/gsap"></script>`
```
<div id="svg-wrapper">
    <svg width="500" height="500">
        <rect id="rect" width="50" height="50" fill="orange"></rect>
    </svg>
</div>
<script>
    gsap.to('#rect', {
        x: 300, // transform: translateX(300px)
        duration: 2 // 动画执行时间2S
    })
</script>
```
## 工具和插件
1. 直接上 iconfont下载SVG图标
2. 再用Sketch弄一个动画的路径
3. 借助一个GSAP的插件（MotionPathPlugin）来实现运动。
```
<!-- 飞机 -->
<svg id="airplane" width="16" height="16" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3908" xmlns:xlink="http://www.w3.org/1999/xlink">
<defs>
    <style type="text/css">@font-face { font-family: feedback-iconfont; src: url("//at.alicdn.com/t/font_1031158_u69w8yhxdu.woff2?t=1630033759944") format("woff2"), url("//at.alicdn.com/t/font_1031158_u69w8yhxdu.woff?t=1630033759944") format("woff"), url("//at.alicdn.com/t/font_1031158_u69w8yhxdu.ttf?t=1630033759944") format("truetype"); }</style>
</defs>
<path d="M1009.19461 5.118447a32.054274 32.054274 0 0 0-35.125341 0.255922l-959.708789 639.805859a31.830341 31.830341 0 0 0-14.043738 29.942914 31.830341 31.830341 0 0 0 19.929952 26.360002l250.292052 100.161607 117.692288 205.953506a31.990293 31.990293 0 0 0 27.415681 16.123108H415.998608c11.228593 0 21.657428-5.950194 27.415681-15.547283l66.443839-110.782384 310.14589 124.026365a31.734371 31.734371 0 0 0 27.543642-1.855437c8.445437-4.734563 14.23568-13.05204 15.867185-22.617137l159.951465-959.708788A32.054274 32.054274 0 0 0 1009.19461 5.118447zM100.446359 664.662317L841.821398 170.3803 302.784962 747.389214c-2.847136-1.695486-5.374369-3.934806-8.509418-5.182427l-193.829185-77.54447z m225.627536 105.216073l-0.223932-0.319903L931.842082 120.955298 415.230841 925.895049l-89.156946-156.016659z m480.750122 177.322194l-273.229092-109.278841a63.564712 63.564712 0 0 0-19.929952-3.806845L934.401305 181.896806l-127.577288 765.303778z" fill="#333333" p-id="3909"></path>
</svg>

<!-- 运行的轨迹 -->
<svg width="481px" height="474px" viewBox="0 0 481 474" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    <path id="airplane-path" d="M0.650866946,473.296875 C9.94351815,378.307292 64.0286458,312.061198 162.90625,274.558594 C205.039435,258.578189 296.032367,243.501651 389.742188,185.972656 C427.061784,163.061943 457.245378,101.237724 480.292969,0.5" stroke="#979797"></path>
</g>
</svg>

<script src="https://cdn.jsdelivr.net/npm/gsap"></script>
<script src="https://unpkg.com/gsap@3.10.4/dist/MotionPathPlugin.min.js"></script>
<script>
// 使用 MotionPathPlugin 插件
gsap.registerPlugin(MotionPathPlugin);
gsap.to("#airplane", { // 要运动的元素
    duration: 3, // 时间
    repeat: -1, // 循环（1、2、3、4 为循环次数，-1为无限循环）
    ease: Linear.easeNone, // 运动曲线
    motionPath:{
    path: "#airplane-path", // 运动的轨迹
    align: "#airplane-path",
    autoRotate: 45, // 飞机运动旋转角度 （true为自动调整角度）
    alignOrigin: [1, 1] // 飞机的运动原点
    }
});
</script>
```

## 图形变换
```
<svg width="400" height="400" viewBox="0 0 1200 1200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<!-- 三角形 -->
<path id="triangle" d="M183,10 L356,363 L10,263 L183,10 Z" fill="#000000"></path>
<!-- 正方形 -->
<rect id="rect" fill="#D8D8D8" fill-opacity="0" x="0.5" y="0.5" width="422" height="422"></rect>
<!-- 五角星 -->
<path id="pentagram" d="M240.5,1.21504532 L314.363147,164.807166 L479.631495,191.057113 L360.039041,318.48039 L388.260044,498.335188 L240.5,413.423321 L92.7399555,498.335188 L120.960959,318.48039 L1.36850495,191.057113 L166.636853,164.807166 L240.5,1.21504532 Z" fill-opacity="0"></path>
<!-- 圆 -->
<circle id="circle" fill-opacity="0" cx="500" cy="500" r="400"></circle>
<!-- 猫 -->
<path id="cat" d="M 356.26 462.39 s 177.03 1.66 245.84 9.43 c 0 0 62.15 7.77 89.9 3.33 c 0 0 37.58 -18.84 58.82 -26.08 c 10.32 -3.52 17.98 -10.02 29.41 -32.19 c 3.42 -6.64 8.88 -13.32 25.53 -15.54 c 0 0 3.88 23.31 0 35.52 c 0 0 58.83 44.4 44.95 73.25 c 0 0 -9.85 16.28 -19.42 16.65 c -9.43 0.36 -33.85 -3.33 -37.74 0 c 0 0 -38.17 23.09 -42.18 56.61 c -2.27 19.02 -7.95 62.93 1.66 76.58 c 21.37 30.36 118.76 103.78 89.9 118.2 c 0 0 -8.88 4.99 -23.86 -6.66 c 0 0 -41.07 -44.4 -68.26 -54.39 c 0 0 -62.71 -36.07 -73.81 -54.94 c 0 0 -45.51 9.99 -36.07 105.44 c 0 0 8.26 14.74 14.98 19.42 c 4.74 3.3 18.59 21.18 -9.43 21.09 c 0 0 -33.3 3.88 -38.29 -39.96 c 0 0 -3.99 -90.46 -3.66 -118.76 l -161.72 -0.55 l -46.62 53.28 s -14.8 30.48 14.43 53.83 c 2.62 2.1 7.34 7.33 10.54 8.32 c 8.46 2.62 33.3 -2.22 28.86 20.53 c 0 0 -5.51 17.77 -38.85 6.1 c -21.87 -7.65 -44.4 -26.08 -68.26 -62.71 c 0 0 -11.1 -14.98 0 -36.63 c 0 0 11.1 -43.84 -7.21 -41.07 c 0 0 -36.07 38.85 -82.13 38.29 c 0 0 -49.95 -0.55 -51.06 78.25 c 0 0 22.75 23.86 -9.43 24.97 c 0 0 -24.97 2.22 -21.64 -33.85 c 0 0 3.33 -33.85 17.76 -81.02 c 0 0 3.88 -18.31 22.75 -29.97 c 0 0 32.74 -16.01 39.4 -42.41 c 0 0 8.88 -65.81 40.51 -101.32 c 0 0 7.21 -25.53 -8.88 -59.93 c 0 0 -31.08 -54.94 -36.63 -118.2 c 0 0 -1.66 -32.74 -45.51 -82.69 c 0 0 -19.15 -33.85 11.65 -25.53 c 0 0 68.26 37.46 79.08 109.88 c 0.04 0.02 23.63 115.18 64.69 135.43 Z" fill-opacity="0"/>
</svg>

<script>
// 创建时间线
let tl = gsap.timeline({
    repeat: -1, 
    repeatDelay: 0.2,
    yoyo: true, // 动画回放
    defaults: {
    duration: 2
    }
})
// 图形变化过程
tl
.to("#triangle", { morphSVG: "#rect" }, "+=1")
.to("#triangle", { morphSVG: "#pentagram" }, "+=1")
.to("#triangle", { morphSVG: "#circle" }, "+=1")
.to("#triangle", { morphSVG: "#cat" }, "+=1")
.timeScale(2);
</script>
```
