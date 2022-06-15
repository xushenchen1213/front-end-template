import React, { useState } from 'react'
import { Form, Input, Button } from 'antd';
import { useSubstrateState } from './substrate-lib'
import { web3FromSource } from '@polkadot/extension-dapp'
import axios from 'axios'
// import url from './config/ReadUrl'
import { DeliveredProcedureOutlined } from '@ant-design/icons'
// const { Option } = Select;
//修改公钥地址
//修改公钥地址
export default function ApplyForCreatCoin(props) {
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
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  const [form] = Form.useForm();
  const [status, setStatus] = useState()
  // const [commNow, setCommNow] = useState()
  // const handleChange = (value) => {
  //   console.log(`selected ${value}`);
  //   setCommNow(value)
  // };

  const onFinish = async (values) => {
    const fromAcct = await getFromAcct()
    axios({
      method: 'get',
      url: 'https://db.timecoin.tech:21511/api/updatePublicKey',
      params: {
        commNow: props.commNow,
        from_address: fromAcct[0],
        chainAddress: values.chainAddress,
        publicKeyNew: values.newChainAddress
      }
    })
      .then(response => {
        console.log(response);
        if (response.data.status === 0) {
          setStatus('😉 更新成功')
        }
        else {
          setStatus('😞 更新失败')
        }
      })
  };

  const onReset = () => {
    form.resetFields();
    setStatus('')
  };


  return (
    <div style={{marginTop: 12}} >
      <h2 style={{ color: '#3897e1' }}><DeliveredProcedureOutlined style={{ marginRight: 5 }} />账号更新</h2>
      <Form style={{ marginLeft: 20, padding: 0, width: '100%' }} {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
          style={{ width: '100%' }}
          name="commNow"
          label="所在社区"
          labelCol={{ span: 4 }}
          rules={[
            {
              required: false,
              message: '请填写所在社区'
            },
          ]}
        >
          <Input
            maxLength={24} placeholder={props.commNow} disabled></Input>
        </Form.Item>     
        <Form.Item
          name="chainAddress"
          label="原公钥"
          labelCol={{ span: 4 }}
          rules={[
            {
              required: true,
              message: '请输入原先的公钥地址'
            },
          ]}
        >
          <Input
            style={{ width: '100%' }}
            maxLength={48} />
        </Form.Item>
        <Form.Item
          name="newChainAddress"
          label="新公钥"
          labelCol={{ span: 4 }}
          rules={[
            {
              required: true,
              message: '请输入新的公钥地址'
            },
          ]}
        >
          <Input
            style={{ width: '100%' }}
            maxLength={48} />
        </Form.Item>

        <Form.Item style={{ align: 'center', marginBottom: 0 }} {...tailLayout}>
        {/* <Select
        placeholder='请选择社区'
        style={{ width: 110, marginRight: 15 }}
        onChange={handleChange}
      >
        {props.comm.map(comm => (
          <Option key={comm} value={comm}>{comm}</Option>
        ))}
      </Select> */}
          <Button type="primary" htmlType="submit">
            提交
          </Button>
          <Button htmlType="button" onClick={onReset}>
            重置
          </Button><span style={{ overflowWrap: 'break-word' }}>{status}</span>
        </Form.Item>
      </Form>
    </div>
  )
}
