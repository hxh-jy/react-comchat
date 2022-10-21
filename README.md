# react项目遇到的问题总结
+ 涉及redux的操作都在根目录下的container文件夹下，注意容器组件和UI组件的分离
+ 可以在根目录下创建api文件用于统一请求接口，也可以在action中进行异步请求
    - https://blog.csdn.net/liaorihua/article/details/123478851
    - 在index.js中通过
        Component.prototype.api = api
        这种方式可以在类式组件中通过this.api统一访问接口，但不适用于函数式组件
+ React添加多个类名  通过数组的方式添加
    - eg: className={["wxlist-item",'active'].join(' ')}

# 用到的技术栈
+ redux + react-redux + react-router-dom + antd + axios


# 欠缺的知识点
 + 熟悉ajax + webpack技术 + 单点登录原理 + nginx配置 + babel + node.js + http + es6

# css-in-js
 + 如果是进行基础组件的开发，那么使用“有规范约束”的原生css（比如遵守BEM规范的css），或者less之类的预处理语言会比较合适，这能最大幅度地减小组件库的体积，也能为业务方提供样式覆盖的能力。
 + 如果是进行业务开发，个人比较推荐css-in-js的方案，因为它不仅能够做到在组件中直接编写css，同时也能够直接使用组件中的js变量，能有效解决“组件样式随着数据变化”的问题。另外，在业务开发中，由于迭代速度快，开发人员流动性相对大一些，我们直接使用规范对css进行约束会有一定的风险，当项目规模逐渐变大后代码的可读性会很差，也会出现css互相影响的情况。