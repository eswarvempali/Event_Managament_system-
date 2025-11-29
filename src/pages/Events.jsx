import React, { useEffect } from 'react'
import { Typography, CircularProgress } from '@mui/material'
import EventList from '../components/EventList'
import { useFetch } from '../hooks/useFetch'
import { useEventState, useEventDispatch } from '../context/EventContext'

function augmentPosts(posts){
  // add date and location to placeholder posts
  const locations = ['New York','London','Paris','Berlin','Tokyo','Online','Sydney']
  return posts.map((p,i)=>({
    id: p.id,
    title: p.title,
    body: p.body,
    date: new Date(Date.now() + i*86400000).toISOString().slice(0,10),
    location: locations[i % locations.length]
  }))
}

export default function Events(){
  const {data, loading, error} = useFetch('https://jsonplaceholder.typicode.com/posts?_limit=12')
  const { events } = useEventState()
  const dispatch = useEventDispatch()

  useEffect(()=>{
    if(data){
      const evs = augmentPosts(data)
      dispatch({type:'SET_EVENTS', payload: evs})
    }
  },[data, dispatch])

  return (
    <div style={{marginTop:16}}>
      <Typography variant="h5">Events</Typography>
      {loading && <div className="center" style={{padding:24}}><CircularProgress /></div>}
      {error && <div style={{color:'red'}}>Failed to load remote events</div>}
      {!loading && <EventList events={events} />}
    </div>
  )
}
