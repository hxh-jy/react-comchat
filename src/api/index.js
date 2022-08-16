import {request} from '../utils/http'
let api = {}

api.getAllContactList = function(data) {
    return request({
        url: 'Contact/AllContactListWithstatus',
        method: 'post',
        data: JSON.stringify(data)
    });
}

api.getOnlineWxUserList = function() {
    return request({
        url: 'WxUser/OnlineWxUserList',
        method: 'post'
    });
}

export default api