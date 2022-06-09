import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.min.css'
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { BrowserRouter} from 'react-router-dom'
import App from './App'

ReactDOM.render(
  // <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>,

  document.getElementById('root')
)
