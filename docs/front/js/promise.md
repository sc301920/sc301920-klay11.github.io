# Promise
## 异步处理的通用模型
1. ES6 将某一件可能发生异步操作的事情，分为两个阶段：unsettled 和 settled
2. ES6 将事情划分为三种状态： pending、resolved、rejected
    - pending: 挂起，处于未决阶段
    - resolved：已处理，已决阶段的一种状态
    - rejected：已拒绝，已决阶段的一种状态
3. 当事情达到已决阶段后，通常需要进行后续处理，不同的已决状态，决定了不同的后续处理
    - resolved 状态：这是一个正常的已决状态，后续处理表示为 thenable
    - rejected 状态：这是一个非正常的已决状态，后续处理表示为 catchable
整件事称之为 Promise

## Promises/A+ 规范
- then方法本身会返回一个新的Promise对象，返回一个新的Promise以后它就有自己的then方法，这样就能实现无限的链式
- 不论 promise1 被 resolve()  还是被 reject() 时 promise2 都会执行 Promise 解决过程：[[Resolve]](promise2, x)
Promise 解决过程就是对resolve()、reject() 进行改造增强， 针对resolve()和reject()中不同值情况 进行处理
```
class myPromise{
    static PENDING='pending'
    static RESOLVED='resolved'
    static REJECTED='rejected'
    constructor(fnc){
        this.PromiseState = PENDING
        this.PromiseResult = null
        this.onfulList = []
        this.onRejectList = []
        try{
            fnc(this.resolve.bind(this), this.reject.bind(this))
        }catch(err){
            this.reject(err)
        }
    }
    resolve(v){
        if(this.PromiseState = PENDING){
            this.PromiseState = RESOLVED
            this.PromiseResult = v
            this.onfulList.forEach(c=>{
                c(v)
            })
        }
    }
    reject(v){
        if(this.PromiseState = PENDING){
            this.PromiseState = REJECTED
            this.PromiseResult = v
            this.onRejectList.forEach(c=>{
                c(v)
            })
        }
    }
    // 简单版
    // then(onful, onReject){
    //     onful = typeof onful === 'function'? onful: v=>v
    //     onReject = typeof onReject === 'function'? onReject: (err)=>{
    //         throw err
    //     }
    //     if(this.PromiseState = PENDING){
    //         this.onfulList.push(()=>{
    //             setTimeout(() => {
    //                 onful(this.PromiseResult);
    //             })
    //         })
    //         this.onRejectList.push(()=>{
    //             setTimeout(() => {
    //                 onReject(this.PromiseResult);
    //             })
    //         })
    //     }
    //     if(this.PromiseState = RESOLVED){
    //         setTimeout(() => {
    //             onful(this.PromiseResult);
    //         })
    //     }
    //     if(this.PromiseState = REJECTED){
    //         setTimeout(() => {
    //             onReject(this.PromiseResult);
    //         })
    //     }
    // }
    // 符合 Promise/A+ 规范
    then(onFulfilled, onRejected) {
        const promise2 = new myPromise((resolve, reject) => {
            if (this.PromiseState === myPromise.FULFILLED) {
                setTimeout(()=>{
                    try{
                        if(typeof onFulfilled !=='function'){
                            resolve(this.PromiseResult)
                        }else{
                            let x = onFulfilled(this.PromiseResult)
                            resolvePromise(promise2, x, resolve, reject)
                        }
                    }catch(e){
                        reject(e)
                    }
                })
            }
            if(this.PromiseState==myPromise.REJECTED){
                setTimeout(()=>{
                    try{
                        if(typeof onRejected!=='function'){
                            reject(this.PromiseResult)
                        }else{
                            let x = onRejected(this.PromiseResult)
                            resolvePromise(promise2, x, resolve, reject)
                        }
                    }catch(e){
                        reject(e)
                    }
                })
            }
            if(this.PromiseState === myPromise.PENDING){
                this.onfulList.push(() => {
                    setTimeout(()=>{
                        try {
                            if (typeof onFulfilled !== 'function') {
                                resolve(this.PromiseResult);
                            } else {
                                let x = onFulfilled(this.PromiseResult);
                                resolvePromise(promise2, x, resolve, reject);
                            }
                        } catch (e) {
                            reject(e);
                        }
                    })
                })
                this.onRejectList.push(()=>{
                    setTimeout(()=>{
                        try{
                            if(typeof onRejected!=='function'){
                                reject(this.PromiseResult)
                            }else{
                                let x = onRejected(this.PromiseResult)
                                resolvePromise(promise2, x, resolve, reject)
                            }
                        }catch(e){
                            reject(e)
                        }
                    })
                })
            }
        })
        function resolvePromise(promise2, x, resolve, reject){
            if(x==promise2){
                throw new TypeError('Chaining cycle detected for promise');
            }
            if(x instanceof myPromise){
                x.then(y=>{
                    resolvePromise(promise2, y, resolve, reject)
                }, reject)
            }
            if(x!==null&&(typeof x === 'object'|| typeof x == 'function')){
                try {
                    var then = x.then
                }catch(e){
                    return reject(e);
                }
                if (typeof then === 'function') {
                    let called = false; 
                    try{
                        then.call(x, y=>{
                            if(called) return
                            called = true
                            resolvePromise(promise2, y, resolve, reject)
                        }, r=>{
                            if(called) return
                            called = true
                            reject(r)
                        })
                    }catch(e){
                        if(called) return
                        called = true
                        reject(r)
                    }
                }else{
                    resolve(x)
                }
            }else{
                resolve(x)
            }
        }
        return promise2
    }
}
```