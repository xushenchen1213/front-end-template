import React, { useState } from 'react'
import { Form, Input, Button, InputNumber, DatePicker } from 'antd';
import axios from 'axios'
import moment from 'moment'
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
      url: 'https://timecoin.tech:8082/api/creatCoins',
      params: {
        name: values.name,
        publicKey: values.publicKey,
        hours: values.hours,
        date: values.date._d,
        serviceContent: values.serviceContent
      }
    })
      .then(response => {
        console.log(response);
        if (response.data.status === 0) {
          setStatus('😉 提交成功')
        }
        else {
          setStatus('😞 提交失败')
        }
      })
  };

  const onReset = () => {
    form.resetFields();
    setStatus('')
  };

  function onChange(date, dateString) {
    console.log(date, dateString);
  }
  function onChangeNum(value) {
    console.log('changed', value);
  }
  function onDisabledDate(current){
    return current && current > moment().endOf("days");//当天之前的不可选，不包括当天
  }

  return (
    <div>
      <h2 style={{ color: '#3897e1' }}><DeliveredProcedureOutlined style={{ marginRight: 5, marginBottom: 10}} />志愿服务记录提交</h2>
      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
          style={{ height: 30 }}
          name="name"
          label="姓名"
          labelCol={{ span: 4 }}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input style={{width: 400}} 
          maxLength={10}/>
        </Form.Item>
        <Form.Item
          style={{ height: 30 }}
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
            style={{width: 400}} 
            maxLength={48} />
        </Form.Item>
        <Form.Item
          style={{ height: 30 }}
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
            precision="1"
            stringMode
          />
        </Form.Item>
        <Form.Item
          style={{ height: 30 }}
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
            style={{width: 400}} 
            maxLength={24} />
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
          <DatePicker onChange={onChange} disabledDate={onDisabledDate} style={{ width: 400 }} />

        </Form.Item>
        <Form.Item style={{ align: 'center' }} {...tailLayout}>
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
