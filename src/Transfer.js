import React, { useState } from 'react'
import { Form, Input, Grid } from 'semantic-ui-react'// Label, Icon,
import { TxButton } from './substrate-lib/components'
import { useSubstrateState } from './substrate-lib'
import {MoneyCollectOutlined} from '@ant-design/icons'

export default function Main(props) {
  const [status, setStatus] = useState(null)
  const [formState, setFormState] = useState({ addressTo: '', amount: 0 })

  const onChange = (_, data) =>
    setFormState(prev => ({ ...prev, [data.state]: data.value }))

  const { addressTo, amount } = formState

  const { keyring } = useSubstrateState()
  const accounts = keyring.getPairs()

  const availableAccounts = []
  accounts.map(account => {
    return availableAccounts.push({
      key: account.meta.name,
      text: account.meta.name,
      value: account.address,
    })
  })

  return (
    <Grid.Column width={8}>
      <h2 style={{color:'#3897e1'}}><MoneyCollectOutlined style={{marginRight: 5}}/>流通币转账</h2>
      {/* <h3 style={{marginTop: 0}}>转账</h3> */}
      <Form>
        <Form.Field>
          <Input
            fluid
            label="收款账户"
            type="text"
            placeholder="address"
            value={addressTo}
            maxLength="48"
            state="addressTo"
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field>
          <Input
            fluid
            label="转账金额"
            type="float"
            state="amount"
            min="0"
            maxLength="4"
            precision="2"
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field style={{ textAlign: 'center' }}>
          <TxButton
            label="转 账"
            type="SIGNED-TX"
            setStatus={setStatus}
            attrs={{
              palletRpc: 'balances',
              callable: 'transfer',
              inputParams: [addressTo, amount * 1000000000000],
              paramFields: [true, true],
            }}
          />
        </Form.Field>
        <div style={{ overflowWrap: 'break-word' }}>{status}</div>
      </Form>
    </Grid.Column>
  )
}
