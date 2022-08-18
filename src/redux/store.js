import { createStore,combineReducers } from "redux";

import currentWxuserReducer,{AllContactlist,wxuserList} from './reducers/wxUser'

import { composeWithDevTools } from "redux-devtools-extension";

const allReducer = combineReducers({
    currentWxUser: currentWxuserReducer,
    AllContactlist: AllContactlist,
    wxuserList: wxuserList
})
export default createStore(allReducer,composeWithDevTools())