import React, { useState }  from 'react'
import { Button } from 'antd'
export default function Learnhooks(props) {
  // 数组的结构
  let [count,setCount] = useState(0)
  let [info,setInfo] = useState({
    name: '张三',age: 23,sex: 'female'
  })

  let [num] = useState(() => {
    if (props.num < 100) {
      return props.num + 1
    } else {
      return props.num + 100
    }
  })

  let handleCount = () => {
    setCount(() => {
        if (count % 2 !== 0) {
            return count + 2
        } else {
            return count + 1
        }
    })
  }

  let handleClick = () => {
    setInfo(() => {
      return {
        ...info,
        age: 38
      }
    })
  }
  return (
    <>
      <h1>useState相关学习的操作</h1>
      <div>当前count的值为{count}</div>
      {/* <button onClick={() => setCount(count + 1)}>点我加一</button> */}
      <Button type='success' onClick={handleCount}>奇数加2，偶数加1</Button>
      <br />
      <h2>初始化state时传入一个函数的使用: {num}</h2>
      <br />
      <div>当前用户的姓名:{info.name}----年龄: {info.age}----性别: {info.sex}</div>
      <Button onClick={handleClick} type='primary'>点我修改当前用户的年龄</Button>
      <h2>--------------useEffect相关的学习----------------</h2>
    </>
  )
}
