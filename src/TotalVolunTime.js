import React, { useEffect, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { Statistic, Grid, Card, Icon } from 'semantic-ui-react'

import { useSubstrateState } from './substrate-lib'

function Main(props) {
  const { api } = useSubstrateState()
  const [totalVoluntime, setTotalVoluntime] = useState(0)

  const voluntime = api.query.timebank.totalVoluntime

  useEffect(() => {
    let unsubscribeAll = null

    voluntime(time => {
      setTotalVoluntime(time.toNumber()/1000)
    })
      .then(unsub => {
        unsubscribeAll = unsub
      })
      .catch(console.error)

    return () => unsubscribeAll && unsubscribeAll()
  }, [voluntime])

  return (
    <Grid.Column>
      <Card style={{width: '100%'}}>
        <Card.Content textAlign="center">
          <Statistic
            className="block_number"
            label={'总志愿时长'}
            value={totalVoluntime? totalVoluntime: '0'}
          />
        </Card.Content>
        <Card.Content style={{textAlign: 'center'}} extra>
          TOTAL VOLUNTEER TIME
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
