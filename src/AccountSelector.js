import React, { useState, useEffect } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';


import {
  Menu,
  Button,
  Dropdown,
  Image,
  Container,
  Icon,
  Label,
} from 'semantic-ui-react'

import { useSubstrate, useSubstrateState } from './substrate-lib'


const CHROME_EXT_URL =
  'https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd'
const FIREFOX_ADDON_URL =
  'https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/'

const acctAddr = acct => (acct ? acct.address : '')
//网页顶栏
function Main(props) {
  const {
    setCurrentAccount,
    state: { keyring, currentAccount },
  } = useSubstrate()

  // Get the list of accounts we possess the private key for
  const keyringOptions = keyring.getPairs().map(account => ({
    key: account.address,
    value: account.address,
    text: account.meta.name.toUpperCase(),
    icon: 'user',
  }))

  const initialAddress =
    keyringOptions.length > 0 ? keyringOptions[0].value : ''

  // Set the initial address
  useEffect(() => {
    // `setCurrentAccount()` is called only when currentAccount is null (uninitialized)
    !currentAccount &&
      initialAddress.length > 0 &&
      setCurrentAccount(keyring.getPair(initialAddress))
  }, [currentAccount, setCurrentAccount, keyring, initialAddress])



  const onChange = addr => {
    setCurrentAccount(keyring.getPair(addr))
    console.log(currentAccount);
  }

  return (
    <Menu
      attached="top"
      tabular
      style={{
        backgroundColor: '#fff',
        borderColor: '#fff',
        paddingTop: '1em',
        paddingBottom: '1em'
      }}
    >
      <Container>
        <Menu.Menu>
          <Image
            src={`${process.env.PUBLIC_URL}/assets/timeChain.png`}
            size="small"
            style={{ marginTop: 10, color: '#3897e1' }}
          />
        </Menu.Menu>
        <Menu.Menu position="right" style={{ alignItems: 'center' }}>
          {!currentAccount ? (
            <span>
              Create an account with Polkadot-JS Extension (
              <a target="_blank" rel="noreferrer" href={CHROME_EXT_URL}>
                Chrome
              </a>
              ,&nbsp;
              <a target="_blank" rel="noreferrer" href={FIREFOX_ADDON_URL}>
                Firefox
              </a>
              )&nbsp;
            </span>
          ) : null}
          <CopyToClipboard text={acctAddr(currentAccount)}>
            <Button
              basic
              circular
              size='medium'
              style={{ padding: 2 }}
              color={currentAccount ? 'blue' : 'red'}
            ><Avatar style={{ backgroundColor: '#3897e1' }} icon={<UserOutlined />} /></Button>
          </CopyToClipboard>
          <Dropdown
            search
            selection
            clearable
            placeholder="Select an account"
            options={keyringOptions}
            onChange={(_, dropdown) => {
              onChange(dropdown.value)
            }}
            value={acctAddr(currentAccount)}
          />
          <BalanceAnnotation />
        </Menu.Menu>
      </Container>
    </Menu>
  )
}

function BalanceAnnotation(props) {
  const { api, currentAccount } = useSubstrateState()
  const [accountBalance, setAccountBalance] = useState(0)

  // When account address changes, update subscriptions
  useEffect(() => {
    let unsubscribe

    // If the user has selected an address, create a new subscription
    currentAccount &&
      api.query.system
        .account(acctAddr(currentAccount), balance =>
          setAccountBalance(balance.data.free.toHuman())
        )
        .then(unsub => (unsubscribe = unsub))
        .catch(console.error)

    return () => unsubscribe && unsubscribe()
  }, [api, currentAccount])

  return currentAccount ? (
    <Label pointing="left" style={{ paddingTop: 14, paddingBottom: 14 }}>
      <Icon name="money" color="blue" />
      {(parseFloat(String(accountBalance).replace(/,/g, '')) / 1000000000000).toFixed(2)}
    </Label>
  ) : null
}
//      {accountBalance}
//(parseFloat(String(commBalances[account.address]).replace(/,/g, '')) / 1000000000000).toFixed(2)
export default function AccountSelector(props) {
  const { api, keyring } = useSubstrateState()
  return keyring.getPairs && api.query ? <Main {...props} /> : null
}
