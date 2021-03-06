// excel.js
import React, { Component } from 'react';
import { Button, message } from 'antd';
// import 'antd/dist/antd.css';
import * as XLSX from 'xlsx';
import styles from './community.less';
import axios from 'axios'


class Excel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comm: [], 
      isNotGood: true,
      notGood: false
    };
  }
  onImportExcel = file => {
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
          // esline-disable-next-line
          // eslint-disable-next-line no-prototype-builtins
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            // 利用 sheet_to_json 方法将 excel 转成 json 数据
            that = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]))
            // break; // 如果只取第一张表，就取消注释这行
          }
        }
        // 最终获取到并且格式化后的 json 数据
        message.success('上传成功！')

        console.log(that);
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
    for (let i=0; i<that.state.comm.length; i++ ) {
      if (!that.state.notGood){
        console.log(that.state.comm[i]);
        axios({
          method: 'get',
          url: 'http://127.0.0.1:8081/api/checkUser',
          params: {
            phone: that.state.comm[i].phone,
            address: that.state.comm[i].address
          }
        })
          .then(function (response) {
            console.log(response.data.status);
            // eslint-disable-next-line eqeqeq
            if (response.data.status !== 0){
              that.setState({isNotGood: true})
              that.setState({notGood: true})
              console.log(that.state.comm[i].address + '已加入某社区');
              console.log(that.state.isNotGood);
            }
            else {
              that.setState({isNotGood: false})
              that.setState({notGood: false})
              console.log(that.state.isNotGood);
            }
          })
      }
      else break            
    }
  }
  onSubmit = ()=> {
    this.state.comm.forEach((item)=>{
      console.log(item.address + 'aa');
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
  }

  render() {
    const elements = []
    this.state.comm.forEach((item)=>{
      elements.push(
        <div>
          {item.name}&nbsp;
          {item.phone}&nbsp;
          {item.address}&nbsp;
          <hr/>
        </div>
      )
    })
    return (
      <div style={{ marginTop: 100 }}>
        <h1>Checkout</h1>
        <Button className={styles['upload-wrap']}>
          <input className={styles['file-uploader']} type='file' accept='.xlsx, .xls' onChange={this.onImportExcel} />
          <span className={styles['upload-text']}>上传文件</span>
        </Button>
        <Button type="primary" style={{ marginLeft: 30 }} onClick={this.onCheck}>查验</Button>
        <Button type="primary" style={{ marginLeft: 30}} disabled={this.state.isNotGood} onClick={this.onSubmit}>提交</Button>
        <p className={styles['upload-tip']}>支持 .xlsx、.xls 格式的文件</p>
        <div>{elements}</div>
      </div >

    );
  }
}

export default Excel;