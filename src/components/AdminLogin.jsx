import React, { useState } from 'react'
import { Paper, TextField, Button, Stack, Typography } from '@mui/material'
import { useEventDispatch } from '../context/EventContext'

export default function AdminLogin(){
  const [pw, setPw] = useState('')
  const dispatch = useEventDispatch()

  const submit = (e)=>{
    e.preventDefault()
    // simple demo password
    if(pw === 'admin123'){
      dispatch({type:'SET_ADMIN', payload:true})
      alert('Admin authenticated')
    } else {
      alert('Invalid admin password')
    }
    setPw('')
  }

  return (
    <Paper style={{padding:16, maxWidth:420}}>
      <form onSubmit={submit}>
        <Stack spacing={2}>
          <Typography variant="body1">Enter admin password to manage events.</Typography>
          <TextField label="Admin Password" type="password" value={pw} onChange={e=>setPw(e.target.value)} fullWidth />
          <div style={{display:'flex',justifyContent:'flex-end'}}>
            <Button type="submit" variant="contained">Login</Button>
          </div>
        </Stack>
      </form>
    </Paper>
  )
}
