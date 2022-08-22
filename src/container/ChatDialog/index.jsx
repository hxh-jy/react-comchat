import React, { Component } from 'react'
import {chatHistorylist } from '../../redux/actions/msgInfo'
import { connect } from 'react-redux'

import {parseTime}from '../../utils/time'
import './index.less'

import { Input,message } from 'antd';
const { TextArea } = Input;
const signalR = require('@microsoft/signalr')

class ChatDialog extends Component {
    state = {hubStatus: '',inputContent: ''}
    getSendMsg = (sendUser,content) => {
        const params = {
            WxId: sendUser.WxId,
            Content: content,
            ConversationId: sendUser.ConversationId,
            msgSource: 'api_artificial_input',
            senderName: "韩雪红-卓盟前端"
        }
        return this.api.sendMsg(params)
    }
    onChange =(e) => {
        let {inputContent} = this.state
        if (!inputContent && e.target.value === '\n') {
            message.info('不能发送空白消息')
        } else {
            this.setState({inputContent: e.target.value})
        }
    }
    onPressEnter = e => {
        let {inputContent} = this.state
        let {currentContactuser} = this.props
        // ctrlKey 事件属性可返回一个布尔值，指示当事件发生时，Ctrl 键是否被按下并保持住
        // 按下enter键发送消息，按下ctrl键不发送消息
        if (e.ctrlKey && inputContent && inputContent !== '\n' ) {
            inputContent += '\n'
            this.setState({inputContent})
        } else {
            if(inputContent.endsWith('\n')) {
                this.setState({inputContent: inputContent.slice(0,inputContent.length - 1)})
            }
            this.getSendMsg(currentContactuser,inputContent)
        }
    }
    fileName = url => {
        if (url) {
            if(!url.includes('http')) {
                return '抱歉，该文件暂时无法查看或下载'
            }
            const tempArray =  url.split('/').reverse();
            return tempArray.length > 0 ? tempArray[0] : '';
        } else {
            return;
        }
    }
    componentDidUpdate() {
        let {chatDialog} = this
        // chatDialog.scrollTop = chatDialog.scrollHeight - chatDialog.clientHeight
        if (chatDialog && chatDialog.scrollHeight) {
            // 当前对话框滚动到最底部
            chatDialog.scrollTop = chatDialog.scrollHeight - chatDialog.clientHeight
            console.log('有新消息进来时展示最新消息',chatDialog.scrollHeight )
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
            let {currentContactuser} = this.props
            console.log('接收到了新消息',res)
            let feedback = JSON.parse(res)
            const msg = JSON.parse(feedback.data);
            console.log('feedback: ***',feedback,'msg: ***',msg)
            if (msg && msg.data.conversation_id === currentContactuser.ConversationId && feedback.wxid === currentContactuser.WxId) {
                let {historyList} = this.props
                historyList.push({
                    WxId:  msg.data.sender,
                    content: msg.data.content || msg.data.file_path || msg.data.url || (msg.type === 11066 ? msg.data.name : ''),
                    type: msg.type,
                    sendTime: msg.data.send_time,
                    name: feedback.UserName === "api" || feedback.UserName === 'test' || !feedback.UserName ? msg.data.sender_name : feedback.UserName,
                    url: msg.type === 11047 ? msg.data.url : '',
                    image_url: msg.type === 11047 ? msg.data.image_url : '',
                    desc: msg.type === 11047 ? msg.data.desc : '',
                    title: msg.type === 11047 ? msg.data.title : ''
                })
                this.setState({inputContent: ''})
                this.props.chatHistorylist(historyList)
            }
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
                <ul ref={node => this.chatDialog = node} className="chat-body">
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
                                        {   item.type === 11041 ?
                                            <span className="msg">{item.content}</span> : 
                                            item.type === 11042 || item.type === 11048 ? 
                                            <img className="chat-img" src={item.content} alt="" /> : 
                                            item.type === 11043 || item.type === 11044 ? 
                                            <video className="chat-video" 
                                                    controls 
                                                    muted  
                                                    preload="true"
                                                    src={item.content}></video> : 
                                            item.type === 11045 || item.type === 11031 ?      
                                            <span className="msg">文件：{this.fileName(item.content)}</span> : 
                                            item.type === 11066  ?      
                                            <span className="msg">{item.content+'【小程序】'}</span> : 
                                            item.type === 11047  ?      
                                            <span className="imgtext-link">
                                                <a className="link-url" href="/">
                                                    <span className="link-title">{item.title}</span>
                                                    <span className="link-body">
                                                        <span className="link-desc">{item.desc}</span>
                                                        <span className="link-img">
                                                            <img src={item.image_url} alt="" />
                                                        </span>
                                                    </span>
                                                </a>
                                            </span> : ''
                                        }
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
    }),
    {
        chatHistorylist,
    }
)(ChatDialog)