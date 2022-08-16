import React, { Component,lazy,Suspense } from 'react'
import { NavLink,Route,Switch,Redirect} from 'react-router-dom';
import './App.less'

let Home = lazy(() => import('./pages/test'))
let ComChat = lazy(() => import('./pages/comchat'))
export default class App extends Component {
  async componentDidMount() {
    let alllist = await this.api.getOnlineWxUserList()
    console.log('测试数据',this,alllist)
  }
  render() {
    return (
      <div className="App">
        <div className="router-skip">
          <NavLink className="route-item" to="/test">测试页面</NavLink>
          <NavLink className="route-item" to="/comchat">聚合聊天页面</NavLink>
        </div>
        <div className="router-container">
          <Suspense fallback="加载中">
            <Switch>
              <Route path="/test" component={Home}></Route>
              <Route path="/comchat" component={ComChat}></Route>
              <Redirect to='/test'/>
            </Switch>
          </Suspense>
        </div>
      </div>
    )
  }
}
