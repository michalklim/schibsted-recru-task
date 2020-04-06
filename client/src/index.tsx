import { hot } from 'react-hot-loader/root'
import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'

const wrapper = document.getElementById('root')
const EnhancedApp = hot(App)
ReactDOM.render(<EnhancedApp />, wrapper)
