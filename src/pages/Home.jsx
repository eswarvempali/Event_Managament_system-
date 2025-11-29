import React from 'react'
import { Typography, Paper } from '@mui/material'

export default function Home(){
  return (
    <div>
      <Paper style={{padding:20, marginTop:16}}>
        <Typography variant="h4">Welcome to Event Manager</Typography>
        <Typography variant="body1" style={{marginTop:8}}>Create, browse and save events — no backend required. Data persists in Local Storage.</Typography>
      </Paper>
    </div>
  )
}
