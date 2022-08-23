import React, { Component } from 'react'
import {chatHistorylist } from '../../redux/actions/msgInfo'
import { connect } from 'react-redux'

import Emoji from '../../components/Emoji'
import  {qq_faceMap} from '../../assets/js/qq_face'
import {parseTime}from '../../utils/time'
import './index.less'



import { Input,message,Popover,Upload } from 'antd';
const { TextArea } = Input;
const signalR = require('@microsoft/signalr')
class ChatDialog extends Component {
    state = {hubStatus: '',inputContent: '',emojiVisible: false,page: 1,scrolltop: false}
    getsendText = (sendUser,content) => {
        const params = {
            WxId: sendUser.WxId,
            Content: content,
            ConversationId: sendUser.ConversationId,
            msgSource: 'api_artificial_input',
            senderName: "韩雪红-卓盟前端"
        }
        return this.api.sendText(params)
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
            this.getsendText(currentContactuser,inputContent)
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
        let {scrolltop} = this.state
        console.log('是否需要浮动', scrolltop)
        if (chatDialog && chatDialog.scrollHeight && !scrolltop) {
            // 当前对话框滚动到最底部
            chatDialog.scrollTop = chatDialog.scrollHeight - chatDialog.clientHeight
        } else {
            chatDialog.scrollTop = 0
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

    formatMsg = (text) => {
        let faceList = text.match(/\[.*?\]/g)
        // return text
        if (!faceList) {
            return text
        } else if(faceList && faceList.length > 0){
            faceList.forEach(item => {
                let index = qq_faceMap.get(item)
                if (index >= 0) {
                    let msgDiv = '';
                    msgDiv = `<span 
                    class='qqFace' 
                    style='background-position: ${-(index%15)*29}px ${-(Math.floor(index/15))*29}px'
                    ></span>`;
                    text = text.replace(item,msgDiv)
                    return text
                }
            })
            return text
        }
    }
    getEmoji = (content,flag) => {
        let {inputContent} = this.state
        this.setState({inputContent: inputContent + content,emojiVisible: flag})
    }
    transferEmojiShow = () => {
        let {emojiVisible} = this.state
        this.setState({emojiVisible: !emojiVisible})
    }
    async uploadImage(params){
        let _file = params.file,{currentContactuser,userInfo} = this.props
        const formData = new FormData()
        formData.append('file',_file)
        // 请求上传接口,会返回一个完整的上传图片地址
        let FileUrl = await this.api.uploadFile(formData)

        let fileParams = {
            WxId: currentContactuser.WxId,
            FileUrl,
            ConversationId: currentContactuser.ConversationId,
            msgSource: 'api_artificial_input',
            senderName: userInfo.realName
        }
        let upload = await this.api.sendImage(fileParams)
        console.log('上传图片的请求',params,formData,upload)
    }
    async uploadFile(params) {
        // sendFile sendVideo 
        let _file = params.file,{currentContactuser,userInfo} = this.props
        const formData = new FormData()
        formData.append('file',_file)
        // 请求上传接口,会返回一个完整的上传图片地址
        let FileUrl = await this.api.uploadFile(formData)

        let fileParams = {
            WxId: currentContactuser.WxId,
            FileUrl,
            ConversationId: currentContactuser.ConversationId,
            msgSource: 'api_artificial_input',
            senderName: userInfo.realName
        }
        
        if (params.file.type.indexOf('image') >  -1) {
            this.api.sendImage(fileParams)
        } else if (params.file.type.indexOf('video') > -1) {
            this.api.sendVideo(fileParams)
        } else {
            this.api.sendFile(fileParams)
        }
        console.log('上传图片的请求',params,formData)
    }
    getChatHistorys = (page,item) => {
        let parms = {
            pageIndex: page,
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
    moreHistory = async  () => {
        let {page} = this.state
        let {currentContactuser,historyList} = this.props
        this.setState({page: page + 1,scrolltop: true})
        
        let msgList = []

        // 11041 文本消息 ;11042 || 11030 图片；11043 ||  11044 视频; 
        // 11045 || 11031文件;11066 小程序;11047 图文链接；
        let historylist = await this.getChatHistorys(page + 1,currentContactuser)
       
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
        this.props.chatHistorylist([...msgList,...historyList])
    }
    render() {
        let {historyList,currentContactuser,currentSender} = this.props
        let {inputContent,emojiVisible} = this.state
        
        return (
            <div className="chat-container">
                <div className="chat-header">聊天框头部</div>
                {/* 消息展示框 */}
                <ul ref={node => this.chatDialog = node} className="chat-body">
                    <li className="moreChatHistory">
                    {
                        historyList.length === 100 ?
                        <span onClick={this.moreHistory}>点击加载更多</span> : 
                        <span>暂无更多聊天记录</span>
                    }
                    </li>
                    {   
                        historyList.map((item,index) => {
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
                                            <span className="msg" dangerouslySetInnerHTML={{ __html: this.formatMsg(item.content,index) }}></span> : 
                                            // <span className="msg">{this.formatMsg(item.content,index)}</span> : 
                                            item.type === 11042 || item.type === 11048 ? 
                                            <img className="chat-img" src={item.content} alt="" /> : 
                                            item.type === 11043 || item.type === 11044 ? 
                                            <video className="chat-video" 
                                                    controls 
                                                    muted  
                                                    preload="true"
                                                    src={item.content}></video> : 
                                            item.type === 11045 || item.type === 11031 ? 
                                                // 下载文件 
                                            <span className="msg">文件：{this.fileName(item.content)}</span> : 
                                            item.type === 11066  ?      
                                            <span className="msg">{item.content+'【小程序】'}</span> : 
                                            // 11047图文链接 超链接
                                            item.type === 11047  ?      
                                            <span className="imgtext-link">
                                                <a className="link-url" href={item.url}>
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
                
                {/* 发送消息框 */}
                <div className="chat-send">
                    {/* 发送表情包、视频、图片、文件 */}
                    <ul className="send-other">
                        <li className="send-emoji">
                            <Popover 
                            visible={emojiVisible}
                            content={<Emoji getEmoji={this.getEmoji}/>} 
                            title="发送表情包" 
                            trigger="click">
                                <img 
                                onClick={this.transferEmojiShow}
                                src={require('../../assets/img/tochat/emoji.png')}  
                                alt="发送表情包" />
                            </Popover>
                        </li>
                        {/* customRequest  自定义上传文件 */}
                        <li className="send-img">
                            <Upload
                            action=""
                            showUploadList={false} 
                            customRequest={file => this.uploadImage(file)}
                            >
                                <img src={require("../../assets/img/tochat/picture.png" )} alt="上传图片" />
                            </Upload>
                        </li>
                        
                        <li className="send-file">
                            <Upload
                            action=""
                            showUploadList={false} 
                            customRequest={file => this.uploadFile(file)}
                            >
                                <img src={require("../../assets/img/tochat/file.png" )} alt="发送文件" />
                            </Upload>
                        </li>
                    </ul>
                    {/* 发送普通文本 */}
                    <TextArea 
                    value={inputContent} 
                    rows={7} 
                    onPressEnter={this.onPressEnter}
                    onInput={this.onChange}
                    />
                    <div className="inputDesc"> Enter发送; Ctrl+Enter换行 </div>
                </div>
            </div>
        )
    }
}
export default connect(
    state => ({
        historyList: state.historyList,
        currentContactuser: state.currentContactuser,
        currentSender: state.currentSender,
        userInfo: state.userInfo,
        wxuserList: state.wxuserList
    }),
    {
        chatHistorylist,
    }
)(ChatDialog)