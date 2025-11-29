import React from 'react'
import { Typography } from '@mui/material'
import EventList from '../components/EventList'
import { useEventState } from '../context/EventContext'

export default function MyEvents(){
  const { myEvents } = useEventState()
  return (
    <div style={{marginTop:16}}>
      <Typography variant="h5">My Events</Typography>
      <EventList events={myEvents} />
    </div>
  )
}
