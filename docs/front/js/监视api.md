# 监视api
## IntersectionObserver
网页开发时，常常需要了解某个元素是否进入了「视口」（Viewport），即用户能不能看到它
- 监听到 scroll 事件后，调用目标元素的 getBoundingClientRect() 方法，得到它对应于视口左上角的坐标，再判断是否在视口之内(计算量很大，容易造成性能问题)
- IntersectionObserver
1. 基础使用
`const io = new IntersectionObserver(callback, option);`
```
// 开始观察
io.observe(document.getElementById('example'));
// 停止观察
io.unobserve();
// 关闭观察器
io.disconnect();
```
2. callback 参数
`const io = new IntersectionObserver(entries => console.log(entries));`
callback 一般会出发两次。一次是目标元素刚刚进入视口（开始可见），另一次是完全离开视口（开始不可见）。
3. options 
- threshold 
```
new IntersectionObserver(entries => {}, {
  threshold: [0, 0.25, 0.5, 0.75, 1],
});
// 当目标元素 0%、25%、50%、75%、100% 可见时，会触发回调函数。
```
- root && rootMargin
```
root: document.querySelector('.container'), // root 属性指定目标元素所在的容器节点
rootMargin: '500px 0px', // 用来扩展或缩小 rootBounds 这个矩形的大小
```
4. 应用
- 惰性加载
- 滚动加载

## MutationObserver
MutationObservr API 用于监视 DOM 的任何变动，比如节点的增减、属性的变动、文本内容的变动
```
const targetElement = document.getElementById('observer');
// 观察器的配置（需要观察什么变动）
const config = { attributes: true, childList: true, subtree: true };
// 当观察到变动时执行的回调函数
const onMutationObserverChange = function(mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      console.log('A child node has been added or removed');
    } else if (mutation.type === 'attributes') {
      console.log(mutation.attributeName);
    }
  }
};
const observer = new MutationObserver(onMutationObserverChange); // 创建一个观察器实例并传入回调函数
observer.observe(targetNode, config); // 以上述配置开始观察目标节点
observer.disconnect() // 停止观察
```


