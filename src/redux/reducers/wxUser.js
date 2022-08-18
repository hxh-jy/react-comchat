import {SAVE_WXUSER,SAVE_ALLCONTACTLIST,SAVE_WXUSERLIST } from '../constant'
let initWxuser = {} // 初始化当前联系人
export default function currentWxuserReducer (preState = initWxuser,action) {
    let {type,data} = action
    switch (type) {
        case SAVE_WXUSER:
            return preState = data
        default:
            return preState
    }
}

export function AllContactlist (preState = [],action) {
    let {type,data} = action
    switch (type) {
        case SAVE_ALLCONTACTLIST:
            return preState = data
        default:
            return preState
    }
}

export function wxuserList (preState = [],action) {
    let {type,data} = action
    switch (type) {
        case SAVE_WXUSERLIST:
            return preState = data
        default:
            return preState
    }
}