import React, { Component } from 'react'

import { connect } from 'react-redux'
import {saveCurrentWxuser,saveAllContactlist,saveWxuserlist,saveRoomList} from '../../redux/actions/commonInfo'

import {getUserContactList} from '../../redux/actions/asyncApi'
import './index.less'

class WxuserList extends Component {
    state = {currentWxuser: {},wxuserList  : []}

    getRoomList = (WxIds) => {
        return this.api.getRoomContactList({WxIds})
    }
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

                let RoomList = await this.getRoomList([item.WxId])
                this.props.saveRoomList(RoomList)

                let inhandleParms = {
                    WxIds:[item.WxId],
                    orgId: "3001001001000006",
                    pageIndex: 1,
                    pageSize: 100,
                    status: 0,
                    userId: "1518116958237753350",
                }
        
                // 通过异步action获取处理中的请求数据  并且同时存储在redux中
                this.props.getUserContactList(inhandleParms)
            } else {
                this.setState({currentWxuser: {}})
                this.props.saveCurrentWxuser({})
                let WxIds = this.state.wxuserList.map(item => item.WxId)
                let AllContactlist = await this.getAllContactList(WxIds)
                this.props.saveAllContactlist(AllContactlist)

                let RoomList = await this.getRoomList(WxIds)
                this.props.saveRoomList(RoomList)

                let inhandleParms = {
                    WxIds,
                    orgId: "3001001001000006",
                    pageIndex: 1,
                    pageSize: 100,
                    status: 0,
                    userId: "1518116958237753350",
                }
        
                // 通过异步action获取处理中的请求数据  并且同时存储在redux中
                this.props.getUserContactList(inhandleParms)
            }
        } else {
            let AllContactlist = await this.getAllContactList([item.WxId])
            this.props.saveAllContactlist(AllContactlist)
            this.setState({currentWxuser: item})
            this.props.saveCurrentWxuser(item)

            let RoomList = await this.getRoomList([item.WxId])
            this.props.saveRoomList(RoomList)

            let inhandleParms = {
                WxIds:[item.WxId],
                orgId: "3001001001000006",
                pageIndex: 1,
                pageSize: 100,
                status: 0,
                userId: "1518116958237753350",
            }
    
            // 通过异步action获取处理中的请求数据  并且同时存储在redux中
            this.props.getUserContactList(inhandleParms)
        }
    }
    async componentDidMount() {
        // 获取所有的企业微信联系人
        let wxuserList = await this.api.getOnlineWxUserList()
        let WxIds = wxuserList.map(item => item.WxId)

        // 获取所有的客户信息
        let AllContactlist = await this.getAllContactList(WxIds)

        // 获取所有的群信息
        let RoomList = await this.getRoomList(WxIds)

        this.setState({wxuserList})
        this.props.saveAllContactlist(AllContactlist)
        this.props.saveWxuserlist({wxuserList})
        this.props.saveRoomList(RoomList)
        
        let inhandleParms = {
            WxIds,
            orgId: "3001001001000006",
            pageIndex: 1,
            pageSize: 100,
            status: 0,
            userId: "1518116958237753350",
        }

        // 通过异步action获取处理中的请求数据  并且同时存储在redux中
        this.props.getUserContactList(inhandleParms)
    }
    render() {
        let {wxuserList,currentWxuser} = this.state
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
        wxuserList: state.wxuserList,
    }),
    {
        saveCurrentWxuser,
        saveAllContactlist,
        saveWxuserlist,
        saveRoomList,
        getUserContactList
    }
)(WxuserList)