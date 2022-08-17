//引入react核心库
import React,{Component} from 'react'
import { createRoot } from 'react-dom/client';
//引入App
import App from './App'
import api from './api/index'
import './index.less'
import {BrowserRouter} from 'react-router-dom'

import {Provider} from 'react-redux'
import store from './redux/store'
// 将接口统一放在Component的原型上
Component.prototype.api = api

let container = document.getElementById('root')
let root = createRoot(container)
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
    
)