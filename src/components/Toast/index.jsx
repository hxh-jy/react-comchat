import React, { Component } from 'react'
import { Button } from 'antd';
import './index.less'
export default class Toast extends Component {
    handleTop = () => {
        console.log('处理置顶和非置顶客户',this.props)
    }
    render() {
        let {currentUser} = this.props
        console.log('获取用户当前的状态',currentUser)
        return (
            <div className="toast">
                {
                    currentUser.isOnTop === 1 ? 
                    <Button className="set-top" type="primary" onClick={this.handleTop}>置顶</Button> : 
                    <Button className="set-top" type="primary">取消置顶</Button>
                }
            </div>
        )
    }
}
