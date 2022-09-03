import React, { Component } from 'react'
import { Button } from 'antd';
import './index.less'
export default class Toast extends Component {
    // getContactTopRequest getCancelContactTopRequest
    contactTopRequest = (user) => {
        let params = {
            WxId: `${user.WxId}`,
            ContactUserId: `${user.ContactUserId}`,
        }
        this.api.getContactTopRequest(params)
    }
    cancelContactTopRequest = (user) => {
        let params = {
            WxId: `${user.WxId}`,
            ContactUserId: `${user.ContactUserId}`,
        }
        this.api.getContactTopRequest(params)
    }
    handleTop = () => {
        let {currentUser: user} = this.props
        console.log('处理置顶和非置顶客户',this.props)
        // isOnTop === 1代表当前联系人不属于置顶联系人, 点击时进行置顶操作
        if (user.isOnTop === 1) {
            user.isOnTop = 0
            this.contactTopRequest(user)
        } else {
            user.isOnTop = 1
            this.cancelContactTopRequest(user)
        }
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
