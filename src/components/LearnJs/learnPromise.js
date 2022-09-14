// https://zhuanlan.zhihu.com/p/183801144  promise手写实现网站

const PENDING = 'PENDING'
const FUFILLED = 'FUFILLED'
const REJECTED = 'REJECTED'
class Promise {
    constructor(executor) {
        this.value = undefined
        this.reason = undefined
        this.status = PENDING

        // 存放成功的回调
        this.onResolvedCallbacks = [];
        // 存放失败的回调
        this.onRejectedCallbacks= [];
        
        let resolve = value => {
            if (this.status === PENDING) {
                this.value = value
                this.status = FUFILLED
                // 依次将对应的函数执行
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        }

        let reject = reason => {
            if (this.status === PENDING) {
                this.reason = reason
                this.status = REJECTED
                // 依次将对应的函数执行
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }

        try {
            executor(resolve,reject)
        } catch (err) {
            reject(err)
        }
    }

    then(OnFufilled,OnRejected){
        if (this.status === FUFILLED) {
            OnFufilled(this.value)
        } else if (this.status === REJECTED) {
            OnRejected(this.reason)
        } else if (this.status === PENDING) {
            this.onResolvedCallbacks.push(() => {
                OnFufilled(this.value)
            })
            this.onResolvedCallbacks.push(() => {
                OnRejected(this.reason)
            })
        }
    }
}

let promise = new Promise((res,rej) => {
    setTimeout(() => {
        res('成功测试冲突')
    },1000)
}).then(res => {
    console.log(res)
},rej => {
    console.log(rej)
})