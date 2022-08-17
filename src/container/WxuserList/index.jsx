import React, { Component } from 'react'

import './index.less'
export default class WxuserList extends Component {
    state = {wxuserList: [],currentWxuser: {}}
    async componentDidMount() {
        let wxuserList = await this.api.getOnlineWxUserList()
        this.setState({wxuserList})
    }
    handleCurWxuser(item,e) {
        this.setState({currentWxuser: item})
    }
    render() {
        let {wxuserList,currentWxuser} = this.state
        return (
            <ul className="wxlist-container">
                {
                    wxuserList.map((item,key) => {
                        return (
                            <li onClick={e => this.handleCurWxuser(item,e)} className={["wxlist-item",currentWxuser.WxId === item.WxId ? 'active' : ''].join(' ')} key={item.WxId}>
                                <img className="avatar" src={item.Avatar} alt={item.UserName} />
                                <div  className="user-info">
                                    <div className="username">{item.userName || item.UserName}</div>
                                    <div className="corpname">{item.corpName || item.CorpName}</div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}
