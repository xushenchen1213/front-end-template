/* eslint-disable no-unused-vars */

import React, { useState } from 'react'
// import url from '../../config/ReadUrl'
import { Button } from 'antd';
import axios from 'axios'
// import { metadataKaifeng } from '../../ReadMetadata';
import { useSubstrateState } from '../../substrate-lib'
import { web3FromSource } from '@polkadot/extension-dapp'
import { ContractPromise } from '@polkadot/api-contract'

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

  const accept = async () => {
    const fromAcct = await getFromAcct()
    if (props.record.id === 0) return
    // get community messages
    axios({
      method: 'get',
      url: 'https://db.timecoin.tech:21511/api/getCommNow',
      params: {
        commNow: props.commNow
      }
    })
      .then(response => {
        if (response.data.status === 0) {
          const value = 0;
          const gasLimit = 30000n * 1000000n;
          const contract = new ContractPromise(api, response.data.abi, response.data.commAddress);
          const id = props.record.id
          const chainAddress = props.record.chainAddress
          const volunTime = props.record.hours * 1000
          contract.tx
            .doVerification({ value, gasLimit }, id, chainAddress, volunTime)
            .signAndSend(...fromAcct, (result) => {
              if (result.contractEvents) {
                axios({
                  method: 'get',
                  url: 'https://db.timecoin.tech:21511/api/accept',
                  params: {
                    id: props.record.id
                  }
                })
                  .then(response => {
                    setIsOn({ isOn: true })
                    setStatus('😉 已铸币')
                  })
              }
              if (result.dispatchError) {
                setStatus('😞 失败了')
              }
            });
        }
      })
  }
  const refuse = async () => {
    if (props.record.id === 0) return
    // get community messages
    axios({
      method: 'get',
      url: 'https://db.timecoin.tech:21511/api/getCommNow',
      params: {
        commNow: props.commNow
      }
    })
      .then(response => {
        if (response.data.status === 0) {
          const id = props.record.id
          axios({
            method: 'get',
            url: 'https://db.timecoin.tech:21511/api/reject',
            params: {
              id: id
            }
          })
            .then(response => {
              setIsOn({ isOn: true })
              setStatus('😞 已拒绝')
            })
        }
      });
  }

return (
  <div style={{ minWidth: '15em' }}>
    <Button onClick={accept} style={{ paddingLeft: 4, paddingRight: 4 }} disabled={isOn}>通过申请</Button>
    <Button onClick={refuse} style={{ marginLeft: 10, paddingLeft: 4, paddingRight: 4 }} disabled={isOn}>拒绝申请</Button>
    <span>{status}</span>
  </div>

)
}
