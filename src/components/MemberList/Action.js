import React, {useState} from 'react'
import { Button } from 'antd';
import axios from 'axios'
// import url from '../../config/ReadUrl'

export default function Action(props) {
  const [isOn, setIsOn] = useState(false)
  const [status, setStatus] = useState()
  const recall = ()=> {
    if (props.record.eventId===0) return
    console.log(props.record);
    // recall application
    axios({
      method: 'get',
      url: 'https://db.timecoin.tech:21511/api/recall',
      params:{
        id: props.record.id
      }
    })
    .then( response => {
      setIsOn({isOn: true})
      setStatus('😞 已撤回')
      setIsOn({isOn: true})
    })  
  }

  return (
    <div style={{minWidth: '12em' }}>
      <Button onClick={recall} disabled={isOn}>撤回申请</Button>
      <span>{status}</span>
    </div>
    
  )
}
