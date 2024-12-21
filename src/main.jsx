import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter as Router } from 'react-router-dom'
import { ConfigProvider } from 'antd'
// import { I18nextProvider } from 'react-i18next'
import './i18n.js'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <ConfigProvider
    // theme={{
    //   token: {
    //     colorPrimary: '#3b3b3b',
    //   },
    // }}
    >
      <App />
      <ToastContainer />
    </ConfigProvider>
  </Router>,
)
