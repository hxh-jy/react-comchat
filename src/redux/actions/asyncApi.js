import {HANDLE_CONTACTLIST} from '../constant'

import api from '../../api'

export const handleContactlist = (data) => ({type: HANDLE_CONTACTLIST,data})

export const getUserContactList = params => {
    return dispatch => {
        api.getUserContactList(params).then(res => {
            dispatch(handleContactlist(res))
        }).catch(err => {
            dispatch(handleContactlist(err.message))
        })
    }
}