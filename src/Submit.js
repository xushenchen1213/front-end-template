import React from 'react'
import { Button } from 'antd';
import axios from 'axios'
import { web3FromSource } from '@polkadot/extension-dapp'
// eslint-disable-next-line no-unused-vars
import {  ContractPromise } from '@polkadot/api-contract'
import { useSubstrateState } from './substrate-lib'


export default function Submit(props) {

    // eslint-disable-next-line no-unused-vars
    const { api, currentAccount } = useSubstrateState()
    // eslint-disable-next-line no-unused-vars
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

    const onSubmit = ()=> {
        props.comm.forEach((item)=>{
          axios({
            method: 'get',
            url: 'http://127.0.0.1:8081/api/submitUser',
            params: {
              phone: item.phone,
              address: item.address
            }
          })
          .then( response => {
              console.log(response)
          })
        })
        axios({
          method: 'get',
          url: 'http://127.0.0.1:8081/api/getAbi',
          params: {
            fileName: 'metadata3.json'
          }
        })
        .then(async (response) => {
          // const fromAcct = await getFromAcct()
          // const account_now = fromAcct[0].address
          // console.log(fromAcct[0]);
          // const abi = response.data.abi
          console.log(response);
          // const address = '5CWpSBs9fKHUAVsVkgg71VxWTjjpXdwiq5GQ8oG5UhCxFzxH';
          // const value = 0;
          // // NOTE the apps UI specified these in mega units
          // const gasLimit = 30000n * 1000000n;
          // const contract = new ContractPromise(api, abi, address);

          // const volunList = props.volunList
          // console.log(volunList);

          // await contract.tx
          // .enrollVolunteers({ value, gasLimit },volunList)
          // .signAndSend(...fromAcct, (result) => {
          //   console.log(result);
          // });        
        })        
      }
  return (
    <div>
    <Button style={{ marginLeft: 30, marginTop:30}}   disabled={props.isNG} onClick={onSubmit}>注册</Button>
    </div>
    //

  )
}
