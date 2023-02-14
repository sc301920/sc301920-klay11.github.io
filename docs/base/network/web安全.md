# web安全
## 同源策略
>同源策略限制从一个源加载的文档或脚本如何与来自另一个源的资源进行交互，这是一个用于隔离潜在恶意文件的关键的安全机制。
同源需要满足以下三个方面：
- 协议相同
- 域名相同
- 端口相同
跨域解决方案
1. CORS 跨域资源共享
```
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', ctx.headers.origin);
  ctx.set('Access-Control-Allow-Credentials', true);
  ctx.set('Access-Control-Request-Method', 'PUT,POST,GET,DELETE,OPTIONS');
  ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, cc');
});
```
2. Node 代理跨域
3. Nginx 代理跨域
4. JSONP
```
// 动态创建脚本标签
const script = document.createElement('script');
script.src = 'http://localhost:8080/api/jsonp?cb=jsonpCallback';
document.appendChild(script);
window.jsonpCallback = function (res) {

};
```
5. WebSocket
6. window.postMessage
7. document.domain + iframe
两个网页一级域名相同，只是二级域名不同，浏览器只需要设置 document.domain 为更高级别的域就能实现 Cookie 共享
以 a.foo.com 和 b.foo.com 为例，只要设置相同的 document.domain，两个网页就可以共享 Cookie。
`document.domain = 'foo.com';`
8. window.location.hash + iframe
一开始 a.html 给 c.html 传一个 hash 值，然后 c.html 收到 hash 值后，再把 hash 值传递给 b.html，最后 b.html 将结果放到 a.html 的 hash 值中。同样的，a.html 和 b.html 是同域的，都是 `http://localhost:8000/`，而 c.html 是 `http://localhost:8080/`
`window.parent.parent.location.hash = location.hash;`
9. window.name + iframe
window 对象的 name 属性是一个很特别的属性，当该 window 的 location 变化，然后重新加载，它的 name 属性可以依然保持不变。
## XSS 跨站脚本攻击
XSS 攻击全称 跨站脚本攻击（Cross-Site Scripting），是一种代码注入攻击
### 类型
1. 储存型
    - 恶意脚本被存在数据库中
    - 访问页面 读数据时被攻击
    - 危害最大 全用户可见
2. 反射型
    - 不涉及数据库
    - 从url上攻击 服务器参与
    ![reflectedXss](/reflectedXss.png)
3. DOM-Based 型
    - 不需要服务器参与
    - 恶意攻击在浏览器完成
    ![DOM-Based](/DOM-Based.png)
4. mutation-based
    - 利用浏览器渲染DOM的特性
    - 不同浏览器 会有区别
    ![mutationXss](/mutationXss.png)
### 防御
1. 永远不要信任用户的提交内容 不要把内容直接转换成dom
2. 主流框架默认防御xss
3. node服务端使用npm DOMPurify
4. 对string进行转义
5. 对上传svg进行扫描
6. 允许用户自定义样式 额外留意
7. 同源策略 只执行同源的脚本`<meta http-equiv="Content-Security-Policy" content="script-src self">`
## CSRF攻击
跨站请求伪造（Cross-site Request Forgery，简称 CSRF）是一种挟制用户在当前已登录的 Web 页面上执行非本意的操作的攻击方法。
### 攻击类型
1. GET 类型
```
<img src="http://bank.example/transfer?amount=10000&for=hacker" />
```
在受害者访问含有这个 img 的页面后，浏览器会自动向 http://bank.example/transfer?account=xiaoming&amount=10000&for=hacker 发出一次 HTTP 请求。bank.example 就会收到包含受害者登录信息的一次跨域请求。
2. POST 类型
```
<form action="http://bank.example/transfer" method="POST">
  <input type="hidden" name="account" value="xiaoming" />
  <input type="hidden" name="amount" value="10000" />
  <input type="hidden" name="for" value="hacker" />
</form>
<script>
  document.forms[0].submit();
</script>
```
访问该页面后，表单会自动提交，相当于模拟用户完成了一次 POST 操作。
3. 链接类型
```
<a href="http://test.com/csrf/transfer.php?amount=1000&for=hacker" taget="_blank">重磅消息！！</a>
```
### 防御
1. 服务器通过请求头附带的 Origin 和 Referer 字段确定请求的来源域
2. token
3. x-Frame-Options:DENY/SAMEORIGIN防止iframe攻击
4. samesite cookie
5. 保证网络请求由真实用户发出(验证码)
## 注入攻击
在输入的字符串之中注入指令
### 类型
1. sql
```
// 服务端
const result = await sql.query(`
    SELECT a,b,c FROM table
    WHERE username = ${username}
`)
// 客户端
fetch('api',{
    ...,
    body: JSON.stringify({
        username: 'any; DROP TABLE table;' // 删库跑路
    })
})
```
2. cli
```
const commond = `convert-cli video -o && rm - rf xxx`
```
3. os Command
4. ssrf
### 防御
1. 找到项目中查询sql的地方
2. 使用prepared statement
3. 权限限制
4. 对URL类型参数 进行协议 域名 ip等限制
## DOS攻击
通过某种方式 导致服务器资源被消耗 来不及响应导致请求挤压，进而雪崩
1. ReDos
demo: 基于正则表达式的dos
攻击者通过植入一个触发正则表达式回溯行为的字符串，使服务器响应时间变慢
2. DDos
- 直接访问ip
- 任意api
- 消耗带宽
demo: 洪水攻击
![ddos](/ddos.png)
攻击者发起大量的第一次握手 但不完成第三次握手导致握手没有完成 connection不能被释放 达到最大连接数后新请求无法响应
### 防御
1. code Review
2. 拒绝用户提供的正则
3. 网络架构上做好优化，采用负载均衡分流。
4. 快速扩容
5. 限制单 IP 请求频率。应用服务器严格限制单个 IP 允许的连接数和 CPU 使用时间
6. 编写代码时，尽量实现优化并合理使用缓存技术 
**DDoS 攻击究其本质其实是无法彻底防御的，我们能做得就是不断优化自身的网络和服务架构，来提高对 DDoS 的防御能力。**
## 中间人攻击
![intermediator](/intermediator.png)

### 防御
1. https
2. SRI 
![SRI](/SRI.png)


