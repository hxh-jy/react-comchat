import React,{useState} from 'react'

import Child from './Child'

import { Button } from 'antd'
export default function ReactMemo() {
 let [count,setCount] = useState(0)
 let [num] = useState(1000)
  return (
    <>
        <h1>{count}</h1>
        <Button type='primary' onClick={() => setCount(count + 1)}> 更新count </Button>
        <Child num={num}/>
    </>
  )
}
