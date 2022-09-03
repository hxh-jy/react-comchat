+ hook的好处
+ hook的使用注意事项
 - hook不能够在类组件中使用
 - hook只能在最外层的函数中调用，不能在循环、条件判断或者子函数中调用
   * 因为react要知道哪个state对应的哪个useState靠的是Hook的调用顺序，而循环、条件判断或者子函数中调用会打断这种调用顺序
 - hook只能在react函数组件中调用的，不可以在其他js函数中调用
+ useState Hook的使用
 - const [count, setCount] = useState(initState)
 - 该方法的返回值是当前的state及更新state的函数setState
 - 更新的state如果比较简单的话可以直接更新，但是如果比较复杂的话需要传入一个箭头函数去更新
+  初始化state的理解
 - 惰性state
    初始化的initState  参数指挥在组件的初始化渲染中起作用，后续的渲染使用的是更新后的state
  - 复杂初始state的定义
    初始state需要通过复杂的计算获得时，则可以传入一个函数，在函数中计算并返回需要的值
  **注意：如果更新的数据与上次一样，react的函数式组件将跳过子组件的渲染及effect的执行，但是类式组件只要调用了setState，不论state有没有变都会执行**  
+ useEffect Hook的使用

