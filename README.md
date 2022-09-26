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