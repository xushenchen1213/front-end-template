import React, { useEffect, useState } from 'react'
import { Table, Grid, Button, Label } from 'semantic-ui-react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useSubstrateState } from './substrate-lib'
import { ContractPromise } from '@polkadot/api-contract'
import axios from 'axios'
import { BankOutlined } from '@ant-design/icons'
// eslint-disable-next-line no-unused-vars
import { contracts } from '@polkadot/types/interfaces/definitions'
// import BalanceSecond from './BalanceSecond'

export default function Main(props) {
  const { api, keyring } = useSubstrateState()
  const accounts = keyring.getPairs()
  const [balances, setBalances] = useState({})
  const [commBalances, setCommBalances] = useState({})
  const [commVolunTimes, setCommVolunTimes] = useState({})
  const [commNames, setCommNames] = useState({})

  useEffect(() => {
    const addresses = keyring.getPairs().map(account => account.address)
    let unsubscribeAll = null

    api.query.system.account
      .multi(addresses, balances => {
        const balancesMap = addresses.reduce(
          (acc, address, index) => ({
            ...acc,
            [address]: balances[index].data.free.toHuman(),
          }),
          {}
        )
        setBalances(balancesMap)
      })
      .then(unsub => {
        unsubscribeAll = unsub
      })
      .catch(console.error)

    return () => {
      unsubscribeAll && unsubscribeAll();
    }
  }, [api, keyring, setBalances, setCommBalances, setCommNames])

  useEffect(() => {
    queryCommData()
    // eslint-disable-next-line
  }, [api, keyring])

  const queryCommData = () => {
    let commBalan = {}
    let commVolun = {}
    let commName = {}
    new Promise((resolve) => {
      const addresses = keyring.getPairs().map(account => account.address)
      addresses.map(async (address, index) => {
        const { data } = await axios({
          method: 'get',
          url: 'https://timecoin.tech:8082/api/getCommunity',
          params: {
            address: address
          }
        });
        console.log(data);
        if (data.status === 0) {
          const value = 0;
          const gasLimit = 30000n * 1000000n;
          const contract = new ContractPromise(api, data.abi, data.commAddress);
          console.log(api);
          console.log(data.abi);
          console.log(data.commAddress);
          const { output } = await contract.query
            .balanceOf(address, { value, gasLimit }, address)
          console.log(output);
          const { output1 } = await contract.query
            .time_of(address, { value, gasLimit }, address)
          // console.log(test);
          commName[address] = data.commName;
          commBalan[address] = output.toHuman();
          commVolun[address] = output1.toHuman()
        }
        if (addresses.length - 1 === index) {
          resolve()
        }
      })
    }).then(() => {
      setCommBalances(commBalan);
      setCommNames(commName);
      setCommVolunTimes(commVolun);
    })
  }

  return (
    <Grid.Column style={{ border: 1, borderRadius: 10, background: '#fff', opacity: 0.9, padding: 20 }}>
      <h2 style={{ color: '#3897e1' }}><BankOutlined style={{ marginRight: 5 }} />用户信息</h2>
      <a href="https://github.com/polkadot-js/extension/releases/tag/v0.42.2" target="_blank">插件下载：打开界面后，点击 master-build.zip 下载插件</a>
      {accounts.length === 0 ? (
        <Label basic color="yellow">
          No accounts to be shown
        </Label>
      ) : (
        <Table celled striped size="small">
          <Table.Body>
            <Table.Row>
              <Table.Cell width={3} textAlign="right">
                <strong>账号名称</strong>
              </Table.Cell>
              <Table.Cell width={10}>
                <strong>公钥地址</strong>
              </Table.Cell>
              <Table.Cell width={6}>
                <strong>流通币余额</strong>
              </Table.Cell>
              <Table.Cell width={6}>
                <strong>所在社区</strong>
              </Table.Cell>
              <Table.Cell width={6}>
                <strong>社区币余额</strong>
              </Table.Cell>
              <Table.Cell width={6}>
                <strong>志愿时长</strong>
              </Table.Cell>
            </Table.Row>
            {accounts.map(account => (
              <Table.Row key={account.address}>
                <Table.Cell width={3} textAlign="right">
                  {account.meta.name.replace('(polkadot-js)', '')}
                </Table.Cell>
                <Table.Cell width={10}>
                  <span style={{ display: 'inline-block', minWidth: '31em' }}>
                    {account.address}
                  </span>
                  <CopyToClipboard text={account.address}>
                    <Button
                      basic
                      circular
                      compact
                      size="mini"
                      color="blue"
                      icon="copy outline"
                    />
                  </CopyToClipboard>
                </Table.Cell>
                <Table.Cell width={6} style={{ minWidth: '9em' }}>
                  {(parseFloat(String(balances[account.address]).replace(/,/g, '')) / 1000000000000).toFixed(2)}
                </Table.Cell>
                <Table.Cell width={6} style={{ minWidth: '9em' }}>
                  {commNames[account.address] ? commNames[account.address] : '/'}
                </Table.Cell>
                <Table.Cell width={6} style={{ minWidth: '9em' }}>
                  {commBalances[account.address]
                    ? (parseFloat(String(commBalances[account.address]).replace(/,/g, '')) / 1000000000000).toFixed(2)
                    : '/'}
                </Table.Cell>
                <Table.Cell width={6} style={{ minWidth: '9em' }}>
                  {commBalances[account.address]
                    ? (parseFloat(String(commVolunTimes[account.address]).replace(/,/g, '')) / 1000000000000).toFixed(2)
                    : '/'}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </Grid.Column>
  )
}
