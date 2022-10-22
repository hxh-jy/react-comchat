import React from 'react'
import styled,{css} from 'styled-components'
let bd = css `
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.3);
`
let BgcStyle = styled.ul`
    display: flex;
    li {
        display: flex;
        position: relative;
        width: 160px;
        align-items: center;
        justify-content: center;
        list-style: none;
        margin-right: 6px;
        height: 120px;
        background: rgba(0,0,0,0.3) url('https://cdn.ourplay.net/xspace/news/planet-banner-more.png');
        background-repeat: no-repeat;
        background-size: 100%;
        .text {
            display: -webkit-box;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            padding: 0 6px;
            z-index: 99;
            font-size: ${props => props.size}px;
            color: #fff;
        }
        .bd {
            ${bd}
        }
    }
`

export default function Linaria() {
    let list = [
        {
            id: 1,intro: '两行文字在注两行文字在注两行文字在注两行文字在注两行文字在注释内容的开始和结尾分别使用三个单引号在注释内容的开始和结尾分别使用三个单引号'
        },
        {
            id: 2,intro: '两行'
        },
        {
            id: 3,intro: '两行文字在注两行文字在注两行文字在注两行文字在注两行文字在注释内容的开始和结尾分别使用三个单引号在注释内容的开始和结尾分别使用三个单引号'
        }
    ]
    console.log('测试',list && list.length > 0)
    return (
        <div>
            <BgcStyle size={16}>
                {
                    list && list.length > 0 ?
                    list.map(item => {
                        return (
                            <li key={item.id}>
                                <div className='text'>{item.intro}</div>
                                <div className='bd'></div>
                            </li>
                        )
                    })
                    : '加载中'
                }
            </BgcStyle>
        </div>
    )
}
