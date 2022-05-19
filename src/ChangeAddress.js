import React, { useState } from 'react'
import { Form, Input, Button } from 'antd';
import { useSubstrateState } from './substrate-lib'
import { web3FromSource } from '@polkadot/extension-dapp'
import axios from 'axios'
import { DeliveredProcedureOutlined } from '@ant-design/icons'

export default function ApplyForCreatCoin() {
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

  const onFinish = async (values) => {
    console.log(values);
    const fromAcct = await getFromAcct()
    axios({
      method: 'get',
      url: 'https://timecoin.tech:8082/api/updatePublicKey',
      params: {
        from_address: fromAcct[0],
        chain_address: values.publicKey,
        publicKeyNew: values.publicKeyNew
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
    <div>
      <h2 style={{ color: '#3897e1' }}><DeliveredProcedureOutlined style={{ marginRight: 5 }} />公钥信息更新</h2>
      <Form style={{ marginLeft: 0, padding: 0 }} {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          style={{ height: 50 }}
          name="publicKey"
          label="原公钥"
          labelCol={{ span: 4 }}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            style={{
              width: 455,
            }} />
        </Form.Item>
        <Form.Item
          style={{ height: 50 }}
          name="publicKeyNew"
          label="新公钥"
          labelCol={{ span: 4 }}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input
            style={{
              width: 455,
            }} />
        </Form.Item>

        <Form.Item style={{ marginLeft: 30, align: 'center' }} {...tailLayout}>
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
