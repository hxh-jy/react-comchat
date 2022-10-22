import React,{useMemo, useRef} from 'react'
import styled from 'styled-components'
import { Tabs } from 'antd';
import api from '../../api/index'

import { connect } from 'react-redux'

let  SideBar = styled((props,{className}) => {
    let iframeUser = useRef()
    let wxUser = useMemo(() => {
        // 将联系人对应企微账号存入
        for (const wxUser of props.wxuserList) {
            if (wxUser.WxId === props.contactUser.WxId) {
            return wxUser;
            }
        }
        return "";
    },[props.contactUser,props.wxuserList]) 

    let userInfo = useMemo(() => {
        // 将联系人对应企微账号存入
        for (const wxUser of props.wxuserList) {
            if (wxUser.WxId === props.contactUser.WxId) {
                return wxUser.UserName;
            }
        }
        return "";
    },[props.contactUser,props.wxuserList]) 
    let sendUser = async () => {
        let relationUser = await api.getContactRelation({WxId: props.contactUser.WxId,ContactUserId: props.contactUser.ContactUserId})
            let params = {
              token: window.token,
              union_id:relationUser && relationUser.UnionId ? relationUser.UnionId : '',
              acct_id: wxUser.AcctId || props.contactUser.AcctId, //企微账号id
              corp_id: relationUser && relationUser.CorpId ?  relationUser.CorpId : '',
              username: props.contactUser.UserName,
              sender_username: userInfo,
            };
            console.log("获取侧边栏客户资料的参数", params);
            if (iframeUser &&iframeUser.contentWindow) 
            {
                iframeUser.contentWindow.postMessage(params, "*");
            }
    }
    return (
        <div className={className}>
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="客户资料" key="1">
                <iframe
                    title='iframe'
                    ref={iframeUser}
                    src="https://front.sit.suosihulian.com/rhyysshl/sidebar/sub-app/tool/client"
                    onLoad={sendUser}
                ></iframe>
                </Tabs.TabPane>     
                <Tabs.TabPane tab="话术" key="2">
                    Content of Tab Pane 1
                </Tabs.TabPane>   
                <Tabs.TabPane tab="套壳链接" key="3">
                    Content of Tab Pane 1
                </Tabs.TabPane> 
                <Tabs.TabPane tab="机器人" key="4">
                    Content of Tab Pane 1
                </Tabs.TabPane>
                <Tabs.TabPane tab="sop列表" key="5">
                    Content of Tab Pane 1
                </Tabs.TabPane>  
            </Tabs>
        </div>
      )
})``
export default  connect(
    state => ({
        contactUser: state.currentContactuser,
        wxuserList: state.wxuserList,
    })
)(SideBar)