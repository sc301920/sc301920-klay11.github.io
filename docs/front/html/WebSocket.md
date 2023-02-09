# webSocket
WebSocket 是 HTML5 开始提供的一种在单个 TCP 连接上进行全双工通讯的协议。
WebSocket 使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据。在 WebSocket API 中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输
## 创建WebSocket
`var Socket = new WebSocket(url, [protocol] );`
## 属性
1. readyState
- 0 - 表示连接尚未建立。
- 1 - 表示连接已建立，可以进行通信。
- 2 - 表示连接正在进行关闭。
- 3 - 表示连接已经关闭或者连接不能打开。
2. bufferedAmount
正在队列中等待传输，但是还没有发出的 UTF-8 文本字节数
## 事件
1. open 连接建立时触发
2. message 接收服务端数据时触发
3. error 通信发生错误时触发
4. close 连接关闭时触发
## 方法
1. Socket.send() 使用连接发送数据
2. Socket.close() 关闭连接
## WebSocket 实例
```
// 初始化一个 WebSocket 对象
var ws = new WebSocket('ws://localhost:8090/echo');
// 建立 web socket 连接成功触发事件
ws.onopen = function() {
  // 使用 send() 方法发送数据
  ws.send('发送数据');
  alert('数据发送中...');
};
// 接收服务端数据时触发事件
ws.onmessage = function(evt) {
  var received_msg = evt.data;
  alert('数据已接收...');
};
// 断开 web socket 连接成功触发事件
ws.onclose = function() {
  alert('连接已关闭...');
};
```
