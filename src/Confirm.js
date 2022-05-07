import React, { Component } from 'react'
// import { Button, message } from 'antd';
import { Table, Button } from 'antd';
import axios from 'axios'
// import { metadata } from './ReadMetadate';
import { useSubstrateState } from './substrate-lib'
import { web3FromSource } from '@polkadot/extension-dapp'
import Accept from './Accept'
import Accept1 from './Accept1'

export default class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: '编号', dataIndex: 'id', key: 'id' },
        { title: '姓名', dataIndex: 'name', key: 'name' },
        { title: '公钥', dataIndex: 'publicKey', key: 'publicKey' },
        { title: '志愿时长', dataIndex: 'hours', key: 'hours' },
        { title: '服务内容', dataIndex: 'serviceContent', key: 'serviceContent' },
        { title: '日期', dataIndex: 'date', key: 'date' },
        {
          title: '确认',
          dataIndex: '',
          key: 'x',
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          render: () => <Accept data={this.state.data}/>
        },
        {
          title: '拒绝',
          dataIndex: '',
          key: 'y',
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          render: () => <Button onClick={this.reject}>拒绝申请</Button>
        }
      ],
      data: []
    };
  }

  getFromAcct = async () => {
    const { currentAccount } = useSubstrateState()
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
  // onTransfer = async () => {
  //   const { api } = useSubstrateState()
  //     const abi = JSON.parse(metadata)
  //     const fromAcct = await this.getFromAcct()
  //     const address = '5FGJfn14VsWVpsvekenEL175soEZXqbt21rbojnaCv1iD6j6';
  //     const value = 0;
  //     const gasLimit = 30000n * 1000000n;
  //     const contract = new ContractPromise(api, abi, address);
  //     const eventId = this.state.data[0].id.toString()
  //     const accountId = this.state.data[0].publicKey
  //     const volunTime = this.state.data[0].hours
  //     await contract.tx
  //     .doVerification({ value, gasLimit },eventId, accountId, volunTime)
  //     .signAndSend(...fromAcct, (result) => {
  //       console.log(result);
  //     });        
  //   }
  accept = async()=> {
    const that = this
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8081/api/reject',
      params:{
        id: that.state.data[0].id
      }
    })
    .then( response => {
      console.log(response)
    }) 
     

  }
  reject = ()=> {
    // console.log(this.state.data[0].id);
    const that = this
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8081/api/reject',
      params:{
        id: that.state.data[0].id
      }
    })
    .then( response => {
      console.log(response)
    })      

  }
  query = ()=> {
    const that = this
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8081/api/readApply',
    })
    .then( response => {
      that.setState({data: response.data.result})     
      console.log(response.data.result)
    })  
  }
  render() {
    return (
      <div>
      <Table
      columns={this.state.columns}
      dataSource={this.state.data}
    />
      <Button onClick={this.query}>查询待确认申请</Button>
      <Accept1 />
    </div>
    )
  }
}
