import React, { Component } from 'react'
import { Table } from 'antd';
import { useSubstrateState } from '../../substrate-lib'
import { web3FromSource } from '@polkadot/extension-dapp'
import Query from './Query'
import {FileDoneOutlined} from '@ant-design/icons'


export default class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: '编号', dataIndex: 'commId', key: 'commId'},
        { title: '公钥', dataIndex: 'chainAddress', key: 'chainAddress' },
        { title: '社区', dataIndex: 'commName', key: 'commName' },
        { title: '志愿时长', dataIndex: 'volunTime', key: 'volunTime' }
      ],
      isOn: false,
      commNow: '',
      data: [{
        commId: 0, chainAddress: '5xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxrxxxx', 
        commName: 'xx社区', volunTime: 'x'
      }],
    };
  }
//render: (text, record, index)=>`${index+1}` 
  handleChange = (value) => {
    console.log(`selected ${value}`);
    this.setState({commNow: value})
  };


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

  getData = (tableData) => {
    this.setState({data: tableData})
  }

  render() {
    return (
      <div style={{width: '100%', padding: 20, borderRadius: 10, border: 1, opacity: 0.9, background: '#fff'}}>
        <h2 style={{color:'#3897e1'}}><FileDoneOutlined style={{marginRight: 5}}/>
        志愿记录认证
        <Query changeColumns={this.changeColumns} changeBack={this.changeBack} 
        commNow={this.state.commNow} getData={this.getData} style={{marginLeft: 20, color: '#3897e1', borderColor:'#3897e1'}} />
        </h2>
      <Table
      rowKey="chainAddress"
      style={{width: '100%'}}
      columns={this.state.columns}
      dataSource={this.state.data}
    />
    </div>
    )
  }
}
