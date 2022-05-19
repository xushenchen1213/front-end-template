/* eslint-disable no-unused-vars */

import React, {useState} from 'react'

import { Button } from 'antd';
import axios from 'axios'
// import { metadataKaifeng } from '../../ReadMetadata';
import { useSubstrateState } from '../../substrate-lib'
import { web3FromSource } from '@polkadot/extension-dapp'
import {  ContractPromise } from '@polkadot/api-contract'

export default function Action(props) {
  const [isOn, setIsOn] = useState(false)
  // const [commAddress, setCommAddress] = useState('')
  // const [abi, setAbi] = useState({})
  const [status, setStatus] = useState()


  const { api, currentAccount } = useSubstrateState()
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

  const accept = async()=> {
    const fromAcct = await getFromAcct()
    console.log(props.record);
    if (props.record.eventId===0) return
    // get community messages
    axios({
      method: 'get',
      url: 'https://timecoin.tech:8082/api/getCommunity',
      params: {
        address: fromAcct[0]
      }
    })
      .then(response => {
        if (response.data.status===0) {
          // setCommAddress(response.data.commAddress)
          // setAbi(response.data.abi)
          // const address = '5FXJVbBX5QtRcjBsjn3i8QcPp5cGsNDJLCfcuMVBWKoFnAEC';
          const value = 0;
          const gasLimit = 30000n * 1000000n;
          const contract = new ContractPromise(api, response.data.abi, response.data.commAddress);
          const eventId = props.record.eventId.toString()
          const accountId = props.record.publicKey
          const volunTime = props.record.hours * 1000
          contract.tx
          .doVerification({ value, gasLimit },eventId, accountId, volunTime)
          .signAndSend(...fromAcct, (result) => {
            console.log(result);
            console.log(result.dispatchError);
            if(result.contractEvents) {
              axios({
                method: 'get',
                url: 'https://timecoin.tech:8082/api/accept',
                params:{
                  eventId: props.record.eventId
                }
              })
              .then( response => {
                console.log(props.record.eventId);
                console.log(response)
                setIsOn({isOn: true})
                setStatus('😉 已铸币')
              }) 
            }   
            if (result.dispatchError)  {
              setStatus('😞 失败了')            
            }
          });      
        }
      })
  }
  const refuse = async()=> {
    const fromAcct = await getFromAcct()
    if (props.record.eventId===0) return
    console.log(fromAcct);
    setIsOn({isOn: true})
    setStatus('😞 已拒绝')
    axios({
      method: 'get',
      url: 'https://timecoin.tech:8082/api/reject',
      params:{
        eventId: props.record.eventId
      }
    })
    .then( response => {
      console.log(props.record.eventId);
      console.log(response)
      setIsOn({isOn: true})
    })  
  }

  return (
    <div style={{minWidth: '18em' }}>
      <Button onClick={accept} style={{paddingLeft: 4, paddingRight: 4}} disabled={isOn}>通过申请</Button>
      <Button onClick={refuse} style={{marginLeft: 10, paddingLeft: 4, paddingRight: 4}} disabled={isOn}>拒绝申请</Button>
      <span>{status}</span>
    </div>
    
  )
}
