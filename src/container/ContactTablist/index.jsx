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
        let {AllContactlist,RoomList,handleContactlist} = this.props
        let {tab} = this.state
        return (
            <div className="contact-container">
                <Tabs defaultActiveKey="1" onChange={this.onChange}>
                    <TabPane tab="处理中" key="1"></TabPane>
                    <TabPane tab="@我" key="2"></TabPane>
                    <TabPane tab="客户" key="3"></TabPane>
                </Tabs>
                {
                    tab === '1' ? <ContactList tab={tab} list={handleContactlist}/> : 
                    tab === '2' ? <ContactList tab={tab} list={RoomList}/> :
                    tab === '3' ? <ContactList tab={tab} list={AllContactlist}/> : ''
                }
            </div>
        )
    }
}


export default connect(
    state => ({
        currentWxuser: state.currentWxUser,
        AllContactlist: state.AllContactlist,
        RoomList: state.roomList,
        handleContactlist: state.handleContactlist
    }),
)(ContactTabList)