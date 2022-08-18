import React, { Component } from 'react'
import {connect} from 'react-redux'

import {Tabs} from 'antd'
import ContactList from './ContactList'

// import isequal from '../../utils/isequal'
import './index.less'
const {TabPane} = Tabs
class ContactTabList extends Component {
    state = {tab: "1"}

    onChange = async (key) => {
        this.setState({tab: key})
    }
    render() {
        let {AllContactlist,RoomList} = this.props
        let {tab} = this.state
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
                    tab === '3' ? <ContactList list={AllContactlist}/> : ''
                }
            </div>
        )
    }
}


export default connect(
    state => ({
        currentWxuser: state.currentWxUser,
        AllContactlist: state.AllContactlist,
        RoomList: state.roomList
    }),
)(ContactTabList)