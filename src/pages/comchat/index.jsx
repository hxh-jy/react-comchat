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
        if (userInfo.code === 0) {
            saveUserinfo(userInfo.data)
        } else if (userInfo.code === 401) {
            console.log('token失效， 跳转到测试页面')
            this.props.history.push('/reacthooks')
        }
    }
    render() {
        let {currentContactuser} = this.props
        return (
            <div className="comchat">
                <div className="wxuser-list"><WxuserList /></div>
                <div className="contact-tablist"><ContactTabList /></div>
               {    currentContactuser && Object.keys(currentContactuser).length > 0 ?
                    <div className="chat-dialog"><ChatDialog /></div> : ''
               }
            </div>
        )
    }
}
export default connect(
    state => ({
        currentContactuser: state.currentContactuser
    }),
    {
        saveUserinfo
    }
)(ComChat)