import React from 'react'
import EventCard from './EventCard'

export default function EventList({events}){
  if(!events || events.length === 0) return <div>No events found.</div>
  return (
    <div className="grid">
      {events.map(ev=> <EventCard key={ev.id} event={ev} />)}
    </div>
  )
}
