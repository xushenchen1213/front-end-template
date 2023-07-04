import React, { Component } from 'react'
import { Table } from 'antd';
import { useSubstrateState } from '../../substrate-lib'
import { web3FromSource } from '@polkadot/extension-dapp'
import Action from './Action'
import Query from './Query'
import { FileDoneOutlined } from '@ant-design/icons'

export default class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: '编号', dataIndex: 'id', key: 'id' },
        { title: '姓名', dataIndex: 'name', key: 'name' },
        { title: '公钥', dataIndex: 'chainAddress', key: 'chainAddress' },
        { title: '社区', dataIndex: 'commName', key: 'commName' },
        { title: '日期', dataIndex: 'date', key: 'date' },
        { title: '志愿时长', dataIndex: 'hours', key: 'hours' },
        { title: '服务内容', dataIndex: 'serviceContent', key: 'serviceContent' },
        {
          title: '确认',
          dataIndex: '',
          key: 'x',
          render: (record) => <Action commNow={this.state.commNow} isOn={this.state.isOn} record={record} data={this.state.data} />
        }
      ],
      column1: [
        { title: '编号', dataIndex: 'id', key: 'id' },
        { title: '姓名', dataIndex: 'name', key: 'name' },
        { title: '公钥', dataIndex: 'chainAddress', key: 'chainAddress' },
        { title: '社区', dataIndex: 'commName', key: 'commName' },
        { title: '日期', dataIndex: 'date', key: 'date' },
        { title: '志愿时长', dataIndex: 'hours', key: 'hours' },
        { title: '服务内容', dataIndex: 'serviceContent', key: 'serviceContent' },
        {
          title: '确认',
          dataIndex: '',
          key: 'x',
          render: (record) => <Action commNow={this.state.commNow} isOn={this.state.isOn} record={record} data={this.state.data} />
        }
      ],
      column2: [
        { title: '编号', dataIndex: 'id', key: 'id' },
        { title: '姓名', dataIndex: 'name', key: 'name' },
        { title: '公钥', dataIndex: 'chainAddress', key: 'chainAddress' },
        { title: '社区', dataIndex: 'commName', key: 'commName' },
        { title: '日期', dataIndex: 'date', key: 'date' },
        { title: '志愿时长', dataIndex: 'hours', key: 'hours' },
        { title: '服务内容', dataIndex: 'serviceContent', key: 'serviceContent' }
      ],
      isOn: false,
      commNow: this.props.commNow,
      data: [{
        id: 0, name: '张三', chainAddress: '5xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxrxxxx',
        hours: 'x', commName: 'xx社区', serviceContent: '志愿服务', date: '20xx-xx-xx'
      }],


    };
  }

  changeColumns = () => {
    this.setState({ columns: this.state.column2 })
  }
  changeBack = () => {
    this.setState({ columns: this.state.column1 })
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

  getData = (tableData) => {
    this.setState({ data: tableData })
  }

  render() {
    return (
      <div style={{ width: '100%', padding: 20, borderRadius: 10, border: 1, opacity: 0.9, background: '#fff' }}>
        <h2 style={{ color: '#3897e1' }}><FileDoneOutlined style={{ marginRight: 5 }} />
          志愿认证
          <Query changeColumns={this.changeColumns} changeBack={this.changeBack}
            commNow={this.props.commNow} getData={this.getData} style={{ marginLeft: 20, color: '#3897e1', borderColor: '#3897e1' }} />
        </h2>
        <Table
          rowKey="id"
          style={{ width: '100%', textOverflow:'ellipsis' }}
          columns={this.state.columns}
          dataSource={this.state.data}
        />
      </div>
    )
  }
}
