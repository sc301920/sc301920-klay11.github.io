# 🙂栈（Stack）
## 栈的概念及特点
栈是一种后进先出(LIFO，Last In First Out)的数据结构, 只用 pop 和 push 完成增删的“数组”。
- 只允许从尾部添加元素
- 只允许从尾部取出元素
## 栈的常用操作
```
const stack = []
stack.push('1')
stack.push('2')
stack.push('3')
while(stack.length){
    let top = stack[stack.length-1]
    console.log(top)
    stack.pop()
}
```