import React, { Component } from 'react'
import { connect } from 'react-redux'

import './index.less'
const signalR = require('@microsoft/signalr')

class ChatDialog extends Component {
    state = {hubStatus: ''}

    componentDidMount() {
        if (!this.state.hubStatus) {   
            this.initHub()
        }
    }
    componentWillUnmount() {
        let {hubStatus } = this.state
        hubStatus.stop()
    }
    initHub = () => {
        let hubStatus
        hubStatus = new signalR.HubConnectionBuilder()
        .withUrl('https://pt-qa.lbian.cn/chathub',{
            accessTokenFactory: () => window.token
        })
        .configureLogging(signalR.LogLevel.Information)
        .withAutomaticReconnect([0, 5000, 10000, 20000, 50000, 100000, 150000, 200000])
        .build()
        hubStatus.on('ReceiveChatMessage',res => {
            console.log(res)
        })
        hubStatus.start().then(res => {
            console.log('连接成功',res)
        })
        hubStatus.onclose(err => {
            console.log('连接失败',err)
        })
        this.setState({hubStatus})
        console.log('测试',this.state.hubStatus)
    }
    render() {
        let {historyList,currentContactuser,currentSender} = this.props
        return (
            <div className="chat-container">
                <div className="chat-header">聊天框头部</div>
                <ul className="chat-body">
                    {
                        historyList.map(item => {
                            return (
                                <li 
                                className={[currentContactuser.WxId === item.WxId ? 'sender-user' : 'receive-user']} 
                                key={item.WxId + Math.random()}>
                                    {   currentContactuser.WxId !== item.WxId ?
                                        <img className="msg-icon" src={currentContactuser.Avatar} alt="" /> : ''
                                    }
                                    <div className="msg-info">
                                        <div className="msg-user">
                                            <span className="user-name">{item.name}</span>
                                            <span className="send-time">{item.sendTime}</span>
                                        </div>
                                        <span className="msg">{item.content}</span>
                                    </div>
                                    {   currentContactuser.WxId === item.WxId ?
                                        <img className="msg-icon" src={currentSender.Avatar} alt="" /> : ''
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="chat-send">发送聊天信息</div>
            </div>
        )
    }
}
export default connect(
    state => ({
        historyList: state.historyList,
        currentContactuser: state.currentContactuser,
        currentSender: state.currentSender
    })
)(ChatDialog)