import React, { Component } from 'react'
import {connect} from 'react-redux'

import ChatDialog from '../../container/ChatDialog'
import ContactTabList from '../../container/ContactTablist'
import WxuserList from '../../container/WxuserList'
import {saveUserinfo} from '../../redux/actions/commonInfo'
import './index.less'
class ComChat extends Component {
    async componentDidMount() {
        let userInfo = await this.api.getUserInfo()
        console.log('获取用户信息',userInfo)
        if (userInfo.code === 0) {
            console.log('获取信息成功')
            saveUserinfo(userInfo.data)
        } else if (userInfo.code === 401) {
            console.log('token失效， 跳转到测试页面')
            this.props.history.push('/test')
        }
    }
    render() {
        return (
            <div className="comchat">
                <div className="wxuser-list"><WxuserList /></div>
                <div className="contact-tablist"><ContactTabList /></div>
                <div className="chat-dialog"><ChatDialog /></div>
            </div>
        )
    }
}
export default connect(
    state => ({}),
    {
        saveUserinfo
    }
)(ComChat)