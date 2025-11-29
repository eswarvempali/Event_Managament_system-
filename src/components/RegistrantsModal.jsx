import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText, Typography } from '@mui/material'
import { saveAs } from 'file-saver'

function toCSV(entries){
  const rows = [['id','name']]
  entries.forEach(e=> rows.push([e.id, '"'+(e.name||'')+'"']))
  return rows.map(r=> r.join(',')).join('\n')
}

export default function RegistrantsModal({open, onClose, registrants=[]}){
  const exportCSV = ()=>{
    const csv = toCSV(registrants)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    saveAs(blob, 'registrants.csv')
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Registrants ({registrants.length})</DialogTitle>
      <DialogContent>
        {registrants.length === 0 ? <Typography>No registrants yet.</Typography> : (
          <List>
            {registrants.map(r=> (
              <ListItem key={r.id}><ListItemText primary={r.name} secondary={r.email || ''} /></ListItem>
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
