import React from 'react'
import { Table, Button } from 'antd';
import axios from 'axios'
import Accept1 from './Accept1'


export default function ConfirmForCreatCoins() {

  const columns = [
    { title: '编号', dataIndex: 'id', key: 'id' },
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '公钥', dataIndex: 'publicKey', key: 'publicKey' },
    { title: '志愿时长', dataIndex: 'hours', key: 'hours' },
    { title: '服务内容', dataIndex: 'service', key: 'service' },
    { title: '日期', dataIndex: 'date', key: 'date' },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      render: () => <a>Delete</a>,
    },
  ];
  

  const query = ()=> {
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8081/api/readApply',
    })
    .then( response => {
      // setState({data: response.data.result})
      
      console.log(response.data.result)
    })  
  }


  return (
    <div>
      <Button onClick={query}>查询待确认申请</Button>
      <Accept1 />
      <Table
      columns={columns}
      // dataSource={data}
    />
    </div>

  )
}
