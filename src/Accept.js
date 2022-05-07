import React, {useState} from 'react'

import { Input, Button } from 'antd';
import axios from 'axios'
import { metadata } from './ReadMetadate';
import { useSubstrateState } from './substrate-lib'
import { web3FromSource } from '@polkadot/extension-dapp'
import {  ContractPromise } from '@polkadot/api-contract'

export default function Accept(props) {
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
  const [isOn, setIsOn] = useState(false)
  const acc = async()=> {
    const abi = JSON.parse(metadata)
    const fromAcct = await getFromAcct()
    const address = '5CWpSBs9fKHUAVsVkgg71VxWTjjpXdwiq5GQ8oG5UhCxFzxH';
    const value = 0;
    const gasLimit = 30000n * 1000000n;
    const contract = new ContractPromise(api, abi, address);
    const eventId = props.data[0].id.toString()
    const accountId = props.data[0].publicKey
    const volunTime = props.data[0].hours * 1000
    await contract.tx
    .doVerification({ value, gasLimit },eventId, accountId, volunTime)
    .signAndSend(...fromAcct, (result) => {
      console.log(result);
      if(!result.dispatchError) {
        axios({
          method: 'get',
          url: 'http://127.0.0.1:8081/api/accept',
          params:{
            id: props.data[0].id
          }
        })
        .then( response => {
          console.log(props.data[0].id);
          console.log(response)
          setIsOn({isOn: true})
    
        }) 
      }     
    });  
  

  }
  return (
    <div>
      <Input />
      <Button onClick={acc} disabled={isOn}>通过申请</Button>
    </div>


  )
}
