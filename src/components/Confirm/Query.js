import React from 'react'
import { Button } from 'antd';
import axios from 'axios'
import { useSubstrateState } from '../../substrate-lib'
import { web3FromSource } from '@polkadot/extension-dapp'


export default function Query(props) {
  const data = [{
    id: 0, name: '张三', chainAddress: '5xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxrxxxx',
    hours: 'x', commName: 'xx社区', serviceContent: '志愿服务', date: '20xx-xx-xx'
  }]

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

  const query = async () => {
    props.changeBack()
    props.getStatus('')
    const fromAcct = await getFromAcct()
    if (props.commNow) {
      axios({
        method: 'get',
        url: 'https://db.timecoin.tech:21511/api/readApplyAdmin',
        params: {
          chainAddress: fromAcct[0],
          commNow: props.commNow
        }
      })
        .then(response => {
          if (response.data.status === 0) {
            props.getData(response.data.result)
          }
          if (response.data.status === 1) {
            props.getData(data)
            alert('您未有相关申请记录')
          }
          if (response.data.status === 2) {
            props.getData(data)
          }
        })
    }
  }

  const queryRefused = async () => {
    props.changeColumns()
    const fromAcct = await getFromAcct()
    if (props.commNow) {
      axios({
        method: 'get',
        url: 'https://db.timecoin.tech:21511/api/readRefusedApplyAdmin',
        params: {
          chainAddress: fromAcct[0],
          commNow: props.commNow
        }
      })
        .then(response => {
          if (response.data.status === 0) {
            props.getData(response.data.result)
          }
          if (response.data.status === 1) {
            props.getData(data)
            alert('您未有相关申请记录')
          }
          if (response.data.status === 2) {
            props.getData(data)
          }
        })
    }
  }
  const queryConfirmed = async () => {
    props.changeColumns()
    const fromAcct = await getFromAcct()
    if (props.commNow) {
      axios({
        method: 'get',
        url: 'https://db.timecoin.tech:21511/api/readConfirmedApplyAdmin',
        params: {
          chainAddress: fromAcct[0],
          commNow: props.commNow
        }
      })
        .then(response => {
          if (response.data.status === 0) {
            props.getData(response.data.result)
          }
          if (response.data.status === 1) {
            props.getData(data)
            alert('您未有相关申请记录')
          }
          if (response.data.status === 2) {
            props.getData(data)
          }
        })
    }
  }

  return (
    <span>
      <Button style={{ marginLeft: 20, color: '#3897e1', borderColor: '#3897e1' }} onClick={query}>查询待审核申请</Button>
      <Button style={{ marginLeft: 20, color: '#3897e1', borderColor: '#3897e1' }} onClick={queryConfirmed}>查询已通过申请</Button>
      <Button style={{ marginLeft: 20, color: '#3897e1', borderColor: '#3897e1' }} onClick={queryRefused}>查询已驳回申请</Button>
    </span>
  )
}
