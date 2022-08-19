import React, { Component } from 'react'

import { connect } from 'react-redux'
import {saveCurrentContactuser} from '../../../redux/actions/commonInfo'
import './index.less'
class ContactList extends Component {
    handleCurUser(item,e) {
        this.props.saveCurrentContactuser(item)
    }
    render() {
        let {list,currentContactuser} = this.props
        return (
            <ul className="contact-list">
                {
                    list.map(item => {
                        return (
                            <li 
                                onClick={(e) => this.handleCurUser(item,e)} 
                                className={["contact-item",item.ConversationId === currentContactuser.ConversationId  && item.WxId === currentContactuser.WxId ? 'active' : ''].join(' ')}
                                key={item.ConversationId + Math.random()}>
                                {
                                   item.Avatar ? <img src={item.Avatar} alt={item.UserName} /> : <img src='https://cdn.ourplay.net/xspace/headimage/1647242291211111.jpg' alt={item.NickName} />
                                }
                                <div className="user-info">
                                    <span className="user-name">{item.UserName || item.NickName}</span>
                                    {
                                        item.IsDelete === 0 ? (<span className="flud">流失</span> ): ''  ||
                                        item.CurrentReceiptionStatus === 0 ? (<span className="flud">接待</span>) : ''
                                    }
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}
export default connect(
    state => ({
        currentContactuser: state.currentContactuser
    }),
    {
        saveCurrentContactuser
    }
)(ContactList)