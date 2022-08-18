import {request} from '../utils/http'
let api = {}
api.getOnlineWxUserList = function() {
    return request({
        url: 'WxUser/OnlineWxUserList',
        method: 'post'
    });
}
api.getAllContactList = function(data) {
    return request({
        url: 'Contact/AllContactListWithstatus',
        method: 'post',
        data: JSON.stringify(data)
    });
}
api.getRoomContactList = function(data) {
    return request({
        url: 'Room/RoomContactList',
        method: 'post',
        data: JSON.stringify(data)
    });
}
export default api