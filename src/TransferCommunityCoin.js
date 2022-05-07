import React, { useState } from 'react'
import { Form, Input, Grid, Dropdown } from 'semantic-ui-react'
import { Button } from 'antd';
import { useSubstrateState } from './substrate-lib'
import { web3FromSource } from '@polkadot/extension-dapp'
import {  ContractPromise } from '@polkadot/api-contract'
import { metadata } from './ReadMetadate';

export default function Main(props) {
    const [formState, setFormState] = useState({ addressTo: '', amount: 0 })
  
    const onChange = (_, data) =>
      setFormState(prev => ({ ...prev, [data.state]: data.value }))
    
    const { api, currentAccount } = useSubstrateState()

    const { addressTo } = formState
  
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

    const getFromAcct = async () => {
      const {
        address,
        meta: { source, isInjected },
      } = currentAccount
  
      if (!isInjected) {
        return [currentAccount]
      }

      const injector = await web3FromSource(source)
      return [address, { signer: injector.signer }]
    }

    const abi = JSON.parse(metadata)
    const onTransfer = async () => {
        const fromAcct = await getFromAcct()
        const address = '5CWpSBs9fKHUAVsVkgg71VxWTjjpXdwiq5GQ8oG5UhCxFzxH';
        const value = 0;
        const gasLimit = 30000n * 1000000n;
        const contract = new ContractPromise(api, abi, address);
        const toAmount = addressTo;
        const balance = 1 * 1000000000000
        await contract.tx
        .transfer({ value, gasLimit },toAmount, balance)
        .signAndSend(...fromAcct, (result) => {
          console.log(result);
        });        
      }

    return (
      <Grid.Column width={8}>
        <h1>社区币转账</h1>
        <Form>  
          <Form.Field>
            <Dropdown
              placeholder="请选择付款账号"
              fluid
              selection
              search
              options={availableAccounts}
              state="addressTo"
              onChange={onChange}
            />
          </Form.Field>
  
          <Form.Field>
            <Input
              fluid
              label="收款账户"
              type="text"
              placeholder="address"
              value={addressTo}
              state="addressTo"
              onChange={onChange}
            />
          </Form.Field>
          <Form.Field>
            <Input
              fluid
              label="转账金额"
              type="number"
              state="amount"
              onChange={onChange}
            />
          </Form.Field>
          <Form.Field style={{ textAlign: 'center' }}>
            <Button onClick={onTransfer}>交易</Button>
          </Form.Field>
        </Form>
      </Grid.Column>
    )
    }