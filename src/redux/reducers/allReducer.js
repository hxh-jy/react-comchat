import { combineReducers } from "redux";
import currentWxuser,{AllContactlist,wxuserList,roomList,currentContactuser,
       currentSender,userInfo,roomMemberList } from './commonInfo'
import handleContactlist from './asyncApi'

import historyList from './msgInfo'


const allReducer = combineReducers({
    currentWxUser: currentWxuser,
    AllContactlist,
    wxuserList,
    roomList,
    currentContactuser,
    currentSender,
    userInfo,
    roomMemberList,

    historyList,

    handleContactlist
})
export default allReducer