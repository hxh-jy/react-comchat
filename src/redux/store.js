import { createStore,combineReducers } from "redux";

import currentWxuserReducer,{AllContactlist} from './reducers/wxUser'

import { composeWithDevTools } from "redux-devtools-extension";

const allReducer = combineReducers({
    currentWxUser: currentWxuserReducer,
    AllContactlist: AllContactlist
})
export default createStore(allReducer,composeWithDevTools())