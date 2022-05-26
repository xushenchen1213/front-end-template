// import Background from '../public/assets/whiteClockDark.jpg'
import React, { createRef } from 'react'
import {
  Container,
  Dimmer,
  Loader,
  Grid,
  Sticky,
  Message,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import { SubstrateContextProvider, useSubstrateState } from './substrate-lib'
import { DeveloperConsole } from './substrate-lib/components'
import AccountSelector from './AccountSelector'
import Balances from './Balances'
import BlockNumber from './BlockNumber'
import Metadata from './Metadata'
import NodeInfo from './NodeInfo'
import TransferCommunityCoin from './TransferCommunityCoin'
import Transfer from './Transfer'
import ConfirmForStudents from './components/ConfirmForStudents/Confirm'
import Confirm from './components/Confirm/Confirm'
import Community from './components/Community/Community'
import ApplyForCreatCoin from './ApplyForCreatCoin'
import ChangeAddress from './ChangeAddress'
import { Routes, Route, Navigate } from "react-router-dom"

// import asyncComponents from './AsyncLoading'
// const User = asyncComponents(() => import('./Auser'))
// const Admin = asyncComponents(() => import('./Admin'))
import Appp from './Appp'
import Apppp from './Apppp'


function Main() {
  return (
    <div>
      <Routes>
        <Route path='/' exact element={<User />}></Route>
        <Route path='/user' exact element={<User />}></Route>
        <Route path='/admin' exact element={<Admin />}></Route>
        <Route path='/index' exact element={<Appp />}></Route>
        <Route path='/index1' exact element={<Apppp />}></Route>
        <Route path='*' exact element={<Navigate to='/user' />}></Route>
      </Routes>
    </div>
  )
}
const sectionStyle = {
  width: '100%',
  height: '100%',
  // background: `url(${Background}) no-repeat center center fixed`,
  background: `#f5f6fa`,
  backgroundSize: 'cover',
  // opacity: 0.9,
  // filter: 10
}

function User() {

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
          <Grid.Row stretched>
            <Balances />
          </Grid.Row>
          <Grid.Row>
            <ConfirmForStudents style={{ border: 1, background: '#fff', paddingTop: 15, paddingBottom: 15 }} />
          </Grid.Row>
          <Grid.Row>
            <Grid.Column style={{ paddingLeft: 0, margin: 0 }}>
              <div style={{ padding: 25, border: 1, borderRadius: 10, background: '#fff', opacity: 0.9 }}>
                <ApplyForCreatCoin />
              </div>
            </Grid.Column>
            <Grid.Column stretched style={{ paddingRight: 0, margin: 0 }}>
              <div style={{ border: 1, borderRadius: 10, padding: 25, opacity: 0.9, background: '#fff' }}>
                <Transfer />
                {/* <div style={{ color: '#fff' }}>--------------------------------------------------------------------------------------------------------------</div> */}
                <TransferCommunityCoin />
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
      <DeveloperConsole />
    </div>
  )
}
function Admin() {
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
          <Grid.Row style={{ background: "#fff", opacity: 0.9, borderRadius: 10 }} stretched>
            <NodeInfo />
            <Metadata />
            <BlockNumber />
            <BlockNumber finalized />
          </Grid.Row>
          <Grid.Row stretched>
            <Balances />
          </Grid.Row>
          <Grid.Row style={{ padding: 25, border: 1, borderRadius: 10, background: '#fff', opacity: 0.9 }}>
            {/* <div style={{ padding: 25, border: 1, borderRadius: 10, background: '#fff', opacity: 0.9 }}> */}
            <Transfer />
            <TransferCommunityCoin />
            {/* </div> */}
          </Grid.Row>
          <Grid.Row>
            <Grid.Column style={{paddingLeft: 0}}>
              <div style={{ padding: 25, border: 1, borderRadius: 10, background: '#fff', opacity: 0.9 }}>
                <ApplyForCreatCoin />
              </div>
            </Grid.Column>
            <Grid.Column style={{paddingRight: 0}} stretched>
            <div style={{ padding: 25, border: 1, borderRadius: 10, background: '#fff', opacity: 0.9 }}>
              <Community />
              <ChangeAddress />
              </div>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Confirm style={{ marginLeft: 30 }} />
          </Grid.Row>

        </Grid>
      </Container>
      <DeveloperConsole />
    </div>
  )
}

export default function App() {
  return (
    <SubstrateContextProvider>
      <Main />
    </SubstrateContextProvider>
  )
}
