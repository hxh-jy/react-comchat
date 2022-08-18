import {HANDLE_CONTACTLIST} from '../constant'

export default function handleContactlist(preState = [],action) {
    let {type,data} = action
    switch (type) {
        case HANDLE_CONTACTLIST:
            return preState = data
        default:
            return preState
    }
}