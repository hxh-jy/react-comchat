import { combineReducers } from "redux";
import currentWxuser,{AllContactlist,wxuserList,roomList,currentContactuser} from './commonInfo'
import handleContactlist from './asyncApi'


const allReducer = combineReducers({
    currentWxUser: currentWxuser,
    AllContactlist: AllContactlist,
    wxuserList: wxuserList,
    roomList: roomList,
    currentContactuser: currentContactuser,

    handleContactlist: handleContactlist
})
export default allReducer