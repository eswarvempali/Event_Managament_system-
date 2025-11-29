import React from 'react'
import { Typography } from '@mui/material'
import EventForm from '../components/EventForm'

export default function CreateEvent(){
  return (
    <div style={{marginTop:16}}>
      <Typography variant="h5">Create Event</Typography>
      <EventForm />
    </div>
  )
}
