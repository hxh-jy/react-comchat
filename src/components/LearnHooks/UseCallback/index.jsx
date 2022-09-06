import React,{useState,useCallback} from 'react'

import { Button } from 'antd'
import Child from './Child'
export default function LearnuseCallback() {
  let [count,setCount] = useState(0)

  let test = useCallback(() => {
    console.log('useCallback的使用',count)
  },[count])
  return (
    <>
      <h1>{count}</h1>
      <Button onClick={() => setCount(count + 1)}>点我加一</Button>
      <Button onClick={test}>测试useCallback</Button>
      <Child count={count}/>
    </>
  )
}
