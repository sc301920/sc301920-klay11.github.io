# 链表
## 链表和数组的比较
- 链表和数组相似，它们都是有序的列表、都是线性结构。
- 不同点，链表中，数据单位的名称叫做“结点”，而结点和结点的分布，在内存中可以是离散的。
## 数组内存
![array](/array.png)
## 链表内存
![linklist](/linklist.png)

## 前端如何创建
JS 中的链表，是以嵌套的对象的形式来实现的
```
{
    // 数据域
    val: 1,
    // 指针域，指向下一个结点
    next: {
        val:2,
        next: ...
    }
}   

```
## 链表节点的创建
```
function listNode(val){
    this.val = val
    this.next = null
}
const node = new ListNode(1)  
node.next = new ListNode(2)
```
## 链表节点的添加

*链表的结点间关系是通过 next 指针来维系的。因此，链表元素的添加和删除操作，本质上都是在围绕 next 指针*
(~~首尾的增加直接操作next 此处省略~~)
![linkNodeAdd](/listNodeAdd.png)
```
const node3 = new ListNode(3)     
// 把node3的 next 指针指向 node2（即 node1.next）
node3.next = node1.next
// 把node1的 next 指针指向 node3
node1.next = node3
```

## 链表元素的删除
链表删除重点不是定位目标结点，而是定位目标结点的前驱结点

![listNodeDel](/listNodeDel.png)

`node1.next = node3.next `

## 链表和数组的辨析

链表的插入/删除效率较高，而访问效率较低；

数组的访问效率较高，而插入效率较低。