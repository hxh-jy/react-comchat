import { combineReducers } from "redux";
import currentWxuserReducer,{AllContactlist,wxuserList,roomList} from './wxUser'
import handleContactlist from './asyncApi'


const allReducer = combineReducers({
    currentWxUser: currentWxuserReducer,
    AllContactlist: AllContactlist,
    wxuserList: wxuserList,
    roomList: roomList,

    handleContactlist: handleContactlist
})
export default allReducer