import React, { useState } from 'react'
import { TextField, Button, Paper, Stack } from '@mui/material'
import { useEventDispatch } from '../context/EventContext'

export default function EventForm({initial, onSaved}){
  const dispatch = useEventDispatch()
  const [title, setTitle] = useState(initial?.title || '')
  const [date, setDate] = useState(initial?.date || '')
  const [location, setLocation] = useState(initial?.location || '')
  const [desc, setDesc] = useState(initial?.body || '')
  const [category, setCategory] = useState(initial?.category || 'Indoor')
  const [capacity, setCapacity] = useState(initial?.capacity || 50)

  const submit = (e)=>{
    e.preventDefault()
    if(!title || !date) return alert('Please add title and date')
    const evt = {
      id: initial?.id || ('local-' + Date.now()),
      title,
      date,
      location,
      body: desc,
      category,
      capacity
    }
    if(initial) dispatch({type:'MODIFY_EVENT', payload: evt})
    else dispatch({type:'ADD_EVENT', payload: evt})
    setTitle(''); setDate(''); setLocation(''); setDesc(''); setCategory('Indoor'); setCapacity(50)
    onSaved && onSaved()
    alert(initial ? 'Event updated' : 'Event created')
  }

  return (
    <Paper style={{padding:16}}>
      <form onSubmit={submit}>
        <Stack spacing={2}>
          <TextField label="Title" value={title} onChange={e=>setTitle(e.target.value)} fullWidth required />
          <TextField label="Date" value={date} onChange={e=>setDate(e.target.value)} fullWidth placeholder="2025-12-31" required />
          <TextField label="Location" value={location} onChange={e=>setLocation(e.target.value)} fullWidth />
          <TextField label="Description" value={desc} onChange={e=>setDesc(e.target.value)} multiline rows={4} fullWidth />
          <TextField label="Category" value={category} onChange={e=>setCategory(e.target.value)} fullWidth helperText="Indoor or Outdoor" />
          <TextField label="Capacity" type="number" value={capacity} onChange={e=>setCapacity(Number(e.target.value))} fullWidth />
          <div style={{display:'flex',justifyContent:'flex-end'}}>
            <Button type="submit" variant="contained">{initial ? 'Update Event' : 'Create Event'}</Button>
          </div>
        </Stack>
      </form>
    </Paper>
  )
}
