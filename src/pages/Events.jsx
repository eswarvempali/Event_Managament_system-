import React, { useEffect } from 'react'
import { Typography, CircularProgress } from '@mui/material'
import EventList from '../components/EventList'
import { useFetch } from '../hooks/useFetch'
import { useEventState, useEventDispatch } from '../context/EventContext'

function augmentPosts(posts){
  // convert placeholder posts into sports events (indoor/outdoor)
  const sports = [
    'Badminton Tournament', 'Table Tennis League', 'Basketball Match', 'Cricket Friendly', 'Football Cup',
    'Indoor Chess Championship', 'Swimming Gala', 'Tennis Open', 'Volleyball Tournament', 'Kabaddi Clash',
    'Athletics Meet', 'Yoga Session'
  ]
  const categories = ['Indoor','Outdoor']
  const locations = ['Main Hall','Ground A','Stadium','Court 2','Sports Complex','Aquatic Center','Open Ground']
  return posts.map((p,i)=>({
    id: 'api-' + p.id,
    title: sports[i % sports.length],
    body: p.body,
    date: new Date(Date.now() + i*86400000).toISOString().slice(0,10),
    location: locations[i % locations.length],
    category: categories[i % 2],
    capacity: 50 + (i%5)*10
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
