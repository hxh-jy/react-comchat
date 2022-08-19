import React, { Component } from 'react'
import { connect } from 'react-redux'
import {parseTime}from '../../utils/time'
import './index.less'

import { Input } from 'antd';
const { TextArea } = Input;
const signalR = require('@microsoft/signalr')

class ChatDialog extends Component {
    state = {hubStatus: '',inputContent: ''}
    onChange =(e) => {
        console.log('发生了改变',e)
        this.setState({inputContent: e.target.value})
    }
    onPressEnter = e => {
        console.log('获取输入框输入的内容',e,e.target.value,e.ctrlKey)
        // ctrlKey 事件属性可返回一个布尔值，指示当事件发生时，Ctrl 键是否被按下并保持住
        // 按下enter键发送消息，按下ctrl键不发送消息
        if (e.ctrlKey && e.target.value) {
            let preContent =''
            preContent += e.target.value + '\n'
            this.setState({inputContent: preContent})
        } else if (e.target.value == '\n') {
            return console.log('不能发送空白消息')
        }
    }
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
        let {inputContent} = this.state
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
                                            <span className="user-name">{item.name} </span>
                                            <span className="send-time"> {parseTime(item.sendTime)}</span>
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
                <div className="chat-send">
                    <TextArea 
                    value={inputContent} 
                    rows={7} 
                    onPressEnter={this.onPressEnter}
                    onInput={this.onChange}
                    />
                </div>
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