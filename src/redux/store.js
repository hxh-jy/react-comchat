import { createStore,combineReducers } from "redux";

import currentWxuserReducer,{AllContactlist,wxuserList,roomList} from './reducers/wxUser'

import { composeWithDevTools } from "redux-devtools-extension";

const allReducer = combineReducers({
    currentWxUser: currentWxuserReducer,
    AllContactlist: AllContactlist,
    wxuserList: wxuserList,
    roomList: roomList
})
export default createStore(allReducer,composeWithDevTools())