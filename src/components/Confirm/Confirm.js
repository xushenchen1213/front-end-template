import React, { Component } from 'react'
// import { Button, message } from 'antd';
import { Table, Button } from 'antd';
import axios from 'axios'
// import { metadata } from './ReadMetadate';
import { useSubstrateState } from '../../substrate-lib'
import { web3FromSource } from '@polkadot/extension-dapp'
import Accept from './Accept'


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
          render: (record) => <Accept record={record} data={this.state.data}/>
        },
        {
          title: '拒绝',
          dataIndex: '',
          key: 'y',
          render: (record) => <Button id={record.id} onClick={this.reject}>拒绝申请{record.id}</Button>
        }
      ],
      data: [{id: 0, name: '张三', publicKey: '5xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxrxxxx', hours: 'x', serviceContent: '志愿服务', date: '20xx-xx-xx'}]
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

  accept = async()=> {
    const that = this
    axios({
      method: 'get',
      url: 'http://175.178.170.3:5051/api/reject',
      params:{
        id: that.state.data[0].id
      }
    })
    .then( response => {
      console.log(response)
    }) 
     

  }
  reject = (e)=> {
    const id = e.target.innerHTML.slice(4);
    axios({
      method: 'get',
      url: 'http://175.178.170.3:5051/api/reject',
      params:{
        id: id
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
      url: 'http://175.178.170.3:5051/api/readApply',
    })
    .then( response => {
      that.setState({data: response.data.result})     
      console.log(response.data.result)
    })  
  }
  render() {
    return (
      <div style={{marginLeft: 13}}>
        <h1>志愿时认证</h1>
      <Table
      rowKey="id"
      style={{width: 1140}}
      columns={this.state.columns}
      dataSource={this.state.data}
    />
      <Button style={{marginLeft: 500}} onClick={this.query}>查询待确认申请</Button>

    </div>
    )
  }
}
