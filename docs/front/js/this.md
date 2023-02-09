# this
```
function foo() {
  console.log(this.a)
}
var a = 1
foo()
const obj = {
  a: 2,
  foo
}
obj.foo()
const c = new foo()
```
- 对于直接调用 foo 来说，不管 foo 函数被放在了什么地方，this 一定是 window
- 对于 obj.foo() 来说，我们只需要记住，谁调用了函数，谁就是 this，所以在这个场景下 foo 函数中的 this 就是 obj 对象
- 对于 new 的方式来说，this 被永远绑定在了 c 上面，不会被任何方式改变 this
以上三种规则基本覆盖大部分情况了

## 箭头函数中的this
```
function a() {
  return () => {
    return () => {
      console.log(this)
    }
  }
}
console.log(a()()())
```
首先箭头函数其实是没有 this 的 , 所以此时的 this 是 window
## bind 这些改变上下文的 API 
this 取决于第一个参数，如果第一个参数为空，那么就是 window
```
let a = {}
let fn = function () { console.log(this) }
fn.bind().bind(a)() // => ?
```
等同于
```
// fn.bind().bind(a) 等于
let fn2 = function fn1() {
  return function() {
    return fn.apply()
  }.apply(a)
}
fn2()
```
fn 中的 this 永远由第一次 bind 决定，所以结果永远是 window
> new 的方式优先级最高，接下来是 bind 这些函数，然后是 obj.foo() 这种调用方式，最后是 foo 这种调用方式，同时，箭头函数的 this 一旦被绑定，就不会再被任何方式所改变。

