import React from 'react'
import Child from '../../../components/LearnHooks/UseContext/Children/Child.jsx'
import { themeContext,theme } from './context'
export default function UseContext() {
  return (
    <>
      <span style={theme.light}>我是爷爷组件，我负责给后边组件传递一个值</span>
      <themeContext.Provider value={theme.dark}>
        <Child />
      </themeContext.Provider>
    </>
  )
}
