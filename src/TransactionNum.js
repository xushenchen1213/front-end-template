import React, { useEffect, useState } from 'react'
import { Statistic, Grid, Card } from 'semantic-ui-react'

import { useSubstrateState } from './substrate-lib'

function Main(props) {
  const { api } = useSubstrateState()
  const { finalized } = props
  const [transactionNum, setTransactionNum] = useState(0)

  const transaction = api.query.transactionPayment.transactionNum

  useEffect(() => {
    let unsubscribeAll = null

    transaction(number => {
      setTransactionNum(number.toHuman())
    })
      .then(unsub => {
        unsubscribeAll = unsub
      })
      .catch(console.error)

    return () => unsubscribeAll && unsubscribeAll()
  }, [transaction])

  return (
    <Grid.Column>
      <Card style={{width: '100%'}}>
        <Card.Content textAlign="center">
          <Statistic
            className="block_number"
            label={(finalized ? '最新产生' : '总交易次数')}
            value={transactionNum? transactionNum: '0'}
          />
        </Card.Content>
        <Card.Content extra>
          {/* <Icon name="time" /> {blockNumberTimer} */}
          TOTALNUMBER OF TRANSACTIONS
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
