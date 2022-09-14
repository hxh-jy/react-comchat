import React,{ useState,useMemo  } from 'react'

import { Button } from 'antd'

export default function UseMemo() {
    let [a,setA] = useState(0)
    let [b,setB] = useState(0)
    let [c,setC] = useState(0)
    let handleBtn = (type) => {
        switch(type) {
            case 'a':
                setA(a + 1);
                break;
            case 'b':
                setB(b + 2);
                break;
            case 'c':
                setC(c + 3)
                break
            default:
                return false
        }
    }
    let sum = useMemo(() => {
        console.log('useMemo*******')
        return (
            <>
                <p style={{backgroundColor: 'orange'}}>a和b的求和为: {a + b}</p>
            </>
        )
    },[a,b])
  return (
    <>
        <h1>A: {a}</h1>
        <h1>B: {b}</h1>
        <h1>C: {c}</h1>
        <h1>sum: {sum}</h1>

        <Button type='primary' onClick={() => handleBtn('a')}>修改A值</Button>
        <Button type='primary' onClick={() => handleBtn('b')}>修改B值</Button>
        <Button type="dashed" onClick={() => handleBtn('c')}>修改C值</Button>
    </>
  )
}
