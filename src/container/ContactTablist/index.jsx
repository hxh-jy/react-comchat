import React, { Component } from 'react'
import {connect} from 'react-redux'

import {Tabs} from 'antd'
import ContactList from './ContactList'

import {saveAllContactlist} from '../../redux/actions/wxUser'

import isequal from '../../utils/isequal'
import './index.less'
const {TabPane} = Tabs
class ContactTabList extends Component {
    async componentDidUpdate(preProps,preState) {
        let WxIds = [this.props.currentWxuser.WxId]
        let contactlistParams = {
            LastTimestamp: 1,
            WxIds,
            pageIndex: 1,
            pageSize: 100
        }
        let AllContactlist = await this.api.getAllContactList(contactlistParams)
        
        let flag = isequal(AllContactlist,preProps.AllContactlist)
        if (!flag) {
            this.props.saveAllContactlist(AllContactlist)
        }
        
    }
    componentDidMount() {
    }
    render() {
        let {AllContactlist} = this.props
        return (
            <div className="contact-container">
                <Tabs>
                    <TabPane tab="处理中" key="1"></TabPane>
                    <TabPane tab="@我" key="2"></TabPane>
                    <TabPane tab="客户" key="3"></TabPane>
                </Tabs>
                <ContactList list={AllContactlist}/>
            </div>
        )
    }
}


export default connect(
    state => ({
        currentWxuser: state.currentWxUser,
        AllContactlist: state.AllContactlist
    }),
    {
        saveAllContactlist
    }
)(ContactTabList)