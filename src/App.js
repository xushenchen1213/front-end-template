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

// import Router from './Routes/index.js'
import AccountSelector from './AccountSelector'
// import Frame from './components/Frame/Index'
// import Apppp from './Apppp'
import Balances from './Balances'
import BlockNumber from './BlockNumber'
import Events from './Events'
// import Interactor from './Interactor'
import Metadata from './Metadata'
import NodeInfo from './NodeInfo'
import TransferCommunityCoin from './TransferCommunityCoin'
import Transfer from './Transfer'
import Confirm from './Confirm'
// import Upgrade from './Upgrade'
import Community from './Community'
import ApplyForCreatCoin from './ApplyForCreatCoin'




function Main() {
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
    <div ref={contextRef}>
      {/* <Sider/> */}
      <Sticky context={contextRef}>
        <AccountSelector />
      </Sticky>
      <Container>
        {/* <Router></Router> */}
        {/* <Apppp /> */}
        <Grid stackable columns="equal">
          <Grid.Row stretched>
            <NodeInfo />
            <Metadata />
            <BlockNumber />
            <BlockNumber finalized />
          </Grid.Row>
          <Grid.Row>
            <Transfer />
            {/* <Upgrade /> */}
            <Community />
          </Grid.Row>
          <Grid.Row>
            <ApplyForCreatCoin />
          </Grid.Row>                  
          <Grid.Row>
            <Confirm style={{ marginLeft: 30 }}/>
          </Grid.Row>                  
          <Grid.Row stretched>
            <Balances />
          </Grid.Row>          
          <Grid.Row>
            {/* <Interactor /> */}
            <Events />
          </Grid.Row>          
          <Grid.Row>
            <TransferCommunityCoin />
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
