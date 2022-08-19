import {SAVE_MSGHISTOTYLIST} from '../constant'

export default function historyList(preState = [],action) {
    let {type,data} = action
    switch (type) {
        case SAVE_MSGHISTOTYLIST:
            return preState = data
        default:
            return preState
    }
}