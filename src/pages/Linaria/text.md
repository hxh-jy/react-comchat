将 CSS 纳入到 JS 体系中，并且这种支持是零成本的！  CSS 相关代码会在编译期被抽出到 CSS 文件中
类 Sass 的 CSS 的语法
通过使用 CSS 变量，Linaria 支持快速创建动态属性的 React 样式组件
使用 CSS sourcemaps 易于定位样式位置
支持 stylint
不再需要预处理器，可以使用 JavaScript 控制 CSS 的逻辑
但是支持使用预处理器，比如 Sass 或 PostCSS

**使用步骤及规则**
 + 步骤
    - npm install styled-components
    - import styled from 'styled-components'
    - const BackStyle = styled.div``
+ 规则
    - css in js中写的写法形式，跟less scss基本一样，可以嵌套，可以使用伪元素 伪类等等。
    - 需要熟知less和sass语法
    - props穿透
    - 中文官网： https://www.cnblogs.com/kaiqinzhang/p/9972053.html