import React from 'react'
import Child from '../../../components/LearnHooks/UseContext/Children/Child.jsx'
import { themeContext,theme } from './context'
export default function UseContext() {
  return (
    <>
      <h1 style={theme.light}>我是爷爷组件，我负责给后边组件传递一个值</h1>
      <themeContext.Provider value={theme.dark}>
        <Child />
      </themeContext.Provider>
    </>
  )
}
