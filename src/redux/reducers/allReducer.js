import { combineReducers } from "redux";
import currentWxuser,{AllContactlist,wxuserList,roomList,currentContactuser,
       currentSender,userInfo } from './commonInfo'
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

    historyList,

    handleContactlist
})
export default allReducer