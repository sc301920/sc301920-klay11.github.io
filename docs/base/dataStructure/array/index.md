# 😁常用数组知识
## 数组的创建
- 1.已知数组的元素

`
const arr = [1, 2, 3, 4] 
`
- 2.未知数组的元素

`
const arr = new Array()
`

` 
const arr = []
`
- 3.指定长度的空数组

`
const arr = new Array(7)
`
- 4.长度确定、同时每一个元素的值也都确定的数组

` 
const arr = new Array(7).fill(1)
`
## 数组的访问
- 访问数组中的元素

` 
arr[index]
` 

## 数组的遍历
- 1.for循环
```
for(let i=0;i<arr.length;i++){
    console.log(arr[i], i)
}
```
- 2.forEach
```
arr.forEach((item, i)=>{
    console.log(item, i)
})
```
- 3.Map
```
const newArr = arr.map((item, index)=> {
    // 输出数组的元素值，输出当前索引
    console.log(item, index)
    // 在当前元素值的基础上加1
    return item+1
})
```
## 数组的增加
`const arr = [1,2]`
- 1.unshift 方法-添加元素到数组的头部

` 
arr.unshift(0) // [0,1,2]
`
- 2.push 方法-添加元素到数组的尾部

` 
arr.push(3) // [1,2,3]
`
- 3.splice 方法-添加元素到数组的任何位置

` 
arr.splice(1,0,3) // [1,3,2]
`
> splice 第一个入参是起始的索引值，第二个入参表示从起始索引开始需要删除的元素个数, 第三个位置开始的入参，代表着需要添加到数组里的元素的值
## 数组的删除
`const arr = [1,2]`
- 1.shift 移除数组的头部元素

` 
arr.shift(0) // [0,1,2]
`
- 2.pop 方法-删除数组的尾部元素

` 
arr.push(3) // [1,2,3]
`
- 3.splice 方法 - 返回删除元素的数组

` 
arr.splice(1, 1) // [0, 2]
`
