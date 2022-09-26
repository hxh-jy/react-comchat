import React, { Component,lazy,Suspense } from 'react'
import { NavLink,Route,Switch,Redirect} from 'react-router-dom';
import './App.less'

let reacthooks = lazy(() => import('./pages/Learnhooks'))
let ComChat = lazy(() => import('./pages/comchat'))
let LearnJs = lazy(() => import('./pages/LearnJs'))
let learnEcharts = lazy(() => import('./pages/LearnEcharts'))

let LearnAjax = lazy(() => import('./pages/LearnAjax'))
export default class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="router-skip">
          <NavLink className="route-item" to="/reacthooks">react Hooks页面</NavLink>
          <NavLink className="route-item" to="/comchat">聚合聊天页面</NavLink>
          <NavLink className="route-item" to='learnJs'>js复习</NavLink>
          <NavLink className="route-item" to='learnEcharts'>echarts的学习</NavLink>
          <NavLink className="route-item" to='learnAjax'>ajax的学习</NavLink>
        </div>
        <div className="router-container">
          <Suspense fallback="加载中">
            <Switch>
              <Route path="/reacthooks" component={reacthooks}></Route>
              <Route path="/comchat" component={ComChat}></Route>
              <Route path="/learnJs" component={LearnJs}></Route>
              <Route path="/learnEcharts" component={learnEcharts}></Route>
              <Route path="/learnAjax" component={LearnAjax}></Route>
              <Redirect to='/reacthooks'/>
            </Switch>
          </Suspense>
        </div>
      </div>
    )
  }
}
