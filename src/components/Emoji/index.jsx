import React, { Component } from 'react'

import  {qq_faceList} from '../../assets/js/qq_face'
import './index.less'
export default class Emoji extends Component {
    handleEmoji(item) {
        let {getEmoji} = this.props
        getEmoji(item,false)
        console.log('我被点击勒',item)
    }
    render() {
        return (
            <div  className="emoji">
                <ul>
                    {   qq_faceList.map((item,index) => {
                        return (
                            <li className='qqFace' 
                                onClick={e => this.handleEmoji(item,e)}
                                key={item}
                                style={{backgroundPosition: ` ${-(index%15)*29}px ${-(Math.floor(index/15))*29}px`}}>
                            </li>
                        )
                    })
                    }
                </ul>
            </div>
        )
    }
}
