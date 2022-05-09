import React from 'react'
import { Form, Input, Button, InputNumber, DatePicker } from 'antd';
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

  const onFinish = async(values) => {
    console.log(values);
    axios({
      method: 'get',
      url: 'http://175.178.170.3:5051/api/creatCoins',
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
      <h1>志愿服务记录提交</h1>
      <Form style={{marginLeft: 0, padding: 0}} {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="urName"
        label="姓名"
        labelCol={{ span: 4 }}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input style={{
            width: 400,
          }}/>
      </Form.Item>
      <Form.Item
        name="publicKey"
        label="公钥"
        labelCol={{ span: 4 }}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input 
        style={{
            width: 400,
          }}/>
      </Form.Item>
      <Form.Item
        name="hours"
        label="志愿时长"
        labelCol={{ span: 4 }}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber
          style={{
            width: 400,
          }}
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
        labelCol={{ span: 4 }}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input 
        style={{
            width: 400,
          }}/>
      </Form.Item>      
      <Form.Item
        name="date"
        label="日期"
        labelCol={{ span: 4 }}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker onChange={onChange} style={{width: 400}}/>

      </Form.Item>
      <Form.Item style={{align: 'center'}} {...tailLayout}>
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
