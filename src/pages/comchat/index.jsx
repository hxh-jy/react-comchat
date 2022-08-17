import React, { Component } from 'react'

import ChatDialog from '../../container/ChatDialog'
import ContactTabList from '../../container/ContactTablist'
import WxuserList from '../../container/WxuserList'

import './index.less'
export default class ComChat extends Component {
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
