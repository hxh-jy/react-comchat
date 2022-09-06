import React from 'react'
import { useRef } from 'react'
import { useState } from 'react'

export default function UseRef() {
  let [userName,setUserName] = useState('')
  let ipVal = useRef()

  let handleClick = () => {
    console.log('测试',ipVal.current.value)
    setUserName(ipVal.current.value)
  }
  return (
    <>
      {/* 非受控组件。受控组件指的是输入框有onChange事件 */}
      <input type="text" style={{backgroundColor: '#eee'}} value={userName} ref={ipVal} onInput={handleClick}/>
    </>
  )
}
