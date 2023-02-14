# Blob API
Blob（Binary Large Object）对象表示一个不可变、原始数据的类文件对象
## 基本用法
`const blob = new Blob(data [, options]);`
## 属性和方法
1. 属性
- Blob.size
- Blob.type
2. 方法
- Blob.slice([start [, end [, contentType]]])
- Blob.stream()
- Blob.text()
- Blob.arrayBuffer()
## 与 ArrayBuffer 的关系
- 相同点：Blob 和 ArrayBuffer 都是二进制的容器
- 不同点: Blob 作为一个整体文件，适合用于传输；而只有需要关注细节（比如修改某段数据时），才需要用到 ArrayBuffer
## 应用示例
```
var data1 = "a"; 
var data2 = "b"; 
var data3 = "<div style='color:red;'>This is a blob</div>"; 
var data4 = { "name": "abc" };
var blob1 = new Blob([data1]); 
var blob2 = new Blob([data1, data2]); 
var blob3 = new Blob([data3]); 
var blob4 = new Blob([JSON.stringify(data4)]); 
var blob5 = new Blob([data4]); 
var blob6 = new Blob([data3, data4]);
console.log(blob1);  //输出：Blob {size: 1, type: ""}
console.log(blob2);  //输出：Blob {size: 2, type: ""}
console.log(blob3);  //输出：Blob {size: 44, type: ""}
console.log(blob4);  //输出：Blob {size: 14, type: ""}
console.log(blob5);  //输出：Blob {size: 15, type: ""}
console.log(blob6);  //输出：Blob {size: 59, type: ""}
```
>当使用普通对象创建Blob对象时，相当于调用了普通对象的toString()方法得到字符串数据，然后再创建Blob对象。所以，blob5保存的数据是"[object Object]"，是15个字节(不包含最外层的引号)
### slice方法
```
var data = "abcdef";
var blob1 = new Blob([data]);
var blob2 = blob1.slice(0,3);
console.log(blob1);  //输出：Blob {size: 6, type: ""}
console.log(blob2);  //输出：Blob {size: 3, type: ""}
```
### 分片上传 
资源分段上传：通过 Blob.slice 可以分割二进制数据为子 Blob 上传
### 本地读取文件
FileReader 的 API 可以将 Blob 或 File 转化为文本/ArrayBuffer/Data URL 等类型
### Blob Url
`blob:http://XXX`是 浏览器自行制定的伪协议。
`URL.createObjectURL(blob)`创建 作为文件的下载地址和作为图片资源地址。
1. 文件下载地址
```
var content = "Blob Data";
var blob = new Blob([content])
var link = document.getElementsByTagName("a")[0];
link.download = "file";
link.src = URL.createObjectURL(blob) // blob:http://XXX
```
![Blob](/Blob.png)
2. 图片资源下载地址
```
upload(e){
 let file = e.files[0]
 let bolb = URL.createObjectURL(file)
 var img = document.getElementsByTagName("img")[0]; 
 img.src = blob;
 img.onload = function(e) {
    URL.revokeObjectURL(this.src);  // 释放createObjectURL创建的对象##
 }
}
```
### Data URL和Blob URL区别
Data URL把小图片用base64编码直接嵌入到HTML文件中
1. Blob URL的长度一般比较短，但Data URL因为直接存储图片base64编码后的数据，往往很长，浏览器在显示Data URL时使用了省略号（…）。当显式大图片时，使用Blob URL能获取更好的可能性
2. Blob URL可以方便的使用XMLHttpRequest获取源数据
3. Blob URL 只能在当前应用内部使用，把Blob URL复制到浏览器的地址栏中，是无法获取数据的。Data URL相比之下，就有很好的移植性，你可以在任意浏览器中使用
> Blob URL也可以用作其他资源的网络地址，例如html文件、json文件等，为了保证浏览器能正确的解析Blob URL返回的文件类型，需要在创建Blob对象时指定相应的type
```
// 创建HTML文件的Blob URL
var data = "<div style='color:red;'>This is a blob</div>";
var blob = new Blob([data], { type: 'text/html' });
var blobURL = URL.createObjectURL(blob);

// 创建JSON文件的Blob URL
var data = { "name": "abc" };
var blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
var blobURL = URL.createObjectURL(blob);

```

 
