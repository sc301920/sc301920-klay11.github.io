# 🙂队列（queue）
## 队列的概念及特点
栈是一种先进先出的数据结构, 只用 shift 和 push 完成增删的“数组”。
- 只允许从尾部添加元素
- 只允许从头部取出元素
## 栈的常用操作
```
const queue = []
queue.push('1')
queue.push('2')
queue.push('3')
while(queue.length){
    let top = queue[0]
    console.log(top)
    queue.shift()
}
```