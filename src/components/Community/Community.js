import React, { Component } from 'react';
import { Button, message } from 'antd';
import * as XLSX from 'xlsx';
import styles from './community.less';
import axios from 'axios'
import Submit from './Submit'
import {CommentOutlined} from '@ant-design/icons'

class Excel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comm: [], 
      isNotGood: true,
      notGood: false,
      volunList: [],
      checkStatus: '',
      newRegisterStatus: ''
    };
  }

  onImportExcel = file => {
    this.setState({notGood: false})
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

        this.setState({comm: that})
        console.log(this.state.comm);

      } catch (e) {
        // 这里可以抛出文件类型错误不正确的相关提示
        message.error('文件类型不正确！');
      }
    };
    // 以二进制方式打开文件
    fileReader.readAsBinaryString(files[0]);
    this.setState({isNotGood: true})


  }
  onCheck = () =>{
    const that = this
    var address = [];
    var repeat = false;
    for(var i=0;i<that.state.comm.length;i++){
        if(address.indexOf(that.state.comm[i].address) !== -1){  
          alert('公钥重复')
          repeat = true
          return
        }
        else {
          address.push(that.state.comm[i].address);
          that.setState({volunList: address})
          console.log(address);
        }
    } 
    for (let i=0; i<that.state.comm.length; i++ ) {
      if (repeat) {
        return
      }
      if (!that.state.notGood){
        console.log(that.state.comm[i]);
        axios({
          method: 'get',
          url: 'http://175.178.170.3:5051/api/checkUser',
          params: {
            address: that.state.comm[i].address,
            userId: that.state.comm[i].userId
          }
        })
          .then(response => {
            console.log(response.data.msg);
            if (response.data.status !== 0){
              that.setState({isNotGood: true})
              that.setState({notGood: true})
              that.setState({checkStatus: '😞名单不合格'})
              alert(that.state.comm[i].address + '已加入某社区')
            }
            else {
              that.setState({isNotGood: false})
              that.setState({notGood: false})
              that.setState({checkStatus: '😉名单合格'})
              console.log(that.state.isNotGood);
            }
          })
      }
      else break            
    }
  }
  onNewRegister = (msg) =>{
    // console.log(msg);
    this.setState({newRegisterStatus: msg})
  }

  render() {
    return (
      <div style={{height: 203}}>
        <h2 style={{color:'#3897e1'}}><CommentOutlined style={{marginRight: 5}}/>社区注册</h2>
        <Button style={{width: 370, height:32, backgroundColor: 'white', border:'1'}}>
          <input style={{width: 370}} type='file' accept='.xlsm' onChange={this.onImportExcel} />
        </Button>
        <Button type="primary" style={{ marginLeft: 24 }} onClick={this.onCheck}>查验</Button>
        <Submit isNG={this.state.isNotGood} onNewRegister={this.onNewRegister} comm={this.state.comm} volunList={this.state.volunList} />
        <p style={{marginTop: 15, fontSize: 14}} className={styles['upload-tip']}>支持 .xlsm 格式的文件</p>
        <div style={{ marginLeft: 15, marginTop: 10 }}>{this.state.checkStatus}</div>
        <div style={{ marginLeft: 15, marginTop: 10 }}>{this.state.newRegisterStatus}</div>
      </div >

    );
  }
}

export default Excel;