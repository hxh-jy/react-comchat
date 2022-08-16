//引入react核心库
import React from 'react'
import { createRoot } from 'react-dom/client';
//引入App
import App from './App'

let container = document.getElementById('root')
let root = createRoot(container)
root.render(<App/>)