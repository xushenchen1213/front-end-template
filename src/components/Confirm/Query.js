import React from 'react'

import { Button } from 'antd';
import axios from 'axios'
import { useSubstrateState } from '../../substrate-lib'
import { web3FromSource } from '@polkadot/extension-dapp'


export default function Query(props) {

  const { currentAccount } = useSubstrateState()
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

  const query = async ()=> {
    const fromAcct = await getFromAcct()
    axios({
      method: 'get',
      url: 'https://timecoin.tech:8082/api/readApplyAdmin',
      params: {
        chain_address: fromAcct[0]
      }
    })
    .then( response => {
      console.log(response.data)
      if (response.data.status === 0) {
        props.getData(response.data.results)
      }
    })  
  }

  return (
    <Button style={{marginLeft: 20, color: '#3897e1', borderColor:'#3897e1'}} onClick={query}>查询待确认申请</Button>
  )
}