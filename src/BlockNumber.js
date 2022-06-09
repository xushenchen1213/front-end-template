import React, { useEffect, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { Statistic, Grid, Card, Icon } from 'semantic-ui-react'

import { useSubstrateState } from './substrate-lib'

function Main(props) {
  const { api } = useSubstrateState()
  const { finalized } = props
  const [blockNumber, setBlockNumber] = useState(0)
  const [blockNumberTimer, setBlockNumberTimer] = useState(0)

  const bestNumber = finalized
    ? api.derive.chain.bestNumberFinalized
    : api.derive.chain.bestNumber

  useEffect(() => {
    let unsubscribeAll = null

    bestNumber(number => {
      // Append `.toLocaleString('en-US')` to display a nice thousand-separated digit.
      setBlockNumber(number.toNumber().toLocaleString('en-US'))
      setBlockNumberTimer(0)
    })
      .then(unsub => {
        unsubscribeAll = unsub
      })
      .catch(console.error)

    return () => unsubscribeAll && unsubscribeAll()
  }, [bestNumber])

  const timer = () => {
    setBlockNumberTimer(time => time + 1)
  }

  useEffect(() => {
    const id = setInterval(timer, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <Grid.Column>
      <Card style={{width: '100%'}}>
        <Card.Content textAlign="center">
          <Statistic
            className="block_number"
            label={(finalized ? '已确认区块号' : '当前区块号')}
            value={blockNumber}
          />
        </Card.Content>
        <Card.Content textAlign="center" extra>
          <span style={{float: 'left'}}>
          <Icon name="time" /> {blockNumberTimer}
          </span>
          <span style={{marginRight: 26}}>CURRENT BLOCK</span>
        </Card.Content>
      </Card>
    </Grid.Column>
  )
}

export default function BlockNumber(props) {
  const { api } = useSubstrateState()
  return api.derive &&
    api.derive.chain &&
    api.derive.chain.bestNumber &&
    api.derive.chain.bestNumberFinalized ? (
    <Main {...props} />
  ) : null
}
