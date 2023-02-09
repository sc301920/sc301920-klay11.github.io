
# 树与二叉树
## 树的概念
![tree](/tree.png)
- 树的层次计算规则：根结点所在的那一层记为第一层，其子结点所在的就是第二层，以此类推。
- 结点和树的“高度”计算规则：叶子结点高度记为1，每向上一层高度就加1，逐层向上累加至目标结点时，所得到的的值就是目标结点的高度。树中结点的最大高度，称为“树的高度”。
- “度”的概念：一个结点开叉出去多少个子树，被记为结点的“度”。比如我们上图中，根结点的“度”就是3。
- “叶子结点”：叶子结点就是度为0的结点。在上图中，最后一层的结点的度全部为0，所以这一层的结点都是叶子结点。
## 二叉树
二叉树是指满足以下要求的树
- 它可以没有根结点，作为一棵空树存在
- 如果它不是空树，那么必须由根结点、左子树和右子树组成，且左右子树都是二叉树
- 二叉树中，左右子树的位置是严格约定、不能交换的

## 二叉树的编码实现
1.新建一个二叉树结点
```
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}
const node  = new TreeNode(1)
```
2.通过给 left/right 赋值拓展其子树信息，延展出一棵二叉树

![binarytree](/binarytree.png)

## 二叉树的遍历
- 先序遍历(根结点 -> 左子树 -> 右子树)
- 中序遍历(左子树 -> 根结点 -> 右子树)
- 后序遍历(左子树 -> 右子树 -> 根结点)
- 层次遍历(从上到下，从左到右依次访问二叉树的每个结点)

```
// 先序遍历
function preorder(tree){
    if(!tree)return
    console.log(tree.val) // 根结点
    preorder(tree.left) // 左子树
    preorder(tree.right) // 右子树
}
```
“先”、“中”、“后”其实就是指根结点的遍历时机

### 层次遍历
1. BFS广度优先搜索
借用一个辅助数据结构即队列来实现，先进先出
```
var levelOrder = function(root) {
    let res=[]
    if(!root) return res
    let queue=[root]
    while(queue.length){
        let arr=[]
        let len=queue.length
        for(let i=0;i<len;i++){
            let node=queue.shift()
            arr.push(node.val)
            node.left&&queue.push(node.left)
            node.right&&queue.push(node.right)
        }
        res.push(arr)
    }
    return res
};
```
2. DFS（深度优先搜索）
借用栈结构来实现，栈先进后出
```
var DFS = function(root) {
    let res=[]
    if(!root) return res
    let stack= [root]
    while(stack.length){
        const node = stack.pop();
        res.push(node.val);
        node.right&&stack.push(node.right)
        node.left&&stack.push(node.left)
    }
    return res
}
```

