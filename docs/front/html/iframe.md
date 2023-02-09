# iframe
> iframe 标签承载了一个单独的嵌入的窗口，它有自己的 document 和 window
> iframe.contentWindow 来获取  中的 window
> iframe.contentDocument 来获取  中的 document ， 是 iframe.contentWindow.document 的简写。
> 当我们访问嵌入的窗口中的东西时，浏览器会检查 iframe 是否具有相同的源。如果不是，则会拒绝访问（对 location 进行写入是一个例外，它是会被允许的）。

## window.frames
一个 iframe 内可能嵌套了其他的 iframe。相应的 window 对象会形成一个层次结构（hierarchy）
- window.frames —— “子”窗口的集合（用于嵌套的 iframe）。
- window.parent —— 对“父”（外部）窗口的引用。
- window.top —— 对最顶级父窗口的引用。
```
if (window === window.top) { 
   alert('不是在 iframe 中打开的');
} else {
   alert('在 iframe 中打开的');
}
```
## “sandbox” iframe 特性
> sandbox 特性（attribute）允许在 `<iframe>` 中禁止某些特定行为，以防止其执行不被信任的代码。它通过将 iframe 视为非同源的，或者应用其他限制来实现 iframe 的“沙盒化”。

- allow-same-origin
默认情况下，"sandbox" 会为 iframe 强制实施“不同来源”的策略。换句话说，它使浏览器将 iframe 视为来自另一个源，即使其 src 指向的是同一个网站也是如此。具有所有隐含的脚本限制。此选项会移除这些限制。 
- allow-top-navigation
允许 iframe 更改 parent.location
- allow-forms
允许在 iframe 中提交表单。
- allow-scripts
允许在 iframe 中运行脚本。
- allow-popups
允许在 iframe 中使用 window.open 打开弹窗。

## iframe 通信：postMessage onmessage
postMessage 接口允许窗口之间相互通信，无论它们来自什么源。
1. 发送
```
 // <iframe src="http://127.0.0.1:8080/2.html" name="example" /> 
 let win = window.frames.example;    
 win.postMessage("message", "http://127.0.0.1:8080"); 
```
2. 接收
```
 window.addEventListener("message", function(event) {
   console.log(event)
   if (event.origin != 'http://http://127.0.0.1:8080') {
     return;
   }
   if (window == event.source) {
     // chrome 下, 页面初次加载后会触发一次 message 事件, event.source 是 window 对象
     // 此时 event.source.postMessage 会形成死循环
     // 因此，要跳过第一次的初始化触发的情况
     return
   }
   console.log( "received: " + event.data );
   // 可以使用 event.source.postMessage(...) 向回发送消息
   event.source.postMessage('i am 2.html')
 }, source);
```
## 跨窗口的 cookie
1. iframe 嵌套的 html 设置的 cookie 我们可以从 父html 中获取
2. iframe 中设置的 cookie 会覆盖 父html cookie 中 Name 相同的值
**iframe 嵌套，每层都互相跨域的页面，最内层的依然可以访问最外层的 cookie**

## 访问父/祖父/组祖父/... 页面的方法
同域才能访问父/祖父/组祖父/... 页面的方法
当 1.html 和 2.html 跨域，1.html 和 3.html不跨域时，
3.html 可以通过 window.parent.parent.fn() 访问 1.html 的方法

