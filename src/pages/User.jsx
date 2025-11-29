import React from 'react'
import { Typography } from '@mui/material'
import EventList from '../components/EventList'
import { useEventState } from '../context/EventContext'

export default function User(){
  const { events } = useEventState()
  return (
    <div style={{marginTop:16}}>
      <Typography variant="h5">User — Browse & Register</Typography>
      <EventList events={events} />
    </div>
  )
}
