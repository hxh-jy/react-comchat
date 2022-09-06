  **hook的好处**
+ hook的使用注意事项
  - hook不能够在类组件中使用
  - hook只能在最外层的函数中调用，不能在循环、条件判断或者子函数中调用
   * 因为react要知道哪个state对应的哪个useState靠的是Hook的调用顺序，而循环、条件判断或者子函数中调用会打断这种调用顺序
  - hook只能在react函数组件中调用的，不可以在其他js函数中调用

+ useState Hook的使用
  - const [count, setCount] = useState(initState)
   * 该方法的返回值是当前的state及更新state的函数setState
   * 更新的state如果比较简单的话可以直接更新，但是如果比较复杂的话需要传入一个箭头函数去更新
  - 初始化state的理解
    * 惰性state
      初始化的initState  参数指挥在组件的初始化渲染中起作用，后续的渲染使用的是更新后的state
  - 复杂初始state的定义
    * 初始state需要通过复杂的计算获得时，则可以传入一个函数，在函数中计算并返回需要的值
  **注意：如果更新的数据与上次一样，react的函数式组件将跳过子组件的渲染及effect的执行，但是类式组件只要调用了setState，不论state有没有变都会执行**  

+ useContext Hook的使用
  - 在需要传递值的组件中通过如下方式
   * let newContext = React.createContext('要传递的数据')
   * <newContext.Provider value={'要传递的数据'}></newContext.Provider>
  - 在需要接收值的组件中通过如下方式
   * import {useContext} from 'react'
   * let value = useContext(newContext)  
   * newContext指的是你最初创建的context，需要引入


+ useEffect Hook的使用
  - 执行时机
    * 在完成DOM更新后会执行，默认情况下，react会在每次渲染后调用包括在第一次渲染的时候
  - 接收的参数
    * 第一个参数是一个回调函数(副作用的处理函数)，第二个参数是与该副作用相关联的状态或者属性以来组，可以传也可以不传
    * useEffect 可以在组件渲染后实现各种不同的副作用。有些副作用可能需要清除，所以需要在第一个回调函数中返回一个函数用于清除一些副作用
    * 当第二个参数传的时候必须以数组的形式传过去，传空数组的时候可以模拟class类组件的componentDidMount和componentWillUnmount,给数组中传递一个属性时可以监听该属性的变化然后进行一些操作类似于类式组件的componentDidUpdate




+ useCallback Hook的使用
  - 配合React.memo()使用
    * React.memo()是一个高阶函数
    * 如果有一个显示时间的组件,每一秒都会重新渲染一次，对于其Child子组件我们肯定不希望也跟着渲染，所以类式组件用到PureComponent(eg: class Time extends React.PureComponent);而函数式组件就可以在导出时用: React.memo('函数组件名')
    * React.memo()可以满足创建纯函数而不是一个类的需求
    * React.memo()可接受2个参数，第一个参数为纯函数的组件，第二个参数用于对比props控制是否刷新
  - useCallback 用来返回一个函数
    * 返回的函数a会根据b的变化而变化，如果b始终未发生变化，a也不会重新生成，避免函数在不必要的情况下更新。
    * 记得子组件导出时使用memo包裹一下，其作用是对组件前后两次进行浅对比，阻止不必要的更新
    * const a = useCallback(() => {
        return function() {
          console.log(b)
        }
      },[b])
    * 作用：减少了组件间不必要的更新。

+ useReducer Hook的使用
