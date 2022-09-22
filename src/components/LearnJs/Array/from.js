// 可以接收两个参数，将类似数组转为真正的数组  第二个参数类似于数组的map方法用来对每个元素进行处理，将处理后的值放入返回的数组

// 原生具备 Iterator 接口的数据结构如下。该数据结构可以遍历  对于原生部署 Iterator 接口的数据结构，不用自己写遍历器生成函数，for…of循环会自动遍历它们。
Array
Map
Set
String
TypedArray

// 类似数组对象 任何有length属性的对象，都可以通过Array.from()方法转为数组
Array.from({ length: 3 });

// 只要是部署了 Iterator 接口的数据结构，Array.from()都能将其转为数组。(set、map、字符串)
Array.from('hello')
// ['h', 'e', 'l', 'l', 'o']

let namesSet = new Set(['a', 'b'])
Array.from(namesSet) // ['a', 'b']