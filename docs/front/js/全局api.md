# 全局api
## requestAnimationFrame
> window.requestAnimationFrame() 方法告诉浏览器您希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画。该方法使用一个回调函数作为参数，这个回调函数会在浏览器重绘之前调用。
- `window.requestAnimationFrame(callback);`
- `window.cancelAnimationFrame(requestID);`
### 传统动画渲染
传统的动画渲染是通过 setTimeout 和 setInterval 进行实现，但是这两种定时器会有两个弊端：
1. 动画的时间间隔不好确定，设置时间过长会使得动画不够平滑流畅，设置过短会令浏览器的重绘频率容易达到瓶颈（推荐最佳循环间隔是 17ms，因为大多数电脑的显示器刷新频率是 60Hz，1000ms/60）。
2. 定时器的第二个时间参数只是指定了多久后将动画任务添加到浏览器的 UI 线程队列中，如果 UI 线程处于忙碌状态，那么动画不会立即执行。
### requestAnimationFrame优点 
- requestAnimationFrame 会把每一帧中的所有 DOM 操作集中起来，在一次重绘或回流中就完成，并且重绘或回流的时间间隔紧紧跟随浏览器的刷新频率
- 在隐藏或不可见的元素中，或者浏览器标签页不可见时，requestAnimationFrame 将不会进行重绘或回流，这当然就意味着更少的 CPU、GPU 和内存使用量
- requestAnimationFrame 是由浏览器专门为当年规划提供的 API，在运行时浏览器会自动优化方法的调用，并且如果页面不是激活状态下的话，动画会自动暂停，有效节省了 CPU 开销
### 场景
1. js动画
```
var deg = 0;
var id;
var div = document.getElementById("div");
div.addEventListener('click', function () {
    var self = this;
    requestAnimationFrame(function change() {
        self.style.transform = 'rotate(' + (deg++) + 'deg)';
        id = requestAnimationFrame(change);
    });
});
document.getElementById('stop').onclick = function () {
    cancelAnimationFrame(id);
};
```
2. 大数据渲染
```
var total = 100000;
var size = 100;
var count = total / size;
var done = 0;
var ul = document.getElementById('list');
function addItems() {
    var li = null;
    var fg = document.createDocumentFragment();
    for (var i = 0; i < size; i++) {
        li = document.createElement('li');
        li.innerText = 'item ' + (done * size + i);
        fg.appendChild(li);
    }
    ul.appendChild(fg);
    done++;
    if (done < count) {
        requestAnimationFrame(addItems);
    }
};
requestAnimationFrame(addItems);
```
## requestIdleCallback
> 一般浏览器的刷新率为 60HZ，即 1 秒钟刷新 60 次。1000ms / 60hz = 16.6，大概每过 16.6ms 浏览器会渲染一帧画面
```
task -> requestAnimationFrame -> render -> requestIdleCallback
```
如果渲染完成后还有空闲时间，则 requestIdleCallback API 会被调用
如果 task 执行时间超过了 16.6ms, 那么这一帧就没有时间 render，页面直到下一帧 render 后才会更新。表现为页面卡顿一帧，或者说掉帧
> 为了解决掉帧造成的卡顿，React16 将递归的构建方式改为可中断的遍历。React16 就是基于 requestIdleCallbackAPI，实现了自己的 Fiber Reconciler。以 5ms 的执行时间划分 task，每遍历完一个节点，就检查当前 task 是否已经执行了 5ms。如果超过 5ms，则中断本次 task。通过将 task 执行时间切分为一个个小段，减少长时间 task 造成无法 render 的情况，这就是时间切片。
## getComputedStyle
`let style = window.getComputedStyle(element, [pseudoElt])`
>style是一个实时的 CSSStyleDeclaration 对象，当元素的样式更改时，它会自动更新本身。
1. PC or Mobile
```
@media (any-hover: none) {
    body::before {
        content: 'hoverNone';
        display: none;
    }
}
var strContent = getComputedStyle(document.body, '::before').content;
```
'none'则表示支持 hover，是 PC 端，
"hoverNone"则表示不支持 hover ,是 Mobile 端
2.  黑暗模式
```
:root {
    --mode: 'unknown';
}
@media (prefers-color-scheme: dark) {
    /* 黑暗模式 */
    :root {
         --mode: 'dark';
         --colorLink: #bfdbff;
         --colorMark: #cc0000;
         --colorText: #ffffff;
         --colorLight: #777777;
    }
}
@media (prefers-color-scheme: light) {
    /* 浅色主题 */
    :root {
         --mode: 'light';
         --colorLink: #34538b;
         --colorMark: #cc0000;
         --colorText: #000000;
         --colorLight: #cccccc;
    }
}

var mode = getComputedStyle(document.documentElement).getPropertyValue('--mode').trim();
// mode结果是'"dark"'则表示黑夜主题，深色模式，黑暗风格，护眼模式。
```
## 页面生命周期方法
1. 四个重要事件：
|事件|说明|应用场景|
|:-|:-:|-:|
|DOMContentLoaded|浏览器已完全加载 HTML，并构建了 DOM 树，但诸如 <img> 和样式表之类的外部资源可能尚未加载完成|DOM 已经就绪，因此处理程序可以查找 DOM 节点，并初始化接口|
|load|浏览器不仅加载完成了 HTML，还加载完成了所有外部资源|外部资源已加载完成，样式已被应用，图片大小也已知了|
|beforeunload|当用户正在离开页面时触发|用户正在离开，我们可以检查用户是否保存了更改，并询问他是否真的要离开|
|unload|当用户正在离开页面时触发|用户几乎已经离开了，但是我们仍然可以启动一些操作，例如发送统计数据|
2. 文档加载的生命周期：
文档加载中状态 document.raedyState -> loading
可交互状态 readystatechange -> document.readyState = interactive
DOMContentLoaded
iframe onload
img onload
文档加载完成状态 document.readyState -> complete
window.onload