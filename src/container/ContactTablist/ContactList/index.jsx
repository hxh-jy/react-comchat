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
                            <li className="contact-item" key={item.ContactUserId}>
                                <img src={item.Avatar} alt={item.UserName} />
                                <div className="user-info">
                                    <span className="user-name">{item.UserName}</span>
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
