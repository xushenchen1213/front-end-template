import React, { useState } from 'react'
import ExcelJs from "exceljs";
import { Button } from 'antd';
import axios from 'axios'
import { useSubstrateState } from '../../substrate-lib'
import { web3FromSource } from '@polkadot/extension-dapp'


export default function Query(props) {
  const data = [{
    id: 0, chainAddress: '5xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxrxxxx',
    commName: 'xx社区', volunTime: 'x'
  }]
  const [volunTimeList, setVolunTimeList] = useState([])

  const { currentAccount } = useSubstrateState()
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

  const query = async () => {
    const fromAcct = await getFromAcct()
    axios({
      method: 'get',
      url: 'https://db.timecoin.tech:21511/api/getMembersInfo',
      params: {
        admin: fromAcct[0]
      }
    })
      .then(response => {
        console.log(response);
        if (response.data.status === 0) {
          props.getData(response.data.volunTimeList)
          setVolunTimeList(response.data.volunTimeList)
        }
        if (response.data.status === 1) {
          props.getData(data)
          alert('您未有相关申请记录')
        }
      })

  }
  const exportExcel = () => {
    // 获取sheet对象，设置当前sheet的样式
    // showGridLines: false 表示不显示表格边框
    let workbook = new ExcelJs.Workbook();
    let sheetName = "Allen_test.xlsx";
    let sheet = workbook.addWorksheet(sheetName, {
      views: [{ showGridLines: true }]
    });
    // 每一个sheet对象对应一个Excel文件中的表，如果你想子一个Excel中显示多个表，可以定义多个sheet
    let columnArr = [];
    for (let i in volunTimeList[0]) {
      let tempObj = { name: "" };
      tempObj.name = i;
      columnArr.push(tempObj);
    }
    // 设置表格的主要数据部分
    let headerName = "RequestsList";
    sheet.addTable({
      name: headerName,
      ref: "A1", // 主要数据从A1单元格开始
      headerRow: true,
      totalsRow: false,
      style: {
        theme: "TableStyleMedium2",
        showRowStripes: false,
        width: 200
      },
      columns: columnArr ? columnArr : [{ name: "" }],  // 把之前定义的表头数据传递进来
      rows: volunTimeList.map((e) => {
        let arr = [];
        for (let i in e) {
          arr.push(e[i]);
        }
        return arr;
      })
    });
    // 设置单元格的文字样式
    sheet.getCell("A1").font = { size: 20, bold: true };

    // 设置每一列的宽度
    sheet.columns = sheet.columns.map((e) => {
      const expr = e.values[5];
      switch (expr) {
        case "id":
          return { width: 20 };
        case "chainAddress":
          return { width: 50 };
        case "commName":
          return { width: 20 };
        case "volunTime":
          return { width: 20 };
        default:
          return { width: 20 };
      }
    });

    const table = sheet.getTable(headerName);
    for (let i = 0; i < table.table.columns.length; i++) {
      // 表格主体数据是从A5开始绘制的，一共有三列。这里是获取A5到，B5，C5单元格，定义表格的头部样式
      sheet.getCell(`${String.fromCharCode(65 + i)}1`).font = { size: 12 };
      sheet.getCell(`${String.fromCharCode(65 + i)}1`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "c5d9f1" }
      };
      sheet.getCell(`${String.fromCharCode(65 + i)}1`).alignment = { vertical: 'middle', horizontal: 'center' };

      // 获取表格数据部分，定义其样式
      for (let j = 0; j < table.table.rows.length; j++) {
        let rowCell = sheet.getCell(`${String.fromCharCode(65 + i)}${j+2}`);
        rowCell.alignment = { wrapText: true, vertical: 'middle', horizontal: 'center' };
        rowCell.border = {
          bottom: {
            style: "thin",
            color: { argb: "a6a6a6" }
          }
        };
      }
    }
    table.commit();

    // 定义下载文件的方法
    const writeFile = (fileName, content) => {
      const link = document.createElement("a");
      const blob = new Blob([content], {
        type: "application/vnd.ms-excel;charset=utf-8;"
      });
      link.download = fileName;
      link.href = URL.createObjectURL(blob);
      link.click();
    };

    // 表格的数据绘制完成，定义下载方法，将数据导出到Excel文件
    workbook.xlsx.writeBuffer().then((buffer) => {
      writeFile(sheetName, buffer);
    });
  }

  return (
    <span>
      <Button style={{ marginLeft: 20, color: '#3897e1', borderColor: '#3897e1' }} onClick={query}>查询社区成员志愿时长</Button>
      <Button style={{ marginLeft: 20, color: '#3897e1', borderColor: '#3897e1' }} onClick={exportExcel}>导出志愿时长表</Button>
    </span>
  )
}
