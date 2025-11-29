import React, { useState } from 'react'
import { Typography } from '@mui/material'
import EventList from '../components/EventList'
import EventForm from '../components/EventForm'
import { useEventState } from '../context/EventContext'
import RegistrantsModal from '../components/RegistrantsModal'
import AdminLogin from '../components/AdminLogin'

export default function Admin(){
  const { events, registrations } = useEventState()
  const [editing, setEditing] = useState(null)

  const [modalOpen, setModalOpen] = useState(false)
  const [modalRegs, setModalRegs] = useState([])
  React.useEffect(()=>{
    const handler = (e)=>{
      const id = e.detail?.eventId
      if(!id) return
      const regs = registrations[id] || []
      setModalRegs(regs)
      setModalOpen(true)
    }
    window.addEventListener('open-registrants', handler)
    return ()=> window.removeEventListener('open-registrants', handler)
  },[registrations])

  return (
    <div style={{marginTop:16}}>
      <Typography variant="h5">Admin Panel — Manage Events</Typography>
      {!isAdmin ? (
        <div style={{marginTop:12}}>
          <AdminLogin />
        </div>
      ) : (
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
      )}
      <RegistrantsModal open={modalOpen} registrants={modalRegs} onClose={()=> setModalOpen(false)} />
    </div>
  )
}
