import React from 'react'
import LearnUseState from '../../components/LearnHooks/UseState'
import LearnUseEffect from '../../components/LearnHooks/UseEffect'

export default function Learnhooks() {

  return (
    <>
      {/* useState  hook的相关使用 */}
      <LearnUseState num={100}/>

      {/* useEffect hook的相关使用 */}
      <LearnUseEffect />
    </>
  )
}
