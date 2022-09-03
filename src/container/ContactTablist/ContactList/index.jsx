import React, { Component } from 'react'

import { connect } from 'react-redux'
import { Popover } from 'antd';
import {saveCurrentContactuser,saveCurrentSender,saveRoomMemberlist} from '../../../redux/actions/commonInfo'

import reverseByKey from '../../../utils/sort'
import {chatHistorylist } from '../../../redux/actions/msgInfo'
import Toast from '../../../components/Toast';

import './index.less'

class ContactList extends Component {
    state = {isShow: true,list: this.props.list}
    getChatHistorys = (item) => {
        let parms = {
            pageIndex: 1,
            pageSize: 100,
            LastTimestamp: 0,
            WxId: item.WxId,
            ConversationIds: [
                item.ConversationId
            ],
            Type: 0
          }
          return this.api.getChatHistorys(parms)
    }
    getRoomMemberlist = (user) => {
        // getRoomMemberList
        let params = {
            ConversationId: user.ConversationId,
            WxId: user.WxId
        }
        return this.api.getRoomMemberList(params)
    }
    async handleCurUser(item,e) {
        let {wxuserList,saveRoomMemberlist} = this.props
        this.setState({isShow: false})
        
        let sender = wxuserList.filter(user => user.WxId === item.WxId)
        this.props.saveCurrentContactuser(item)
        this.props.saveCurrentSender(sender[0])
        let msgList = []

        // 11041 文本消息 ;11042 || 11030 图片；11043 ||  11044 视频; 
        // 11045 || 11031文件;11066 小程序;11047 图文链接；
        let historylist = await this.getChatHistorys(item)
       
        historylist.forEach(item => {
            let msg = JSON.parse(item.Msg)
            // console.log('历史信息**** ',msg)
            msgList.unshift({
                WxId:  msg.data.sender,
                ConversationId:  msg.data.conversation_id || msg.data.room_conversation_id,
                content: msg.data.content || msg.data.file_path || msg.data.url || (msg.type === 11066 ? msg.data.name : ''),
                type: msg.type,
                sendTime: msg.data.send_time,
                name: item.UserName === "api" || item.UserName === 'test' || !item.UserName ? msg.data.sender_name : item.UserName,
                url: msg.type === 11047 ? msg.data.url : '',
                image_url: msg.type === 11047 ? msg.data.image_url : '',
                desc: msg.type === 11047 ? msg.data.desc : '',
                title: msg.type === 11047 ? msg.data.title : ''
            })
        })
        // console.log('msgList',msgList)
        this.props.chatHistorylist(msgList)

        if (item.ConversationId.includes('R:')) {
            let roomlist = await this.getRoomMemberlist(item)
            saveRoomMemberlist(roomlist)
        }
        let {list} = this.props
        list.forEach(user => {
            user.visible = false
        })
    }
    handleRightmenu(e,item) {
        console.log('测试单击右键的实现',item.visible)
        item.visible = !item.visible
        let {list} = this.props
        this.setState({isShow: true})
        list.forEach(user => {
            if (user.ConversationId !== item.ConversationId) {
                user.visible = false
            }
        })
    }

    // handleSettingTop = (item) => {
    //     let {list} = this.state
    //     let newList = list.filter(user => user.ConversationId !== item.ConversationId)
    //     this.setState([item,...newList])
    // }
    render() {
        console.log('测试***********',this.state.list)
        let {list,currentContactuser,tab} = this.props
        let {isShow} = this.state
        let sortList = reverseByKey(list,'LastChatTimestamp','isOnTop')
        let sortRoomList = reverseByKey(list,'LastChatTimestamp')
        return (
            <ul className="contact-list">
                {   
                    tab !== '2' ? 
                    sortList.map(item => {
                        return (
                            <Popover
                            title="请选择你要进行的操作"
                            trigger="contextMenu"
                            placement="top"
                            content={<Toast currentUser={item}/>} 
                            visible={item.visible && isShow}
                            key={item.ConversationId + Math.random()}
                            >
                                <li 
                                    onContextMenu = {e => this.handleRightmenu(e,item)}
                                    onClick={(e) => this.handleCurUser(item,e)} 
                                    className={["contact-item",
                                        item.ConversationId === currentContactuser.ConversationId  
                                        && item.WxId === currentContactuser.WxId ? 'active' : 
                                        item.isOnTop === 0 ? 'top-user' :
                                        ''].join(' ')}
                                    >
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
                            </Popover>
                        )
                    }) : 
                    sortRoomList.map(item => {
                        return (
                            <li 
                                onContextMenu = {e => this.handleRightmenu(e,item)}
                                onClick={(e) => this.handleCurUser(item,e)} 
                                className={["contact-item",item.ConversationId === currentContactuser.ConversationId  && item.WxId === currentContactuser.WxId ? 'active' : ''].join(' ')}
                                key={item.ConversationId + Math.random()}
                                >
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
        currentContactuser: state.currentContactuser,
        wxuserList: state.wxuserList
    }),
    {
        saveCurrentContactuser,
        chatHistorylist, 
        saveCurrentSender,
        saveRoomMemberlist
    }
)(ContactList)