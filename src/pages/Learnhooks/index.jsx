import React from 'react'
import LearnUseState from '../../components/LearnHooks/UseState'
import LearnUseContext from '../../components/LearnHooks/UseContext'

export default function Learnhooks() {
  return (
    <>
      {/* useState  hook的相关使用 */}
      <LearnUseState num={100}/>

      {/* UseContext hook的相关使用 */}
      <LearnUseContext />
    </>
  )
}
