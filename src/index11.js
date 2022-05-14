import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.min.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { SubstrateContextProvider } from './substrate-lib'
// import User from './Auser'
// import Admin from './Admin'
// as Router, Routes, Route  BrowserRouter, 
// import App from './App'

//引入我们第一步编写的高阶组件
// import { Route, IndexRedirect } from 'react-router';
// import Loadable from './Loadable.jsx';
// const User = Loadable(() => import('./Auser'));
// const Admin = Loadable(() => import('./Admin'));

import asyncComponents from './AsyncLoading'
const User = asyncComponents(() => import('./Auser'))
const Admin = asyncComponents(() => import('./Admin'))



function Main() {
  return (
    <SubstrateContextProvider>
        <Routes>
          <Route path='/' exact element={<User />}></Route>
          <Route path='/user' exact element={<User />}></Route>
          <Route path='/admin' exact element={<Admin />}></Route>
          <Route path='*' exact element={<Navigate to='/user' />}></Route>
        </Routes>
    </SubstrateContextProvider>
  )
}

ReactDOM.render(
  // <React.StrictMode>
  //   <Main />
  // </React.StrictMode>,
  <BrowserRouter>
    {/* <AppCopy /> */}
    <Main />
  </BrowserRouter>,
  document.getElementById('root')
)
