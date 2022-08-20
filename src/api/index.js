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

// 发送文本消息
api.sendMsg = function(data) {
    return request({
        url: 'api/msg/text',
        method: 'post',
        data: JSON.stringify(data)
    });
}
// 发送视频消息
// export function sendVideo(data) {
//     return request({
//         url: '/api/msg/video',
//         method: 'post',
//         data: JSON.stringify(data)
//     })
// }

// // 发送小程序消息
// export function sendMiniprogram(data) {
//     return request({
//         url: '/api/msg/miniProgram',
//         method: 'post',
//         data: JSON.stringify(data)
//     })
// }

export default api