import React from 'react'
import LearnUseState from '../../components/LearnHooks/UseState'
import LearnUseContext from '../../components/LearnHooks/UseContext'
import LearnUseEffect from '../../components/LearnHooks/UseEffect'

export default function Learnhooks() {
  return (
    <>
      <br />
      <h1>———————————useState  hook的相关使用 ——————————</h1>
      <LearnUseState num={100}/>
      
      <br />
      <h1>———————————UseContext hook的相关使用 ——————————</h1>
      <LearnUseContext />

      <br />
      <h1>———————————UseEffect  hook的使用——————————</h1>
      <LearnUseEffect />
    </>
  )
}
