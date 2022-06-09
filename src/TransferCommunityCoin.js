import React, { useState } from 'react'
import axios from 'axios'
import { Form, Input, Grid } from 'semantic-ui-react'
import { Button } from 'antd';
import { useSubstrateState } from './substrate-lib'
import { web3FromSource } from '@polkadot/extension-dapp'
import { ContractPromise } from '@polkadot/api-contract'
import { MoneyCollectOutlined } from '@ant-design/icons'
// import url from './config/ReadUrl'
import { Select } from 'antd';
const { Option } = Select;
//转社区币界面
//转社区币界面
//转社区币界面
export default function Main(props) {
  const [formState, setFormState] = useState({ addressTo: '', amount: 0 })
  const [status, setStatus] = useState()
  // eslint-disable-next-line no-unused-vars
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    // setCommNow(value)
  };
  const onChange = (_, data) =>
    setFormState(prev => ({ ...prev, [data.state]: data.value }))

  const { api, currentAccount } = useSubstrateState()

  const { addressTo, amount } = formState

  const { keyring } = useSubstrateState()
  const accounts = keyring.getPairs()

  const availableAccounts = []
  accounts.map(account => {
    return availableAccounts.push({
      key: account.meta.name,
      text: account.meta.name,
      value: account.address,
    })
  })

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

  const onTransfer = async () => {
    const fromAcct = await getFromAcct()
    axios({
      method: 'get',
      url: 'https://db.timecoin.tech:21511/api/getCommNow',
      params: {
        address: fromAcct[0],
        commNow: formState.commNow
      }
    })
      .then(response => {
        console.log(response);
        const value = 0;
        const gasLimit = 30000n * 1000000n;
        const contract = new ContractPromise(api, response.data.abi, response.data.commAddress);
        const toAmount = addressTo;
        const balance = amount * 1000000000000
        console.log(balance);
        console.log(toAmount);
        contract.tx
          .transfer({ value, gasLimit }, toAmount, balance)
          .signAndSend(...fromAcct, (result) => {
            console.log(result);
            if (result.contractEvents) {
              console.log('😉 转账成功！');
              setStatus('😉 转账成功！')
            }
            if (result.dispatchError) {
              console.log('😞 转账失败');
              setStatus('😞 转账失败')
            }
          });
      })
  }

  return (
    <Grid.Column width={8}>
      <h2 style={{ color: '#3897e1' }}><MoneyCollectOutlined style={{ marginRight: 5 }} />社区时间券兑付</h2>
      <Form>
        <Form.Field>
          <Input
            fluid
            label="接收地址"
            type="text"
            maxLength="48"
            placeholder="address"
            value={addressTo}
            state="addressTo"
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field>
          <Input
            fluid
            label="兑付数量"
            type="float"
            state="amount"
            min="0"
            maxLength="4"
            precision="2"
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field style={{ marginBottom: 0, textAlign: 'center' }}>
        <Select
          placeholder='请选择社区'
          style={{ width: 120, marginRight: 20 }}
          onChange={onChange}
        >
          {props.comm.map(comm => (
            <Option state='commNow' key={comm} value={comm}>{comm}</Option>
          ))}
        </Select>
        <Button style={{ borderColor: '#2185d0', color: '#2185d0', background: 'white', margin: 0, paddingTop: 4 }}
            disabled={amount === 0 || addressTo === '' ? true : false} onClick={onTransfer}>确认</Button>
        </Form.Field>
        <Form.Field style={{ textAlign: 'center' }}>
          
        </Form.Field>
      </Form>
      <div style={{ overflowWrap: 'break-word' }}>{status}</div>
    </Grid.Column>
  )
}