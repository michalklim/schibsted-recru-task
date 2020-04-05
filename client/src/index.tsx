import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { hot } from 'react-hot-loader/root'

const wrapper = document.getElementById('root')
const EnhancedApp = hot(App)
ReactDOM.render(<EnhancedApp />, wrapper)
