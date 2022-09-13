import React, {useState,useEffect} from 'react'
import { Button } from 'antd'

export default function UseEffect() {
  let [num,setNum] = useState(1)

  let [info,setinfo] = useState('测试') 

  // useEffect(() => {
  //   console.log('测试第二个参数不传时的执行时机,第二个参数不传的时候只要重新渲染就会执行')
  // })

  // useEffect(() => {
  //   console.log('第二个参数传空数组的可以模拟类式组件的componentDidMount和componentWillUnmount')
  //   console.log('类似于类式组件的componentDidMount')
  //   return () => {
  //     console.log('类似于类式组件的componentWillMount,组件卸载时调用')
  //   }
  // },[])
  useEffect(() => {
    console.log('监听info属性的变化')
    return () => {
      console.log('取消一些副作用的监听***,刚渲染不执行，第二次渲染的时候会先执行这里即取消副作用')
    }
  },[info])
  return (
    <>
      <div>{num}</div>
      <Button  onClick={() => {setNum(num + 1)}}>点我加一</Button>

      <h1>{info}</h1>
      <Button  onClick={() => {setinfo(info + '*')}}>点我加*</Button>
    </>
  )
}
