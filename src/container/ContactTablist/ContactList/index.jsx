import React, { Component } from 'react'

import './index.less'
export default class ContactList extends Component {
    render() {
        let {list} = this.props
        return (
            <ul className="contact-list">
                {
                    list.map(item => {
                        return (
                            <li className="contact-item" 
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
