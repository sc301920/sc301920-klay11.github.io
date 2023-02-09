# webWorkers
Web worker 是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能。
## 普通worker
### 创建 Worker 
`const worker = new Worker('./worker.js');`
### 方法
1. onmessage 主线程中可以在 Worker 上添加 onmessage 方法，用于监听 Worker 的信息
2. onmessageerror 主线程中可以在 Worker 上添加 onmessageerror 方法，用于监听 Worker 的错误信息。
3. postMessage() 主线程通过此方法给 Worker 发送消息
4. terminate() 主线程通过此方法终止 Worker 的运行
### 通信
Worker 的作用域跟主线程中的 Window 是相互独立的，并且 Worker 中是获取不到 DOM 元素的。所以在 Worker 中你无法使用 Window 变量。取而代之的是可以用 self 来表示全局对象
### Worker 中引用其他脚本的方式
Worker 中通过 importScripts 来引入`importScripts('constant.js');`
### 调试方法
Worker 的调试在浏览器控制台中有专门展示的地方
### 常见使用场景
- 一般的视频网站 解码的代码应该写在 Worker 里面
- 需要大量计算的网站 解析文件等
- 前端导出生成excel
- 图片批量压缩
### 实例
```
// 主线程下创建worker线程
const worker = new Worker('./worker.js')
// 监听接收worker线程发的消息
worker.onmessage = function (e) {
  console.log('主线程收到worker线程消息：', e.data)
}
// 向worker线程发送消息
worker.postMessage('主线程发送hello world')

// self 代表子线程
self.addEventListener("message", function (e) {
  // e.data表示主线程发送过来的数据
  self.postMessage("worker线程收到的：" + e.data); // 向主线程发送消息
});
```
## ServiceWorker
SharedWorker 可以同时被多个浏览器环境访问，只要这些 Workers 处于同一主域。为跨浏览器 tab 共享数据提供了一种解决方案。
### 创建
`const worker = new SharedWorker("./shareWorker.js")`
### 方法
SharedWorker 的方法和普通worker一致但是都在 port 上 
### 通信
SharedWorker 跟普通的 Worker 一样，可以用 self 来表示全局对象。不同之处是，它需要等 port 连接成功之后，利用 port 的onmessage、postMessage，来跟主线程进行通信。当你打开多个窗口的时候，SharedWorker 的作用域是公用的

## ServiceWorker
ServiceWorker 一般作为 Web 应用程序、浏览器和网络之间的代理服务
### 创建 ServiceWorker
```
// index.js
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
    navigator.serviceWorker
        .register('./serviceWorker.js', { scope: '/page/' })
        .then(
        function (registration) {
            console.log(
            'ServiceWorker registration successful with scope: ',
            registration.scope
            );
        },
        function (err) {
            console.log('ServiceWorker registration failed: ', err);
        }
        );
    });
}
```
只要创建了 ServiceWorker，不管这个创建 ServiceWorker 的 html 是否打开，这个 ServiceWorker 是一直存在的。它会代理范围是根据 scope 决定的
2. 安装 ServiceWorker
```
// serviceWorker.js
const CACHE_NAME = 'cache-v1';
// 需要缓存的文件
const urlsToCache = [
    '/style/main.css',
    '/constant.js',
    '/serviceWorker.html',
    '/page/index.html',
    '/serviceWorker.js',
    '/image/131.png',
];
self.oninstall = (event) => {
    event.waitUntil(
    caches
        .open(CACHE_NAME) // 这返回的是promise
        .then(function (cache) {
        return cache.addAll(urlsToCache); // 这返回的是promise
        })
    );
};
```
3. 缓存和返回请求
```
self.onfetch = (event) => {
    event.respondWith(
    caches
        .match(event.request) // 此方法从服务工作线程所创建的任何缓存中查找缓存的结果
        .then(function (response) {
        // response为匹配到的缓存资源，如果没有匹配到则返回undefined，需要fetch资源
        if (response) {
            return response;
        }
        return fetch(event.request);
        })
    );
};
```
在 fetch 事件的回调中，我们去匹配 cache 中的资源。如果匹配到，则使用缓存资源；没有匹配到则用 fetch 请求。正因为 ServiceWorker 可以代理网络请求，所以为了安全起见，规范中规定它只能在 https 和 localhost 下才能开启
4. 常见使用场景
- 缓存资源文件，加快渲染速度