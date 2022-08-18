import {SAVE_WXUSER,SAVE_ALLCONTACTLIST,SAVE_WXUSERLIST} from '../constant'

// 同步action中只需要传入数据即可
export let saveCurrentWxuser = data => ({type: SAVE_WXUSER,data})
export let saveAllContactlist = data => ({type: SAVE_ALLCONTACTLIST,data})
export let saveWxuserlist = data => ({type: SAVE_WXUSERLIST,data})