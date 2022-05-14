import React, { Component } from 'react'
import { Table, Button } from 'antd';
import axios from 'axios'
import { useSubstrateState } from '../../substrate-lib'
import { web3FromSource } from '@polkadot/extension-dapp'
import Action from './Action'
import {FileDoneOutlined} from '@ant-design/icons'

export default class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: '编号', dataIndex: '', key: 'id', width: '8em',
        render: (text, record, index)=>`${index+1}` },
        { title: '姓名', dataIndex: 'name', key: 'name', width: '8em' },
        { title: '公钥', dataIndex: 'publicKey', key: 'publicKey' },
        { title: '志愿时长', dataIndex: 'hours', key: 'hours', width: '13em' },
        { title: '服务内容', dataIndex: 'serviceContent', key: 'serviceContent', width: '13em' },
        { title: '日期', dataIndex: 'date', key: 'date', width: '13em' },
        {
          title: '确认',
          dataIndex: '',
          key: 'x',
          render: (record) => <Action isOn={this.state.isOn} record={record} data={this.state.data}/>
        }
      ],
      isOn: false,
      data: [{id: 0, name: '张三', publicKey: '5xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxrxxxx', 
      hours: 'x', serviceContent: '志愿服务', date: '20xx-xx-xx'}],


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
  te=()=>{
    console.log(this.state.isOn);
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
        <h2 style={{color:'#3897e1'}}><FileDoneOutlined style={{marginRight: 5}}/>志愿记录申请<Button style={{marginLeft: 20, color: '#3897e1', borderColor:'#3897e1'}} onClick={this.query}>查询待确认申请</Button></h2>
        
      <Table
      rowKey="id"
      style={{width: 1140}}
      columns={this.state.columns}
      dataSource={this.state.data}
    />
    </div>
    )
  }
}
