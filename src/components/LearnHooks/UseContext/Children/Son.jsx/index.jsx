import React,{useContext} from 'react'
import {themeContext} from '../../context'
export default function Son() {

  let bgc = useContext(themeContext)
  return (
    <>
        <div style={bgc}>我是孙子组件，用了模拟获取爷爷组件中传递过来的context的值</div>
    </>
  )
}
