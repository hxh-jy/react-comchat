import React from 'react'

function Child({count}) {
    console.log('我是子组件，更新*******')
  return (
    <>
      <h1>我是子组件{count}</h1>
        <div>Child</div>
    </>
  )
}
export default React.memo(Child)