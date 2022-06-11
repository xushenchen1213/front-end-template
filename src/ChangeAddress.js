import React, { useState } from 'react'
import { Form, Input, Button, Select } from 'antd';
import { useSubstrateState } from './substrate-lib'
import { web3FromSource } from '@polkadot/extension-dapp'
import axios from 'axios'
// import url from './config/ReadUrl'
import { DeliveredProcedureOutlined } from '@ant-design/icons'
const { Option } = Select;
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
  const [commNow, setCommNow] = useState()
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setCommNow(value)
  };

  const onFinish = async (values) => {
    const fromAcct = await getFromAcct()
    axios({
      method: 'get',
      url: 'https://db.timecoin.tech:21511/api/updatePublicKey',
      params: {
        commNow: commNow,
        from_address: fromAcct[0],
        chainAddress: values.chainAddress,
        // chain_address: values.chainAddress,
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
    <div style={{marginTop: 35}} >
      <h2 style={{ color: '#3897e1' }}><DeliveredProcedureOutlined style={{ marginRight: 5 }} />公钥信息更新</h2>
      <Form style={{ marginLeft: 0, padding: 0 }} {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          name="chainAddress"
          label="原公钥"
          labelCol={{ span: 3 }}
          rules={[
            {
              required: true,
              message: '请输入原先的公钥地址'
            },
          ]}
        >
          <Input
            style={{
              width: 455,
            }} />
        </Form.Item>
        <Form.Item
          name="newChainAddress"
          label="新公钥"
          labelCol={{ span: 3 }}
          rules={[
            {
              required: true,
              message: '请输入新的公钥地址'
            },
          ]}
        >
          <Input
            style={{
              width: 455,
            }} />
        </Form.Item>

        <Form.Item style={{ textAlign: 'center', marginRight: 130 }} {...tailLayout}>
        <Select
        placeholder='请选择社区'
        style={{ width: 110, marginRight: 15 }}
        onChange={handleChange}
      >
        {props.comm.map(comm => (
          <Option key={comm} value={comm}>{comm}</Option>
        ))}
      </Select>
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
