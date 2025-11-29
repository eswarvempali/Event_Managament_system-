import React from 'react'
import { Card, CardContent, CardActions, Button, Typography, Chip } from '@mui/material'
import { useEventDispatch, useEventState } from '../context/EventContext'

export default function EventCard({event, showAdmin=false, onEdit}){
  const dispatch = useEventDispatch()
  const { registrations, currentUser } = useEventState()
  const regCount = (registrations && registrations[event.id]) ? registrations[event.id].length : 0

  const register = ()=>{
    let user = currentUser
    if(!user){
      const name = prompt('Enter your name to register for this event')
      if(!name) return
      user = { id: 'u-' + Date.now(), name }
      dispatch({type:'SET_CURRENT_USER', payload: user})
    }
    dispatch({type:'REGISTER', payload:{ eventId: event.id, user }})
    alert('Registered: ' + user.name)
  }

  const remove = ()=>{
    if(!confirm('Delete this event?')) return
    dispatch({type:'DELETE_EVENT', payload: event.id})
  }

  const viewRegistrants = ()=>{
    // raise event that admin page can use (simple approach: window event)
    const ev = new CustomEvent('open-registrants', { detail: { eventId: event.id } })
    window.dispatchEvent(ev)
  }

  return (
    <Card>
      <CardContent>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <Typography variant="h6">{event.title}</Typography>
          <Chip label={event.category || 'Sport'} size="small" />
        </div>
        <Typography variant="body2" color="text.secondary">{event.date} • {event.location || 'TBD'}</Typography>
        <Typography variant="body1" style={{marginTop:8}}>{event.body?.slice(0,120)}...</Typography>
        <Typography variant="caption" style={{display:'block', marginTop:8}}>Capacity: {event.capacity || '—'}</Typography>
        <Typography variant="caption" style={{display:'block'}}>Registered: {regCount}</Typography>
      </CardContent>
      <CardActions>
        {!showAdmin && <Button size="small" onClick={register}>Register</Button>}
        {showAdmin && <>
          <Button size="small" onClick={()=> onEdit && onEdit(event)}>Edit</Button>
          <Button size="small" onClick={viewRegistrants}>Registrants</Button>
          <Button size="small" color="error" onClick={remove}>Delete</Button>
        </>}
      </CardActions>
    </Card>
  )
}
