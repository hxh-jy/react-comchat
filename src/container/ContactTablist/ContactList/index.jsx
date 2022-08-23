import React, { Component } from 'react'

import { connect } from 'react-redux'
import {saveCurrentContactuser,saveCurrentSender} from '../../../redux/actions/commonInfo'

import {chatHistorylist } from '../../../redux/actions/msgInfo'
import './index.less'
class ContactList extends Component {

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

    async handleCurUser(item,e) {
        let {wxuserList} = this.props
        
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
        this.props.chatHistorylist(msgList)
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
        currentContactuser: state.currentContactuser,
        wxuserList: state.wxuserList
    }),
    {
        saveCurrentContactuser,
        chatHistorylist, 
        saveCurrentSender
    }
)(ContactList)