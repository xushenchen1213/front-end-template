import React, {useState} from 'react'
import { Button } from 'antd';
import axios from 'axios'


export default function Action(props) {
  const [isOn, setIsOn] = useState(false)
  const [status, setStatus] = useState()
  const recall = ()=> {
    if (props.record.eventId===0) return
    console.log(props.record);
    // recall application
    axios({
      method: 'get',
      url: 'https://timecoin.tech:8082/api/recall',
      params:{
        eventId: props.record.eventId
      }
    })
    .then( response => {
      console.log(props.record.eventId);
      console.log(response)
      setIsOn({isOn: true})
      setStatus('😞 已撤回')
      setIsOn({isOn: true})
    })  
  }

  return (
    <div style={{minWidth: '15em' }}>
      <Button onClick={recall} disabled={isOn}>撤回申请</Button>
      <span>{status}</span>
    </div>
    
  )
}
