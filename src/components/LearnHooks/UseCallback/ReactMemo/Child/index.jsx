import React from 'react'

function Child({num}) {
    console.log('我是子组件，更新*******')
  return (
    <>
        <h2>我是子组件: {num}</h2>
        <div>Child</div>
    </>
  )
}
export default React.memo(Child)