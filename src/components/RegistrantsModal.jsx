import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText, Typography, IconButton } from '@mui/material'
import { saveAs } from 'file-saver'
import DeleteIcon from '@mui/icons-material/Delete'
import { useEventDispatch } from '../context/EventContext'

function toCSV(entries){
  const rows = [['id','name']]
  entries.forEach(e=> rows.push([e.id, '"'+(e.name||'')+'"']))
  return rows.map(r=> r.join(',')).join('\n')
}

export default function RegistrantsModal({open, onClose, registrants=[], eventId}){
  const dispatch = useEventDispatch()

  const exportCSV = ()=>{
    const csv = toCSV(registrants)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    saveAs(blob, 'registrants.csv')
  }

  const remove = (userId)=>{
    if(!confirm('Remove this registrant?')) return
    dispatch({type:'UNREGISTER', payload:{ eventId, userId }})
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Registrants ({registrants.length})</DialogTitle>
      <DialogContent>
        {registrants.length === 0 ? <Typography>No registrants yet.</Typography> : (
          <List>
            {registrants.map(r=> (
              <ListItem key={r.id} secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={()=>remove(r.id)}>
                  <DeleteIcon />
                </IconButton>
              }>
                <ListItemText primary={r.name} secondary={r.email || ''} />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={exportCSV}>Export CSV</Button>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}
