
import React, {useState} from 'react'
import { Button } from 'antd';
import axios from 'axios'


export default function Action(props) {
  const [isOn, setIsOn] = useState(false)
  const [status, setStatus] = useState()
  const recall = ()=> {
    if (props.record.id===0) return
    console.log(props.record);
    // recall application
    axios({
      method: 'get',
      url: 'http://175.178.170.3:5051/api/recall',
      params:{
        id: props.record.id
      }
    })
    .then( response => {
      console.log(props.record.id);
      console.log(response)
      setIsOn({isOn: true})
      setStatus('😞 已撤回')
      setIsOn({isOn: true})
    })  
  }

  return (
    <div style={{minWidth: '16em' }}>
      <Button onClick={recall} disabled={isOn}>撤回申请</Button>
      <span>{status}</span>
    </div>
    
  )
}
