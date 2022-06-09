import axios from 'axios'
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import { Statistic, Grid, Card } from 'semantic-ui-react'
// import url from './config/ReadUrl'
import { useSubstrateState } from './substrate-lib'

function Main(props) {
  const [numOfUsers, setNumOfUsers] = useState(0)

  const numberOfUsers = () => {

    new Promise((resolve) => {
      axios({
        method: 'get',
        url: 'https://db.timecoin.tech:21511/api/numberOfUsers',
      })
      .then(res =>{
        const count = 'count(distinct chain_address)'
        const number = res.data.result[count]
        setNumOfUsers(number)
        resolve()
      })
    })
  }

  useEffect(() => {
    numberOfUsers()
    setInterval(() => {
      numberOfUsers()
    }, 10000)
  },[])

  return (
    <Grid.Column>
      <Card style={{ width: '100%' }}>
        <Card.Content textAlign="center">
          <Statistic
            className="block_number"
            label={'社区成员总数'}
            value={numOfUsers}
          />
          {/* <Button onClick={numberOfUsers}>query</Button> */}
        </Card.Content>
        <Card.Content style={{ textAlign: 'center' }} extra>
          TOTAL NUMBER OF USERS
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
