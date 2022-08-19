import { combineReducers } from "redux";
import currentWxuser,{AllContactlist,wxuserList,roomList,currentContactuser,currentSender } from './commonInfo'
import handleContactlist from './asyncApi'

import historyList from './msgInfo'


const allReducer = combineReducers({
    currentWxUser: currentWxuser,
    AllContactlist: AllContactlist,
    wxuserList: wxuserList,
    roomList: roomList,
    currentContactuser: currentContactuser,
    currentSender: currentSender,

    historyList: historyList,

    handleContactlist: handleContactlist
})
export default allReducer