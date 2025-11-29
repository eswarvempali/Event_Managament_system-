import React, { useState } from 'react'
import { Typography } from '@mui/material'
import EventList from '../components/EventList'
import EventForm from '../components/EventForm'
import { useEventState } from '../context/EventContext'

export default function Admin(){
  const { events, registrations } = useEventState()
  const [editing, setEditing] = useState(null)

  return (
    <div style={{marginTop:16}}>
      <Typography variant="h5">Admin Panel — Manage Events</Typography>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginTop:12}}>
        <div>
          <Typography variant="h6">Create / Edit Event</Typography>
          <EventForm initial={editing} onSaved={()=> setEditing(null)} />
        </div>
        <div>
          <Typography variant="h6">Existing Events</Typography>
          <EventList events={events} adminPane onEdit={ev=> setEditing(ev)} registrations={registrations} />
        </div>
      </div>
    </div>
  )
}
