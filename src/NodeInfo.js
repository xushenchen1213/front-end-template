import React, { useEffect, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { Card, Icon, Grid } from 'semantic-ui-react'

import { useSubstrateState } from './substrate-lib'

function Main(props) {
  // eslint-disable-next-line no-unused-vars
  const { api, socket } = useSubstrateState()
  // eslint-disable-next-line no-unused-vars
  const [nodeInfo, setNodeInfo] = useState({})

  useEffect(() => {
    const getInfo = async () => {
      try {
        const [chain, nodeName, nodeVersion] = await Promise.all([
          api.rpc.system.chain(),
          api.rpc.system.name(),
          api.rpc.system.version(),
        ])
        setNodeInfo({ chain, nodeName, nodeVersion })
      } catch (e) {
        console.error(e)
      }
    }
    getInfo()
  }, [api.rpc.system])

  return (
    <Grid.Column>
      <Card style={{width: '100%', height: '100%'}}>
        <Card.Content textAlign="center">
          {/* <Card.He>{nodeInfo.nodeName}</Card.He"ader> */}
          <Card.Header style={{fontSize: 26, marginTop: 10, color:'#3897e1'}}>结 晶 时 间 链</Card.Header>
          {/* <Card.Meta>
            <span>宣传标语</span>
            <span>{nodeInfo.chain}</span>
          </Card.Meta> */}
          {/* <Card.Description>{socket}</Card.Description> */}
          <Card.Description 
          style={{color: '#ccc', 
          marginTop: 12, 
          fontWeight: 'bolder', 
          fontSize: 14}}>基于区块链的时间存取与跨时空互惠兑换方案</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Icon name="time" />
        </Card.Content>
      </Card>
    </Grid.Column>
  )
}

export default function NodeInfo(props) {
  const { api } = useSubstrateState()
  return api.rpc &&
    api.rpc.system &&
    api.rpc.system.chain &&
    api.rpc.system.name &&
    api.rpc.system.version ? (
    <Main {...props} />
  ) : null
}
