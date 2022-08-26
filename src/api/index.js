import {request} from '../utils/http'
let api = {}
// 所有企微账号
api.getOnlineWxUserList = function() {
    return request({
        url: 'WxUser/OnlineWxUserList',
        method: 'post'
    });
}
// 企微账号下的联系人
api.getAllContactList = function(data) {
    return request({
        url: 'Contact/AllContactListWithstatus',
        method: 'post',
        data: JSON.stringify(data)
    });
}
// 企微账号下的群
api.getRoomContactList = function(data) {
    return request({
        url: 'Room/RoomContactList',
        method: 'post',
        data: JSON.stringify(data)
    });
}

// 企微账号下的处理中联系人 status为0代表的是处理中的联系人数据
api.getUserContactList = function(data) {
    return request({
        url: 'Contact/GetUserContactList',
        method: 'post',
        data: JSON.stringify(data)
    });
}

// 企微账号下的聊天记录
api.getChatHistorys = function(data) {
    return request({
        url: 'ChatHistory/ChatHistorys',
        method: 'post',
        data: JSON.stringify(data)
    });
}

// 获取员工信息
api.getUserInfo = function(params) {
    return request({
        url: 'auth/oauth/userinfo',
        method: 'get',
        params
    },true);
}
// 发送文本消息
api.sendText = function(data) {
    return request({
        url: 'api/msg/text',
        method: 'post',
        data: JSON.stringify(data)
    });
}

// 上传文件
api.uploadFile = function(data) {
    return request({
        url: '/File/UploadFile',
        method: 'post',
        data: data
    }, false, true) // 以multipart/form-data形式上传
}
// 发送图片消息
api.sendImage = function(data) {
    return request({
        url: '/api/msg/image',
        method: 'post',
        data: JSON.stringify(data)
    })
}

// 发送文件消息
api.sendFile = function(data) {
    return request({
        url: '/api/msg/file',
        method: 'post',
        data: JSON.stringify(data)
    })
}
// 发送视频消息
api.sendVideo = function(data) {
    return request({
        url: '/api/msg/video',
        method: 'post',
        data: JSON.stringify(data)
    })
}
// 加载群成员列表
api.getRoomMemberList = function(data) {
    return request({
        url: '/Room/RoomMemberList',
        method: 'post',
        data: JSON.stringify(data),
    });
}
// // 发送小程序消息
// export function sendMiniprogram(data) {
//     return request({
//         url: '/api/msg/miniProgram',
//         method: 'post',
//         data: JSON.stringify(data)
//     })
// }

export default api