// import React from 'react'
import { Form, Input, Button } from 'antd';

import axios from 'axios'
import React from 'react'

import { metadata } from './ReadMetadate';
import { useSubstrateState } from './substrate-lib'
import { web3FromSource } from '@polkadot/extension-dapp'
import {  ContractPromise } from '@polkadot/api-contract'

export default function ApplyForCreatCoin() {
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

  const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
  };
  const tailLayout = {
      wrapperCol: {
        offset: 8,
        span: 16,
      },
  };


  const [form] = Form.useForm();


  const onFinish = async(values) => { 
    console.log(values.id);
    const abi = JSON.parse(metadata)
    const fromAcct = await getFromAcct()
    const address = '5CWpSBs9fKHUAVsVkgg71VxWTjjpXdwiq5GQ8oG5UhCxFzxH';
    const value = 0;
    const gasLimit = 30000n * 1000000n;
    const contract = new ContractPromise(api, abi, address);
    let eventId;
    let accountId;
    let volunTime;
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8081/api/query',
      params:{
        id: values.id
      }
    })
    .then( response => {
      accountId = response.data.result[0].publicKey
      volunTime = response.data.result[0].hours
      eventId = values.id.toString();
      console.log(eventId);
      console.log(accountId);
      console.log(volunTime);
    }) 
    await contract.tx
    .doVerification({ value, gasLimit },eventId, accountId, volunTime)
    .signAndSend(...fromAcct, (result) => {
      console.log(result);
      if(!result.dispatchError) {
        axios({
          method: 'get',
          url: 'http://127.0.0.1:8081/api/accept',
          params:{
            id: values.id
          }
        })
        .then( response => {
          console.log(response)

    
        }) 
      }     
    }); 
  };


  return (
    <div>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="id"
        label="编号"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input style={{
            width: 200,
          }}/>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  )
}
