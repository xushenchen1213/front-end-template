import React, { useEffect, useState } from 'react'
import { Table, Grid, Button, Label } from 'semantic-ui-react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useSubstrateState } from './substrate-lib'
import { web3FromSource } from '@polkadot/extension-dapp'
import { ContractPromise } from '@polkadot/api-contract'
import axios from 'axios'
import { BankOutlined } from '@ant-design/icons'
import { Select } from 'antd';
const { Option } = Select;

//用户余额模块
//用户余额模块
export default function Main(props) {
  const { api, keyring, currentAccount } = useSubstrateState()
  //插件钱包中的所有账号
  keyring.setSS58Format(0)
  const accounts = keyring.getPairs()
  //所有账号的流通时间券余额
  const [balances, setBalances] = useState({})
  //所有账号在当前社区的社区时间券余额
  const [commBalances, setCommBalances] = useState({})
  //所有账号在当前社区的志愿时长数组
  const [commVolunTimes, setCommVolunTimes] = useState({})
  //所有社区的中文名数组
  // eslint-disable-next-line no-unused-vars
  const [commName2, setCommName2] = useState([])
  //所有账号在同一个社区的注册情况（若已注册，则value为社区名，若未注册，value为'/'
  const [commNames, setCommNames] = useState({})
  //当前所选择的社区
  const [commNow, setCommNow] = useState(commName2[0])

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
  const handleChange = (value) => {
    setCommNow(value)
    props.getcommNow(value)
  };

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
    queryCommData1()
  }, [api, keyring])

  const queryCommNow = async () => {
    const fromAcct = await getFromAcct()
    let commBalan = {}
    let commVolun = {}
    let commName = {}
    new Promise((resolve) => {
      const addresses = keyring.getPairs().map(account => account.address)
      axios({
        method: 'get',
        url: 'https://db.timecoin.tech:21511/api/transferCommCoins',
        params: {
          commNow: commNow,
          fromAcct: fromAcct[0]
        }
      })
        .then((res) => {
          addresses.map(async (address, index) => {
            const value = 0;
            const gasLimit = 30000n * 1000000n;
            const contract = new ContractPromise(api, res.data.abi, res.data.commAddress);
            //获取社区时间券余额接口
            const balanceOf = await contract.query
              .balanceOf(address, { value, gasLimit }, address)
            //获取社区志愿时长接口
            const timeOf = await contract.query
              .timeOf(address, { value, gasLimit }, address)
            commBalan[address] = balanceOf.output.toHuman();
            commVolun[address] = timeOf.output.toHuman()
            if (res.data.status === 0) {
              await axios({
                method: 'get',
                url: 'https://db.timecoin.tech:21511/api/isCommMember',
                params: {
                  commNow: commNow,
                  address: address
                }
              })
                .then((response) => {
                  if (response.data.status === 0) {
                    commName[address] = commNow
                  }
                  if (response.data.status !== 0) {
                    commName[address] = '/'
                  }
                })

            }
            if (addresses.length - 1 === index) {
              resolve()
            }
          })
        })
    }).then(() => {
      setTimeout(() => {
        setCommBalances(commBalan);
        setCommNames(commName);
        setCommVolunTimes(commVolun)
      }, 1200)
    })

  }

  //得到社区名字数组
  const queryCommData1 = async () => {
    let commN = []
    new Promise((resolve) => {
      const addresses = keyring.getPairs().map(account => account.address)
      addresses.map(async (address, index) => {
        const { data } = await axios({
          method: 'get',
          url: 'https://db.timecoin.tech:21511/api/getCommunity',
          params: {
            address: address
          }
        });
        if (data.status === 0) {
          data.results.map(account => commN.push(account.commName2))
          setCommName2(unique(commN));
          props.getComm(unique(commN))
          
          // props.getcommNow(unique(commN))
        }
        if (addresses.length - 1 === index) {
          resolve()
        }
      })
    })
  }
  //对得到的社区名字数组去重
  const unique = (arr) => {
    if (!Array.isArray(arr)) {
      console.log('type error!')
      return
    }
    var array = [];
    for (var i = 0; i < arr.length; i++) {
      if (array.indexOf(arr[i]) === -1) {
        array.push(arr[i])
      }
    }
    return array;
  }

  const queryCommData = async () => {
    let commBalan = {}
    let commVolun = {}
    let commName
    let isSame = {}

    new Promise((resolve) => {
      const addresses = keyring.getPairs().map(account => account.address)

      axios({
        method: 'get',
        url: 'https://db.timecoin.tech:21511/api/getCommunity',
        params: {
          address: addresses[0]
        }
      })
        .then(async (response) => {
          response.data.status === 0 ?
            commName = response.data.commName : commName = '/'
          setCommNow(commName)
          props.getcommNow(commName)
          if (response.data.status === 1) {
            addresses.map(async (address, index) => {
              isSame[address] = '/'
              commBalan[address] = '/';
              commVolun[address] = '/'
              if (addresses.length - 1 === index) {
                resolve()
              }
            })
          }
          if (response.data.status === 0) {
            addresses.map(async (address, index) => {
              await axios({
                method: 'get',
                url: 'https://db.timecoin.tech:21511/api/isSameCommunity',
                params: {
                  firstAddress: addresses[0],
                  address: address
                }
              })
                .then(async (res) => {
                  if (res.data.status === 0) {
                    isSame[address] = response.data.commName
                    const value = 0;
                    const gasLimit = 30000n * 1000000n;
                    const abi = response.data.abi
                    const commAddress = response.data.commAddress
                    const contract = new ContractPromise(api, abi, commAddress);
                    const balanceOf = await contract.query
                      .balanceOf(address, { value, gasLimit }, address)
                    const timeOf = await contract.query
                      .timeOf(address, { value, gasLimit }, address)
                    commBalan[address] = balanceOf.output.toHuman();
                    commVolun[address] = timeOf.output.toHuman()
                  }
                  if (res.data.status !== 0) {
                    isSame[address] = '/'
                    commBalan[address] = '/';
                    commVolun[address] = '/'
                  }
                })

              if (addresses.length - 1 === index) {
                resolve()
              }
            })
          }
        })
    }).then(() => {
      setTimeout(() => {
        setCommBalances(commBalan);
        setCommNames(isSame);
        setCommVolunTimes(commVolun);
      }, 1200)

    })
  }

  return (
    <Grid.Column style={{ width: '100%', border: 1, borderRadius: 10, background: '#fff', opacity: 0.9, padding: 20 }}>
      <h2 style={{ color: '#3897e1' }}><BankOutlined style={{ marginRight: 5 }} />
        用户信息
        <Select
          placeholder='请选择社区'
          style={{ width: 120, marginLeft: 20 }}
          onChange={handleChange}
        >
          {commName2.map(comm => (
            <Option key={comm} value={comm}>{comm}</Option>
          ))}
        </Select>
        <Button onClick={queryCommNow} style={{ marginLeft: 20, color: '#3897e1', borderColor: '#3897e1' }}>
          查询社区时间券
        </Button>

      </h2>
      <div>
        <a href="https://gitee.com/cryptocity/polkadot-js-extension/releases/v0.42.2" target="_blank">插件下载：打开界面后，点击 master-build.zip 下载插件</a>
      </div>
      {accounts.length === 0 ? (
        <Label basic color="yellow">
          No accounts to be shown
        </Label>
      ) : (
        <Table style={{width: '100%'}} celled striped size="small">
          <Table.Body>
            <Table.Row>
              <Table.Cell textAlign="right">
                <strong>账号名称</strong>
              </Table.Cell>
              <Table.Cell>
                <strong>公钥地址</strong>
              </Table.Cell>
              <Table.Cell>
                <strong>流通时间券余额</strong>
              </Table.Cell>
              <Table.Cell>
                <strong>所在社区</strong>
              </Table.Cell>
              <Table.Cell>
                <strong>社区时间券余额</strong>
              </Table.Cell>
              <Table.Cell>
                <strong>志愿时长</strong>
              </Table.Cell>
            </Table.Row>
            {accounts.map(account => (
              <Table.Row key={account.address}>
                <Table.Cell textAlign="right">
                  {account.meta.name.replace('(polkadot-js)', '')}
                </Table.Cell>
                <Table.Cell>
                  <span style={{ display: 'inline-block'}}>
                    {account.address}
                  </span>
                  <CopyToClipboard style={{float: 'right', marginRight: 20}} text={account.address}>
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
                <Table.Cell>
                  {(parseFloat(String(balances[account.address]).replace(/,/g, '')) / 1000000000000).toFixed(2)}
                </Table.Cell>
                <Table.Cell>
                  {commNames[account.address] ? commNames[account.address] : '/'}
                </Table.Cell>
                <Table.Cell>
                  {commNames[account.address]&&commNames[account.address]!=='/'
                    ?  (parseFloat(String(commBalances[account.address]).replace(/,/g, '')) / 1000000000000).toFixed(2)
                    :'/'}
                </Table.Cell>
                <Table.Cell>
                  {commNames[account.address]&&commNames[account.address]!=='/'
                    ? (parseFloat(String(commVolunTimes[account.address]).replace(/,/g, '')) / 1000).toFixed(2)
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