import React, { useState } from 'react'
import { Button } from 'antd';
import axios from 'axios'
import qs from 'qs'
import { useSubstrateState } from '../../substrate-lib'
import { web3FromSource } from '@polkadot/extension-dapp'
import { ContractPromise } from '@polkadot/api-contract'

export default function Action(props) {
  const [isOn, setIsOn] = useState(false)
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

  // eslint-disable-next-line no-unused-vars
  const accept1 = async () => {
    const fromAcct = await getFromAcct()
    if (props.record.id === 0) return
    // get community messages
    const form = {
      commNow: props.commNow,
      fromAcct: fromAcct[0],
      id: props.record.id
    }
    axios({
      method: 'post',
      url: 'https://db.timecoin.tech:21511/api/accept1',
      data: qs.stringify(form),
      header: { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8' }
    })
      .then(response => {
        if (response.data.status === 0) {
          const value = 0;
          const gasLimit = 30000n * 1000000n;
          const abi = response.data.abi
          const commAddress = response.data.commAddress
          const contract = new ContractPromise(api, abi, commAddress);
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
                    setStatus('😉 √')
                    props.getStatus('😉 √')
                  })
              }
              if (result.dispatchError) {
                setStatus('😞 X')
                props.getStatus('😞 X')
              }
            });
        }
      })
  }
  const accept = async () => {
    const fromAcct = await getFromAcct()
    if (props.record.id === 0) return
    // get community messages
    axios({
      method: 'get',
      url: 'https://db.timecoin.tech:21511/api/getCommNow',
      params: {
        commNow: props.commNow,
        fromAcct: fromAcct[0]
      }
    })
      .then(response => {
        if (response.data.status === 0) {
          const value = 0;
          const gasLimit = 30000n * 1000000n;
          const abi = response.data.abi
          const commAddress = response.data.commAddress
          const contract = new ContractPromise(api, abi, commAddress);
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
                    setStatus('😉 √')
                    props.getStatus('😉 √')
                  })
              }
              if (result.dispatchError) {
                setStatus('😞 X')
                props.getStatus('😞 X')
              }
            });
        }
      })
  }
  const refuse = async () => {
    if (props.record.id === 0) return
    const fromAcct = await getFromAcct()
    // get community messages
    axios({
      method: 'get',
      url: 'https://db.timecoin.tech:21511/api/getCommNow',
      params: {
        commNow: props.commNow,
        fromAcct: fromAcct[0]
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
            .then(() => {
              setIsOn({ isOn: true })
              setStatus('😞 X')
            })
        }
      });
  }

  return (
    <div>
      <div style={{ marginBottom: 4 }}><Button onClick={accept} style={{ paddingLeft: 4, paddingRight: 4 }} disabled={isOn}>通过</Button></div>
      <div><Button onClick={refuse} style={{ paddingLeft: 4, paddingRight: 4 }} disabled={isOn}>拒绝</Button></div>
      <span>{status}</span>
    </div>

  )
}
