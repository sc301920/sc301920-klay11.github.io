# HTTP
HTTP 全称是  HyperText Transfer Protocal ，即超文本传输协议。
## 特点
- 灵活可扩展，除了规定空格分隔单词，换行分隔字段以外，其他都没有限制，不仅仅可以传输文本，还可以传输图片、视频等任意资源
- 可靠传输，基于 TCP/IP 所以继承了这一特性
- 请求-应答，有来有回
- 无状态，每次 HTTP 请求都是独立的，无关的、默认不需要保存上下文信息
## 缺点: 
- 明文传输不安全
- 复用一个 TCP 链接，会发生对头拥塞
- 无状态在长连接场景中，需要保存大量上下文，以避免传输大量重复的信息
## 报文格式
1. 请求报文
- 请求行
- 请求头
- 请求体
```
POST /index.html HTTP/1.1  // 请求行
Host: search.cnipr.com  // 请求头
User-Agent: Mozilla/5.0 (Windows;U;Windows NT 6.9;zh-CN;rv:1.9.1.13)Gecko/20100914 Firefox/3.5.13 (.NET CLR 3.5.30729) 
Accept: text/html, application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8 
Accept-Language: zh-cn,zh;q=0.5 
Accept-Encoding: gzip,deflate
Accept-Charst: GN2312,utf-8;q=0.7,*;q=0.7
Keep-Alive: 300
Connection: keep-alive
Referer: http://search.cnipr.com/cnipr/zljs/hyjs-biaodan-y.jsp
Content-Length: 405
// 请求体
pageNo=0&pageSize=10&orderNum=306735659327926273&customerMobile=15626000000&startTime=2019-02-01%2000:00:00&endTime=2019-02-25%2014:54:20&status=SUCCESS&source=WECHAT_SHOPPING&canteenId=104&refundStatus=REFUNDED&startPayTime=2019-02-01%2000:00:00&endPayTime=2019-02-25%2014:54:47
```
2. 响应报文
- 状态行
- 响应头
- 响应体
```
HTTP/1.0 200 ok  // 状态行
content-type: application/javascript;charset=utf-8
date: Tue, 07 Mar 2017 03:06:14 GMT
sever: Domain Reliability Searver
content-length: 0
x-xss-protection: 1, mode=bloack
x-frame-options: SAMEORIGIN
alt-svc: quic=":443";ma=2592000;v="36,35,34"
```
## 状态码
- 1xx：表示目前是协议的中间状态，还需要后续请求
- 2xx：表示请求成功
- 3xx：表示重定向状态，需要重新请求
- 4xx：表示请求报文错误
- 5xx：服务器端错误
常见状态码:
101 切换请求协议，从 HTTP 切换到 WebSocket
200 请求成功，有响应体
301 永久重定向：会缓存
302 临时重定向：不会缓存
304 协商缓存命中
403 服务器禁止访问
404 资源未找到
400 请求错误
500 服务器端错误
503 服务器繁忙
>你知道 302 状态码是什么嘛？你平时浏览网页的过程中遇到过哪些 302 的场景？
302 表示临时重定向，这个资源只是暂时不能被访问了，但是之后过一段时间还是可以继续访问，一般是访问某个网站的资源需要权限时，会需要用户去登录，跳转到登录页面之后登录之后，还可以继续访问。
301 类似，都会跳转到一个新的网站，但是 301 代表访问的地址的资源被永久移除了，以后都不应该访问这个地址，搜索引擎抓取的时候也会用新的地址替换这个老的。可以在返回的响应的 location 首部去获取到返回的地址。301 的场景如下：
## 常见的HTTP请求方法
GET: 向服务器获取数据；
POST：将实体提交到指定的资源，通常会造成服务器资源的修改；
PUT：上传文件，更新数据；
DELETE：删除服务器上的对象；
HEAD：获取报文首部，与GET相比，不返回报文主体部分；
OPTIONS：询问支持的请求方法，用来跨域请求；
CONNECT：要求在与代理服务器通信时建立隧道，使用隧道进行TCP通信；
TRACE: 回显服务器收到的请求，主要⽤于测试或诊断
## HTTPS
`HTTPS = HTTP + SSL（加密 + 认证 + 完整性保护）`
![https](/https.png)
## 问题
1. 在交互过程中如果数据传送完了，还不想断开连接怎么办，怎么维持
在 HTTP 中响应体的 Connection 字段指定为 keep-alive
2. HTTP 如何实现长连接？在什么时候会超时
通过在头部（请求和响应头）设置 Connection: keep-alive，HTTP1.0协议支持，但是默认关闭，从HTTP1.1协议以后，连接默认都是长连接