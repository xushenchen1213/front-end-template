
import React, { useState } from 'react';
import { Button, message } from 'antd';
import * as XLSX from 'xlsx';
import styles from './community.less';
import axios from 'axios'
// import url from '../../config/ReadUrl'
import { web3FromSource } from '@polkadot/extension-dapp'
import { ContractPromise } from '@polkadot/api-contract'
import { useSubstrateState } from '../../substrate-lib'
import { CommentOutlined } from '@ant-design/icons'
// const { Option } = Select;



export default function Comm(props) {
  const { api, currentAccount } = useSubstrateState()
  const [commList, setCommList] = useState([])
  const [volunList, setVolunList] = useState([])
  const [isNotGood, setIsNotGood] = useState(true)
  const [notGood, setNotGood] = useState(false)
  const [checkStatus, setCheckStatus] = useState('')
  // const [commNow, setCommNow] = useState('')
  const [newRegisterStatus, setNewRegisterStatus] = useState('')

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


  const onImportExcel = file => {
    setCheckStatus('')
    setNewRegisterStatus('')
    setNotGood(false)
    // 获取上传的文件对象
    const { files } = file.target;
    // 通过FileReader对象读取文件
    const fileReader = new FileReader();
    var that;
    fileReader.onload = event => {
      try {
        const { result } = event.target;
        // 以二进制流方式读取得到整份excel表格对象
        const workbook = XLSX.read(result, { type: 'binary' });
        // 存储获取到的数据
        let data = [];
        // 遍历每张工作表进行读取（这里默认只读取第一张表）
        for (const sheet in workbook.Sheets) {
          // eslint-disable-next-line no-prototype-builtins
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            // 利用 sheet_to_json 方法将 excel 转成 json 数据
            that = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]))
            break; // 如果只取第一张表，就取消注释这行
          }
        }
        // 最终获取到并且格式化后的 json 数据
        message.success('上传成功！')

        setCommList(that)

      } catch (e) {
        // 这里可以抛出文件类型错误不正确的相关提示
        message.error('文件类型不正确！');
      }
    };
    // 以二进制方式打开文件
    fileReader.readAsBinaryString(files[0]);
    setIsNotGood(true)
  }

  const onCheck = () => {
    var address = [];
    let repeat = false;
    for (var i = 0; i < commList.length; i++) {
      const chainAddress = '账号'
      if (address.indexOf(commList[i][chainAddress]) !== -1) {
        alert('文件及内容不合规范')
        repeat = true
        return
      }
      else {
        address.push(commList[i][chainAddress]);
        setVolunList(address)
      }
    }
    for (let i = 0; i < commList.length; i++) {
      const chainAddress = '账号'
      if (repeat) {
        return
      }
      if (!notGood) {
        axios({
          method: 'get',
          url: 'https://db.timecoin.tech:21511/api/checkUser',
          params: {
            address: commList[i][chainAddress],
            commNow: props.commNow
          }
        })
          .then(response => {
            if (response.data.status !== 0) {
              setIsNotGood(true)
              setNotGood(true)
              setCheckStatus('😞名单不合格')
              alert(commList[i][chainAddress] + '已加入某社区')
            }
            else {
              setIsNotGood(false)
              setNotGood(false)
              setCheckStatus('😉名单合格！')
            }
          })
      }
      else break
    }
  }

  const onSubmit = async () => {
    const fromAcct = await getFromAcct()

    // get commName, commAddress, abi
    axios({
      method: 'get',
      url: 'https://db.timecoin.tech:21511/api/getCommNow',
      params: {
        commNow: props.commNow,
        fromAcct: fromAcct[0]
      }
    })
      .then(response => {
        //register into community
        const value = 0;
        const gasLimit = 30000n * 1000000n;
        const abi = response.data.abi
        const commAddress = response.data.commAddress
        const departName = response.data.departName
        const contract = new ContractPromise(api, abi, commAddress);
        contract.tx
          .enrollVolunteers({ value, gasLimit }, volunList)
          .signAndSend(...fromAcct, (result) => {
            console.log(result);
            if (result.contractEvents) {
              setNewRegisterStatus('😉 加入成功！')
              commList.forEach((item) => {
                const name = '姓名'
                const chainAddress = '账号'
                const commId = '社区编号'
                axios({
                  method: 'get',
                  url: 'https://db.timecoin.tech:21511/api/submitUser',
                  params: {
                    name: item[name],
                    commId: item[commId],
                    chainAddress: item[chainAddress],
                    commName1: response.data.commName1,
                    commName2: props.commNow,
                    departName: departName
                  }
                })
              })
            }
            if (result.dispatchError) {
              console.log(result.dispatchError.toHuman());
              setNewRegisterStatus('😞 加入失败！')
            }
          });
      })
  }
  // const handleChange = (value) => {
  //   console.log(`selected ${value}`);
  //   setCommNow(value)
  // };

  return (
    <div style={{ height: 165}}>
      <h2 style={{ color: '#3897e1' }}><CommentOutlined style={{ marginRight: 5, marginBottom: 10 }} />社区注册</h2>
      <Button style={{ marginLeft: 20, width: '83%', height: 40, backgroundColor: 'white', border: '1'}}>
        <input style={{ width: '100%' }} type='file' accept='.xlsm, .xlsx, .xls' onChange={onImportExcel} />
      </Button>
      <p style={{ marginLeft: 20, marginTop: 15, fontSize: 14 }} className={styles['upload-tip']}>
        当前社区为: {props.commNow}
        <span> {checkStatus} {newRegisterStatus}</span>
      </p>
      <span style={{ display: 'flex', justifyContent: 'center', align: 'center'}}>
        {/* <Select
          placeholder='请选择社区'
          style={{ width: 110}}
          onChange={handleChange}
        >
          {props.comm.map(comm => (
            <Option key={comm} value={comm}>{comm}</Option>
          ))}
        </Select> */}

        <Button type="primary" onClick={onCheck}>查验</Button>
        <Button disabled={isNotGood} onClick={onSubmit}>注册</Button>
      </span>
    </div >
  );
};