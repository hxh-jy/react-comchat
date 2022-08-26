import {SAVE_WXUSER,SAVE_ALLCONTACTLIST,SAVE_WXUSERLIST,SAVE_ROOMCONTACTLIST,
        SAVE_CURRENTCONTACT,SAVE_CURRENTSENDER,SAVE_USERINFO,SAVE_ROOMMEMBERLIST} from '../constant'

// 同步action中只需要传入数据即可
export let saveCurrentWxuser = data => ({type: SAVE_WXUSER,data})
export let saveCurrentContactuser = data => ({type: SAVE_CURRENTCONTACT,data})
export let saveCurrentSender = data => ({type: SAVE_CURRENTSENDER,data})

export let saveAllContactlist = data => ({type: SAVE_ALLCONTACTLIST,data})
export let saveWxuserlist = data => ({type: SAVE_WXUSERLIST,data})
export let saveRoomList = data => ({type: SAVE_ROOMCONTACTLIST,data})
export let saveRoomMemberlist = data => ({type: SAVE_ROOMMEMBERLIST,data})
export let saveUserinfo = data => ({type: SAVE_USERINFO,data})