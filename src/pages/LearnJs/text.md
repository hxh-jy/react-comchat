**面试中常见**
+ Number Array String 等新增的方法


+ Array 长度为100值为1 的数组快速实现  （此处实现4中方式）
    - new Array(100).fill(1)
    -  [...Array(100)].map(item => 1)
    -  Array.from将类数组转换为数组,可接收三个参数，后边两个是可选的，第一个是要转换的类数组对象，第二个参数是新数组中的每个元素会执行该回调函数。
        * 伪数组对象（拥有一个 length 属性和若干索引属性的任意对象）
        * Array.from({length: 100},(item,index) => item = 1)  
        * Array.from({length: 100}).map(item => item = 1)

+ 可选链操作符(?.)
    - // 不使用?.
        let baz = obj && obj.foo && obj.foo.bar && obj.foo.bar.baz;
    - // 使用?.
        let baz = obj?.foo?.bar?.baz; // 结果：42

+ 防抖、节流
    - 防抖： 触发高频事件后 n 秒内函数只会执行一次，如果 n 秒内高频事件再次被触发，则重新计算时间
    - 节流： 高频事件触发，但在 n 秒内只会执行一次，所以节流会稀释函数的执行频率

+ 如何实现一个简单的 Promise
    - Promise 对象用于表示一个异步操作的最终完成（或失败）及其结果值。
    - 基本特征
        * 三状态（pending、fulfilled、rejected）
        * new promise时需要传入一个执行器，执行器接收两个参数（resolve、reject）
        * 有一个value用于保存成功时的值
        * 有一个reason保存失败状态的值
        * 状态只能从pending到rejected，或者从pending到fulfilled，一旦确定不能改变
        * 必须有一个then方法，接收两个参数，分别为成功时的回调onFulfilled和失败时的回调onRejected
        * 如果调用 then 时，promise 已经成功，则执行onFulfilled，参数是promise的value；
        * 如果调用 then 时，promise 已经失败，那么执行onRejected, 参数是promise的reason；
        * 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个 then 的失败的回调onRejected；
