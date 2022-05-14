import React, { useState } from 'react'
import { Form, Input, Button } from 'antd';
import axios from 'axios'
import { DeliveredProcedureOutlined } from '@ant-design/icons'

export default function ApplyForCreatCoin() {

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
    axios({
      method: 'get',
      url: 'http://175.178.170.3:5051/api/updatePublicKey',
      params: {
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
