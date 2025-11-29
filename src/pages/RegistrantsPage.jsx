import React, { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Typography, TextField, Paper, Button, List, ListItem, ListItemText, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useEventState, useEventDispatch } from '../context/EventContext'
import { saveAs } from 'file-saver'

function toCSV(entries){
  const rows = [['id','name','email']]
  entries.forEach(e=> rows.push([e.id, '"'+(e.name||'')+'"', '"'+(e.email||'')+'"']))
  return rows.map(r=> r.join(',')).join('\n')
}

export default function RegistrantsPage(){
  const { id } = useParams()
  const { events, registrations } = useEventState()
  const dispatch = useEventDispatch()
  const [q, setQ] = useState('')

  const event = events.find(e=> String(e.id) === String(id))
  const regs = registrations[id] || []

  const filtered = useMemo(()=>{
    if(!q) return regs
    return regs.filter(r=> r.name.toLowerCase().includes(q.toLowerCase()))
  },[q, regs])

  const remove = (userId)=>{
    if(!confirm('Remove this registrant?')) return
    dispatch({type:'UNREGISTER', payload:{ eventId: id, userId }})
  }

  const exportCSV = ()=>{
    const csv = toCSV(filtered)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    saveAs(blob, `registrants_${id}.csv`)
  }

  if(!event) return <Typography style={{marginTop:16}}>Event not found.</Typography>

  return (
    <div style={{marginTop:16}}>
      <Typography variant="h5">Registrants — {event.title}</Typography>
      <Paper style={{padding:12, marginTop:12}}>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <TextField label="Search by name" value={q} onChange={e=>setQ(e.target.value)} />
          <Button variant="contained" onClick={exportCSV}>Export CSV</Button>
        </div>
        <List>
          {filtered.map(r=> (
            <ListItem key={r.id} secondaryAction={
              <IconButton edge="end" aria-label="delete" onClick={()=>remove(r.id)}>
                <DeleteIcon />
              </IconButton>
            }>
              <ListItemText primary={r.name} secondary={r.email || ''} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  )
}
