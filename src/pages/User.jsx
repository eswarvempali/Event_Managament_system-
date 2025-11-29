import React from 'react'
import { Typography } from '@mui/material'
import EventList from '../components/EventList'
import { useEventState } from '../context/EventContext'

export default function User(){
  const { events } = useEventState()
  return (
    <div style={{marginTop:16}}>
      <Typography variant="h5">Events Catalog — Browse & Register for Sports</Typography>
      <Typography variant="body1" style={{marginTop:8}}>
        Browse upcoming indoor and outdoor sports events below. Click "Register" on any event to reserve your spot — you'll be prompted for a name the first time.
      </Typography>
      <div style={{marginTop:12}}>
        <EventList events={events} />
      </div>
    </div>
  )
}
