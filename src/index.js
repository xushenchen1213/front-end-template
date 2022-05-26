import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.min.css'
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { BrowserRouter} from 'react-router-dom'
import Appp from './Appp'

ReactDOM.render(
  // <React.StrictMode>
    <BrowserRouter>
      <Appp />
    </BrowserRouter>,

  document.getElementById('root')
)
