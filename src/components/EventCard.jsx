import React from 'react'
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material'
import { useEventDispatch } from '../context/EventContext'

export default function EventCard({event}){
  const dispatch = useEventDispatch()

  const book = ()=>{
    dispatch({type:'BOOK_EVENT', payload: event})
    alert('Event added to My Events')
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{event.title}</Typography>
        <Typography variant="body2" color="text.secondary">{event.date} • {event.location}</Typography>
        <Typography variant="body1" style={{marginTop:8}}>{event.body?.slice(0,120)}...</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={book}>Add to My Events</Button>
      </CardActions>
    </Card>
  )
}
