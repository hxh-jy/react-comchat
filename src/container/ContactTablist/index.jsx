import React, { Component } from 'react'
import {connect} from 'react-redux'

import {Tabs} from 'antd'
import ContactList from './ContactList'

// import isequal from '../../utils/isequal'
import './index.less'
const {TabPane} = Tabs
class ContactTabList extends Component {
    state = {tab: 1,RoomList: []}
    // static async  getDerivedStateFromProps(props,state) {
    //     let WxIds = [props.currentWxuser.WxId]
    //     let contactlistParams = {
    //         LastTimestamp: 1,
    //         WxIds,
    //         pageIndex: 1,
    //         pageSize: 100
    //     }
    //     console.log(props)
    //     let AllContactlist = await state.api.getAllContactList(contactlistParams)
    //     let flag = isequal(AllContactlist,props.AllContactlist)
    //     // console.log('测试',flag,props,state,AllContactlist)
        
    //     if (!flag) {
    //         props.saveAllContactlist(AllContactlist)
    //     }
    //     return null
    // }

    onChange = async (key) => {
        let WxIds = [this.props.currentWxuser.WxId]
        let RoomList = await this.api.getRoomContactList({WxIds})
        this.setState({tab: key,RoomList})
    }
    render() {
        let {AllContactlist} = this.props
        let {tab,RoomList} = this.state
        return (
            <div className="contact-container">
                <Tabs defaultActiveKey="1" onChange={this.onChange}>
                    <TabPane tab="处理中" key="1"></TabPane>
                    <TabPane tab="@我" key="2"></TabPane>
                    <TabPane tab="客户" key="3"></TabPane>
                </Tabs>
                {
                    tab === '1' ? <ContactList list={AllContactlist}/> : 
                    tab === '2' ? <ContactList list={RoomList}/> :
                    <ContactList list={AllContactlist}/> 
                }
            </div>
        )
    }
}


export default connect(
    state => ({
        currentWxuser: state.currentWxUser,
        AllContactlist: state.AllContactlist
    }),
)(ContactTabList)