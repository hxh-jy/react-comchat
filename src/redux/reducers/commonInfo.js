import {SAVE_WXUSER,SAVE_ALLCONTACTLIST,SAVE_WXUSERLIST,SAVE_ROOMCONTACTLIST,SAVE_CURRENTCONTACT,SAVE_CURRENTSENDER } from '../constant'
let initWxuser = {} // 初始化当前联系人
export default function currentWxuser (preState = initWxuser,action) {
    let {type,data} = action
    switch (type) {
        case SAVE_WXUSER:
            return preState = data
        default:
            return preState
    }
}

export  function currentContactuser (preState = {},action) {
    let {type,data} = action
    switch (type) {
        case SAVE_CURRENTCONTACT:
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
export function roomList (preState = [],action) {
    let {type,data} = action
    switch (type) {
        case SAVE_ROOMCONTACTLIST:
            return preState = data
        default:
            return preState
    }
}

export function currentSender (preState = {},action) {
    let {type,data} = action
    switch (type) {
        case SAVE_CURRENTSENDER:
            return preState = data
        default:
            return preState
    }
}