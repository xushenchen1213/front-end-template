import React, { useState } from 'react'
import { Form, Input, Grid, Dropdown} from 'semantic-ui-react'
import { Button } from 'antd';
import { web3FromSource } from '@polkadot/extension-dapp'
// import * as fs from 'fs'
import {  ContractPromise } from '@polkadot/api-contract';
import { useSubstrateState } from './substrate-lib'
import axios from 'axios'



export default function Main(props) {
  // eslint-disable-next-line no-unused-vars
  const { api, currentAccount } = useSubstrateState()
  const getFromAcct = async () => {
    const {
      address,
      meta: { source, isInjected },
    } = currentAccount

    if (!isInjected) {
      return [currentAccount]
    }

    // currentAccount is injected from polkadot-JS extension, need to return the addr and signer object.
    // ref: https://polkadot.js.org/docs/extension/cookbook#sign-and-send-a-transaction
    const injector = await web3FromSource(source)
    return [address, { signer: injector.signer }]
  }

  // console.log(currentAccount.address);
    // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = useState(null)
  const [formState, setFormState] = useState({ addressTo: '', amount: 0 , abiFile: 'metadata.json'})

  const onChange = (_, data) =>
    setFormState(prev => ({ ...prev, [data.state]: data.value }))

  // eslint-disable-next-line no-unused-vars
  const { addressTo, abiFile } = formState
  const options = [{ key: "alice", text: "alice", value: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY" },
  { key: "alice_stash", text: "alice_stash", value: "5CG7gobD87jEafcgy5VGWyFcAyaNyYyhiRTYSMBH4kXbRWpGY" }]
  //  const { api } = useSubstrateState()
  const onContract = async () =>{
    const fromAcct = await getFromAcct()
    const account_now = fromAcct[0].address
    console.log(account_now);
    const address = '5CG7gobD87jEafcgy5VGWyFcAyaNyYyhiRTYSMBH4kXbRWpG';
  //   const Alice = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
    const value = 0;
    // NOTE the apps UI specified these in mega units
    const gasLimit = 30000n * 100000000n;

  //   const abi = JSON.parse(fs.readFileSync('/home/node1/Downloads/metadata.json', 'utf-8'));
    
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8081/api/checkUser',
      params: {
        fileName: abiFile
      }
    })
      .then(function (response) {
        console.log(response.data.abi);
        const abi = response.data.abi
        const contract = new ContractPromise(api, abi, address);
        // const { gasConsumed, result, output } = contract.query.totalSupply(currentAccount.address, { value, gasLimit }); 
        const { gasConsumed, result, output } = contract.query.totalSupply(account_now, { value, gasLimit }); 
            // The actual result from RPC as `ContractExecResult`
        console.log(result.toHuman());
        // gas consumed
        console.log(gasConsumed.toHuman());    
        // check if the call was successful
        if (result.isOk) {
            // should output 123 as per our initial set (output here is an i32)
            console.log('Success', output.toHuman());
        } else {
            console.error('Error', result.asErr);
        }
      })
  
  }


  return (
    <Grid.Column width={8}>
      <h1>Transfer</h1>
      <Form>
      <Form.Field>
          <Dropdown
            placeholder="Select from available addresses"
            fluid
            selection
            search
            options={options}
            state="addressTo"
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field>
          <Input
            fluid
            label="To"
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
            label="Amount"
            type="number"
            state="amount"
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field style={{ textAlign: 'center' }}>
          <Button onClick={onContract}>hello</Button>
        </Form.Field>
        <div style={{ overflowWrap: 'break-word' }}>{status}</div>
      </Form>
    </Grid.Column>
  )
}
