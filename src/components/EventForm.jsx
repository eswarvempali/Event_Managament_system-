import React, { useState } from 'react'
import { TextField, Button, Paper, Stack } from '@mui/material'
import { useEventDispatch } from '../context/EventContext'

export default function EventForm(){
  const dispatch = useEventDispatch()
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [desc, setDesc] = useState('')

  const submit = (e)=>{
    e.preventDefault()
    if(!title || !date) return alert('Please add title and date')
    const newEvent = {
      id: 'local-' + Date.now(),
      title,
      date,
      location,
      body: desc
    }
    dispatch({type:'ADD_EVENT', payload: newEvent})
    setTitle(''); setDate(''); setLocation(''); setDesc('')
    alert('Event created')
  }

  return (
    <Paper style={{padding:16}}>
      <form onSubmit={submit}>
        <Stack spacing={2}>
          <TextField label="Title" value={title} onChange={e=>setTitle(e.target.value)} fullWidth required />
          <TextField label="Date" value={date} onChange={e=>setDate(e.target.value)} fullWidth placeholder="2025-12-31" required />
          <TextField label="Location" value={location} onChange={e=>setLocation(e.target.value)} fullWidth />
          <TextField label="Description" value={desc} onChange={e=>setDesc(e.target.value)} multiline rows={4} fullWidth />
          <div style={{display:'flex',justifyContent:'flex-end'}}>
            <Button type="submit" variant="contained">Create Event</Button>
          </div>
        </Stack>
      </form>
    </Paper>
  )
}
