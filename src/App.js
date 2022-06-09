import React, { createRef, useState } from 'react'
import { Container, Dimmer, Loader, Grid, Sticky, Message } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { SubstrateContextProvider, useSubstrateState } from './substrate-lib'
import { DeveloperConsole } from './substrate-lib/components'
import AccountSelector from './AccountSelector'
import Balances from './Balances'
import BlockNumber from './BlockNumber'
import TotalVolunTime from './TotalVolunTime'
import TotalUsersNum from './TotalUsersNum'
import TransactionNum from './TransactionNum'
import TransferCommunityCoin from './TransferCommunityCoin'
import Transfer from './Transfer'
import ConfirmForStudents from './components/ConfirmForStudents/Confirm'
import Confirm from './components/Confirm/Confirm'
import Community from './components/Community/Community'
import ApplyForCreatCoin from './ApplyForCreatCoin'
import ChangeAddress from './ChangeAddress'
import { Routes, Route, Navigate } from "react-router-dom"

//路由模块
function Main() {
  return (
    <div>
      <Routes>
        <Route path='/' exact element={<User />} ></Route>
        <Route path='/admin' exact element={<Admin />}></Route>
        <Route path='/user' exact element={<User />}></Route>
        <Route path='*' exact element={<Navigate to='/user' />}></Route>
      </Routes>
    </div>
  )
}
//背景样式
const sectionStyle = {
  width: '100%',
  height: '100%',
  background: `#f5f6fa`,
  backgroundSize: 'cover'
}
//用户界面
//用户界面
//用户界面
function User() {
  const [comm, setComm] = useState([])
  const getComm = (tableData) => {

    setComm(tableData)
  }
  const { apiState, apiError, keyringState } = useSubstrateState()

  const loader = text => (
    <Dimmer active>
      <Loader size="small">{text}</Loader>
    </Dimmer>
  )
  const message = errObj => (
    <Grid centered columns={2} padded>
      <Grid.Column>
        <Message
          negative
          compact
          floating
          header="Error Connecting to Substrate"
          content={`Connection to websocket '${errObj.target.url}' failed.`}
        />
      </Grid.Column>
    </Grid>
  )

  if (apiState === 'ERROR') return message(apiError)
  else if (apiState !== 'READY') return loader('Connecting to Substrate')

  if (keyringState !== 'READY') {
    return loader(
      "Loading accounts (please review any extension's authorization)"
    )
  }
  const contextRef = createRef()

  return (
    <div style={sectionStyle} ref={contextRef}>
      <Sticky context={contextRef}>
        <AccountSelector />
      </Sticky>
      <Container style={{ marginTop: 30 }}>
        <Grid stackable columns="equal">
        <Grid.Row style={{ background: "#fff", opacity: 0.9, borderRadius: 10 }} >
            <TotalUsersNum />
            <TransactionNum />
            <TotalVolunTime />
            <BlockNumber />
          </Grid.Row>
          <Grid.Row stretched>
            <Balances getComm={getComm} />
          </Grid.Row>
          <Grid.Row style={{ paddingTop: 0}}>
            <Grid.Column style={{ paddingLeft: 0, margin: 0 }}>
              <div style={{ padding: 25, border: 1, borderRadius: 10, background: '#fff', opacity: 0.9 }}>
                <ApplyForCreatCoin comm={comm} />
              </div>
            </Grid.Column>
            <Grid.Column stretched style={{ paddingRight: 0, margin: 0 }}>
              <div style={{ border: 1, borderRadius: 10, padding: 25, opacity: 0.9, background: '#fff' }}>
                <Transfer />
                <TransferCommunityCoin comm={comm} />
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ paddingTop: 0}} stretched>
            <ConfirmForStudents comm={comm} style={{ marginLeft: 30 }} />
          </Grid.Row>
        </Grid>
      </Container>
      <DeveloperConsole />
    </div>
  )
}
//管理员界面
//管理员界面
//管理员界面
function Admin() {
  const [comm, setComm] = useState([])
  const getComm = (tableData) => {
    setComm(tableData)
  }

  const { apiState, apiError, keyringState } = useSubstrateState()

  const loader = text => (
    <Dimmer active>
      <Loader size="small">{text}</Loader>
    </Dimmer>
  )
  const message = errObj => (
    <Grid centered columns={2} padded>
      <Grid.Column>
        <Message
          negative
          compact
          floating
          header="Error Connecting to Substrate"
          content={`Connection to websocket '${errObj.target.url}' failed.`}
        />
      </Grid.Column>
    </Grid>
  )

  if (apiState === 'ERROR') return message(apiError)
  else if (apiState !== 'READY') return loader('Connecting to Substrate')

  if (keyringState !== 'READY') {
    return loader(
      "Loading accounts (please review any extension's authorization)"
    )
  }

  const contextRef = createRef()

  return (
    <div style={sectionStyle} ref={contextRef}>
      <Sticky style={{ background: "#fff" }} context={contextRef}>
        <AccountSelector />
      </Sticky>
      <Container style={{ marginTop: 30 }}>
        <Grid stackable columns="equal">
          <Grid.Row style={{ background: "#fff", opacity: 0.9, borderRadius: 10 }} >
            <TotalUsersNum />
            <TransactionNum />
            <TotalVolunTime />
            <BlockNumber />
          </Grid.Row>
          <Grid.Row stretched>
            <Balances getComm={getComm} />
          </Grid.Row>
          <Grid.Row style={{ padding: 25, border: 1, borderRadius: 10, background: '#fff', opacity: 0.9 }}>
            <Transfer />
            <TransferCommunityCoin comm={comm} />
          </Grid.Row>
          <Grid.Row>
            <Grid.Column style={{ paddingLeft: 0 }}>
              <div style={{ padding: 25, border: 1, borderRadius: 10, background: '#fff', opacity: 0.9 }}>
                <ApplyForCreatCoin comm={comm} />
              </div>
            </Grid.Column>
            <Grid.Column style={{ paddingRight: 0 }} stretched>
              <div style={{ padding: 25, border: 1, borderRadius: 10, background: '#fff', opacity: 0.9 }}>
                <Community comm={comm} />
                <ChangeAddress comm={comm} />
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row style={{ paddingTop: 0 }}>
            <Confirm comm={comm} style={{ marginLeft: 30 }} />
          </Grid.Row>
        </Grid>
      </Container>
      <DeveloperConsole />
    </div>
  )
}

export default function Appp() {

  return (
    <SubstrateContextProvider>
      <Main />
    </SubstrateContextProvider>
  )
};
