# web存储
使用HTML5可以在本地存储用户的浏览数据。
## cookie
格式: Document.cookie (4k) 过期时间
`document.cookie="username=John Doe; expires=Thu, 18 Dec 2043 12:00:00 GMT";`

删除 cookie 只需要设置 expires 参数为以前的时间
## localStorage 和 sessionStorage 
- localStorage (20M) - 用于长久保存整个网站的数据，保存的数据没有过期时间，直到手动去除。
- sessionStorage(5M) - 用于临时保存同一窗口(或标签页)的数据，在关闭窗口或标签页之后将会删除这些数据。
```
localStorage.setItem("sitename", "1"); // 存储
localStorage.getItem("sitename"); // 存储
localStorage.removeItem("sitename") // 删除单个数据
localStorage.clear() // 删除所有数据
localStorage.key(index); // 得到某个索引的key
```
## indexDB 
IndexedDB 是一个非关系型数据库 适合很大的数据存储
1. 必不可少的浏览器支持检查
```
if('indexedDB' in window){
  console.log('当前浏览器支持 IndexedDB');
  return;
}
```
2. 连接数据库
```
let dbInstance
let DBRequestLink = window.indexedDB.open('dataBaseName', 4)
DBRequestLink.onsuccess = function(event) {
    dbInstance = DBRequestLink.result;
}
```
3. 创建数据库的主键和字段
```
// 数据库首次新建
DBOpenRequest.onupgradeneeded = function(event) {
    let db = event.target.result;
    let objectStore = db.createObjectStore('person', { 
     keyPath: 'id',
     autoIncrement: true
   });
   objectStore.createIndex('id', 'id', {
     unique: true    
   });
   objectStore.createIndex('name', 'name');
   objectStore.createIndex('age', 'age');
}
```
4. 向数据库中添加数据
```
let newItem = {
   id: 1,
   name: '徐嘻嘻',
   age: 3,
   sex: 'female'
 };
 let transaction = dbInstance.transaction('person', "readwrite");
 let objectStore = transaction.objectStore('person');
 objectStore.add(newItem);
```
5. 修改数据库中的数据
```
let newRecord = {
   id: 1,
   name: '徐嘎嘎',
   age: 5,
   sex: 'male'
};
let transaction = dbInstance.transaction('person', "readwrite");
let objectStore = transaction.objectStore('person');
let objectStoreRequest = objectStore.get(1);
// 先找到想要修改的数据主体，然后在更新该数据主体内容
objectStoreRequest.onsuccess = function(event) {
   var record = objectStoreRequest.result;
   for (let key in newRecord) {
     if (typeof record[key] != 'undefined' || key !== 'id') {
       record[key] = newRecord[key];
     }
   }           
   objectStore.put(record);
};
```
6. 删除数据库中的数据
```
let transaction = dbInstance.transaction('person', "readwrite");
let objectStore = transaction.objectStore('person');
let objectStoreRequest = objectStore.delete(1);
```