import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './components/App'
import 'modern-normalize'
import 'tachyons'
import './reset.css'
import './style.css'

function renderApp() {
  ReactDOM.render(<App />, document.getElementById('root'))
}

// First render
renderApp()

// Hot module reloading
if (module.hot) {
  module.hot.accept('components/App', () => {
    console.clear()
    renderApp()
  })
}
