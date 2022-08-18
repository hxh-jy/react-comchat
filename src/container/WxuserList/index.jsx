import React, { Component } from 'react'

import { connect } from 'react-redux'
import {saveCurrentWxuser,saveAllContactlist,saveWxuserlist} from '../../redux/actions/wxUser'
import './index.less'

class WxuserList extends Component {
    state = {currentWxuser: {}}
    
    getAllContactList = (WxIds) => {
        let contactlistParams = {
            LastTimestamp: 1,
            WxIds,
            pageIndex: 1,
            pageSize: 100
        }
        return this.api.getAllContactList(contactlistParams)
    }
    async handleCurWxuser(item,e) {
        if (this.props.currentWxuser && this.props.currentWxuser.WxId) {
            if (this.props.currentWxuser.WxId !== item.WxId) {
                this.setState({currentWxuser: item})
                this.props.saveCurrentWxuser(item)
                let AllContactlist = await this.getAllContactList([item.WxId])
                this.props.saveAllContactlist(AllContactlist)
            } else {
                this.setState({currentWxuser: {}})
                this.props.saveCurrentWxuser({})
                let WxIds = this.props.wxuserList.map(item => item.WxId)
                let AllContactlist = await this.getAllContactList(WxIds)
                this.props.saveAllContactlist(AllContactlist)
            }
        } else {
            let AllContactlist = await this.getAllContactList([item.WxId])
            this.props.saveAllContactlist(AllContactlist)
            this.setState({currentWxuser: item})
            this.props.saveCurrentWxuser(item)
        }
    }
    async componentDidMount() {
        let wxuserList = await this.api.getOnlineWxUserList()
        let WxIds = wxuserList.map(item => item.WxId)
        let AllContactlist = await this.getAllContactList(WxIds)
        this.props.saveAllContactlist(AllContactlist)
        this.props.saveWxuserlist({wxuserList})
    }
    render() {
        let {wxuserList,currentWxuser} = this.props
        console.log('获取所有的企微账号数据',wxuserList)
        return (
            <ul className="wxlist-container">
                {
                   wxuserList && wxuserList.length > 0 ?
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
                    }) : ''
                }
            </ul>
        )
    }
}

export default connect(
    state => ({
        currentWxuser: state.currentWxUser,
        AllContactlist: state.AllContactlist,
        wxuserList: state.wxuserList
    }),
    {
        saveCurrentWxuser,
        saveAllContactlist,
        saveWxuserlist
    }
)(WxuserList)