import React from 'react'
import { Button } from 'antd';
import axios from 'axios'
import { web3FromSource } from '@polkadot/extension-dapp'
import { ContractPromise } from '@polkadot/api-contract'
import { useSubstrateState } from '../../substrate-lib'

export default function Submit(props) {
  const { api, currentAccount } = useSubstrateState()
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

  // const [commName, setCommName] = useState('')
  // const [commAddress, setCommAddress] = useState('')
  // const [metadata, setMetadata] = useState('')
  // const [abi, setAbi] = useState({})
  // const [status, setStatus] = useState()



  const onSubmit = async () => {
    // const abi = JSON.parse(metadataKaifeng)
    const fromAcct = await getFromAcct()
    const volunList = props.volunList
    console.log(volunList);
    //get commName, commAddress, abi
    axios({
      method: 'get',
      url: 'http://175.178.170.3:5051/api/getCommunity',
      params: {
        address: fromAcct[0]
      }
    })
      .then(async (response) => {
        console.log(response);
        // setCommName(response.data.commName)
        // setCommAddress(response.data.commAddress)
        // setAbi(response.data.abi)
        // setMetadata(response.data.metadata)
        // const address = '5FXJVbBX5QtRcjBsjn3i8QcPp5cGsNDJLCfcuMVBWKoFnAEC';
        //register into community
        const value = 0;
        const gasLimit = 30000n * 1000000n;
        const contract = new ContractPromise(api, response.data.abi, response.data.commAddress);
        contract.tx
          .enrollVolunteers({ value, gasLimit }, volunList)
          .signAndSend(...fromAcct, (result) => {
            console.log(result);
            if (result.contractEvents) {
              console.log('😉 加入成功！');
              // setStatus('😉 加入成功！')
              props.onNewRegister('😉 加入成功！')
              props.comm.forEach((item) => {
                axios({
                  method: 'get',
                  url: 'http://175.178.170.3:5051/api/submitUser',
                  params: {
                    userId: item.userId,
                    address: item.address,
                    commName: response.data.commName,
                    commAddress: response.data.commAddress,
                    metadata: response.data.metadata
                  }
                })
              })
            }
            if (result.dispatchError) {
              console.log('😞 加入失败！');
              props.onNewRegister('😞 加入失败！')              
            }
          });
      })
  }

  return (
    <Button style={{ marginLeft: 24 }} disabled={props.isNG} onClick={onSubmit}>注册</Button>
  )
}
