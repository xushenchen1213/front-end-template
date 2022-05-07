import React from 'react'
import { Form, Input, Button, InputNumber, DatePicker } from 'antd';
import { web3FromSource } from '@polkadot/extension-dapp'
import { useSubstrateState } from './substrate-lib'
import axios from 'axios'

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
  const { currentAccount } = useSubstrateState()
  const getFromAcct = async () => {
    const {
      address,
      meta: { source, isInjected },
    } = currentAccount

    if (!isInjected) {
      return [currentAccount]
    }

    // currentAccount is injected from polkadot-JS extension, need to return the addr and signer object.
    // ref: https://polkadot.js.org/docs/extension/cookbook#sign-and-send-a-transaction
    const injector = await web3FromSource(source)
    return [address, { signer: injector.signer }]
  }

  const onFinish = async(values) => {
    const fromAcct = await getFromAcct()
    const account_now = fromAcct[0].address
    console.log(account_now);    
    console.log(values);
    console.log(values.date._d);
    axios({
      method: 'get',
      url: 'http://127.0.0.1:8081/api/creatCoins',
      params: {
        publicKey: values.publicKey,
        name: values.urName,
        hours: values.hours,
        date: values.date._d,
        serviceContent: values.serviceContent
      }
    })
    .then( response => {
        console.log(response)
    })
  };

  const onReset = () => {
    form.resetFields();
  };

  function onChange(date, dateString) {
    console.log(date, dateString);
  }
  function onChangeNum(value) {
    console.log('changed', value);
  }

  return (
    <div>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="urName"
        label="姓名"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input style={{
            width: 200,
          }}/>
      </Form.Item>
      <Form.Item
        name="publicKey"
        label="公钥"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input 
        style={{
            width: 200,
          }}/>
      </Form.Item>
      <Form.Item
        name="hours"
        label="志愿时长"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber
          style={{
            width: 200,
          }}
          defaultValue=""
          addonAfter="小时"
          min="0"
          max="24"
          step="1"
          onChange={onChangeNum}
          stringMode
        />      
      </Form.Item>
      <Form.Item
        name="serviceContent"
        label="服务内容"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input 
        style={{
            width: 200,
          }}/>
      </Form.Item>      
      <Form.Item
        name="date"
        label="日期"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker onChange={onChange} style={{width: 200}}/>

      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
    </div>
  )
}
