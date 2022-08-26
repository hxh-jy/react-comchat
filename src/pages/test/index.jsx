import React, { Component } from 'react'
import {  Popover } from 'antd';

const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );
 
export default class home extends Component {
    state = {visible: false}
    handleClick = () => {
        let {visible} =  this.state
        this.setState({visible: !visible})
      }
    render() {
        let {visible} =  this.state
        return (
            <div>
                <p>这里仅仅是为了进行测试用的一个页面</p>
                <Popover
                trigger="contextMenu"
                content={content} 
                visible={visible}
                >
                    <button onContextMenu={this.handleClick}>测试</button>
                </Popover>
            </div>
        )
    }
}
