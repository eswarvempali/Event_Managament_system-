import React from 'react'
import { Typography, Paper } from '@mui/material'
import { useEventState } from '../context/EventContext'

export default function MyEvents(){
  const { events, registrations, currentUser } = useEventState()
  if(!currentUser) return (
    <Paper style={{padding:16, marginTop:16}}>
      <Typography variant="h6">No user found</Typography>
      <Typography variant="body2">Please register for an event first from the User page (you will be prompted for your name).</Typography>
    </Paper>
  )

  // find event ids where current user registered
  const registeredEventIds = Object.entries(registrations || {}).filter(([eventId, list])=> list.some(u=> u.id === currentUser.id)).map(([id])=> id)
  const myEvents = events.filter(ev => registeredEventIds.includes(String(ev.id)))

  return (
    <div style={{marginTop:16}}>
      <Typography variant="h5">My Registered Events — {currentUser.name}</Typography>
      {myEvents.length === 0 ? <Typography style={{marginTop:8}}>You have no registered events.</Typography> : (
        <div style={{marginTop:12, display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:16}}>
          {myEvents.map(ev=> (
            <div key={ev.id}>
              <Typography variant="h6">{ev.title}</Typography>
              <Typography variant="body2">{ev.date} • {ev.location}</Typography>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
