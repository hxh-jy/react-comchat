import React, { Component } from 'react'
const signalR = require('@microsoft/signalr')
export default class ChatDialog extends Component {
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
        return (
            <div>
                <h1>这里是聊天框相关数据展示的地方</h1>
            </div>
        )
    }
}
