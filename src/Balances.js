import React, { useEffect, useState } from 'react'
import { Table, Grid, Button, Label } from 'semantic-ui-react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useSubstrateState } from './substrate-lib'
import {  ContractPromise } from '@polkadot/api-contract'
import { web3FromSource } from '@polkadot/extension-dapp'
import { metadata } from './ReadMetadate';
import { contractAddress } from './ReadAddress';

export default function Main(props) {
  const { api, keyring, currentAccount } = useSubstrateState()
  const accounts = keyring.getPairs()
  const [balances, setBalances] = useState({})
  // const [commBalances, setCommBalances] = useState({})
      

  useEffect(() => {
    const addresses = keyring.getPairs().map(account => account.address)
    let unsubscribeAll = null
    addresses.forEach(element => {
      console.log(element);
    });
    async function commBalance() {
      const fromAcct = await getFromAcct()      
      const abi = JSON.parse(metadata)
      const value = 0; 
      const gasLimit = 30000n * 1000000n;
      const contract = new ContractPromise(api, abi, contractAddress);    
      const balanceOf = await contract.query
      .balanceOf(fromAcct[0], { value, gasLimit })
      console.log(balanceOf);
    }
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
    commBalance()

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

    return () => unsubscribeAll && unsubscribeAll()
  }, [api, keyring, setBalances, currentAccount])

  return (
    <Grid.Column>
      <h1>Balances</h1>
      {accounts.length === 0 ? (
        <Label basic color="yellow">
          No accounts to be shown
        </Label>
      ) : (
        <Table celled striped size="small">
          <Table.Body>
            <Table.Row>
              <Table.Cell width={3} textAlign="right">
                <strong>Name</strong>
              </Table.Cell>
              <Table.Cell width={7}>
                <strong>Address</strong>
              </Table.Cell>
              <Table.Cell width={3}>
                <strong>Balance/Time Coin</strong>
              </Table.Cell>
              <Table.Cell width={3}>
                <strong>Community</strong>
              </Table.Cell>
              <Table.Cell width={3}>
                <strong>Balance/Community Coin</strong>
              </Table.Cell>
            </Table.Row>
            {accounts.map(account => (
              <Table.Row key={account.address}>
                <Table.Cell width={3} textAlign="right">
                  {account.meta.name}
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
                {/* <Table.Cell width={3}>
                  {balances &&
                    balances[account.address] &&
                    balances[account.address]}
                </Table.Cell> */}
                <Table.Cell width={3}>
                  {(parseFloat(String(balances[account.address]).replace(/,/g,''))/1000000000000).toFixed(2)}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </Grid.Column>
  )
}
