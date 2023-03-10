# 算法
* 算法（Algorithm）是指用来操作数据、解决程序问题的一组方法。
* 算法所占用的「时间」和「空间」两个维度去考量算法的好坏
* 最坏不能超过平方阶O(n²) 
## 时间复杂度
时间复杂度是指执行当前算法所消耗的时间
常见的时间复杂度量级有：
- 常数阶O(1)
- 对数阶O(logN)
- 线性阶O(n)
- 线性对数阶O(nlogN)
- 平方阶O(n²)
- 立方阶O(n³)
- K次方阶O(n^k)
- 指数阶(2^n)
## 空间复杂度
空间复杂度是对一个算法在运行过程中临时占用存储空间大小的量度。
空间复杂度比较常用的有
- 常数阶O(1)
- 线性阶O(n)
- 平方阶O(n²)

## 二者关系
时间复杂度和空间复杂度往往是相互影响的。
- 当追求一个较好的时间复杂度时，可能会使空间复杂度的性能变差，即可能导致占用较多的存储空间
- 当追求一个较好的空间复杂度时，可能会使时间复杂度的性能变差，即可能导致占用较长的运行时间