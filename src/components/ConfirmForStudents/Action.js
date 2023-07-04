import React, {useState} from 'react'
import { Button } from 'antd';
import axios from 'axios'
import qs from 'qs'

export default function Action(props) {
  const [isOn, setIsOn] = useState(false)
  const [status, setStatus] = useState()
  const recall = ()=> {
    if (props.record.eventId===0) return
    console.log(props.record);
    // recall application
    const form = {id: props.record.id}
    axios({
      method: 'post',
      url: 'https://db.timecoin.tech:21511/api/recall',
      data: qs.stringify(form),
      header: { 'content-type': 'application/x-www-form-urlencoded; charset=utf-8' }
    })
    .then( response => {
      setIsOn({isOn: true})
      setStatus('😞 已撤回')
      setIsOn({isOn: true})
    })  
  }

  return (
    <div>
      <Button onClick={recall} disabled={isOn}>撤回申请</Button>
      <span>{status}</span>
    </div>
    
  )
}
