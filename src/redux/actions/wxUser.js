import {SAVE_WXUSER} from '../constant'
// import {SAVE_WXUSERLIST} from '../constant'
import {SAVE_ALLCONTACTLIST } from '../constant'

// 同步action中只需要传入数据即可
export let saveCurrentWxuser = data => ({type: SAVE_WXUSER,data})
export let saveAllContactlist = data => ({type: SAVE_ALLCONTACTLIST,data})