import React from 'react'
import { Button, Select } from 'antd';
import axios from 'axios'
import { web3FromSource } from '@polkadot/extension-dapp'
import {  ContractPromise } from '@polkadot/api-contract'
import { useSubstrateState } from './substrate-lib'
import { metadata } from './ReadMetadate';
import { contractAddress } from './ReadAddress';

const { Option } = Select;
const comms = ['Kaifeng', 'Shenzhen']
function handleChange(value) {
  console.log(`selected ${value}`);
}

export default function Submit(props) {
    const { api, currentAccount } = useSubstrateState()
    // get currentAccount info
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

    const onSubmit = async ()=> {
        const abi = JSON.parse(metadata)
        const fromAcct = await getFromAcct()
        const volunList = props.volunList
        console.log(volunList); 
        const address = contractAddress
        // const address = '5FXJVbBX5QtRcjBsjn3i8QcPp5cGsNDJLCfcuMVBWKoFnAEC';
        const value = 0; 
        const gasLimit = 30000n * 1000000n;
        const contract = new ContractPromise(api, abi, address);              
        await contract.tx
          .enrollVolunteers({ value, gasLimit },volunList)
          .signAndSend(...fromAcct, (result) => {
            console.log(result);
            if (!result.dispatchError) {
              props.comm.forEach((item)=>{
                axios({
                  method: 'get',
                  url: 'http://175.178.170.3:5051/api/submitUser',
                  params: {
                    phone: item.phone,
                    address: item.address
                  }
                })
                .then( response => {
                    console.log(response)
                })
              })  
            }
          
          });          
      }
  return (
    <div style={{ height: 60}}>
    <Select defaultValue={comms[0]} style={{ width: 360, height: 40, marginTop: 20 }} onChange={handleChange}>
      {comms.map((item)=>(
      <Option value={item}>{item}</Option>
      ))}

    </Select>
    <Button style={{ marginLeft: 30}}   disabled={props.isNG} onClick={onSubmit}>注册</Button>
    </div>

  )
}
