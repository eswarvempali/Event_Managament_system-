import React from 'react'
import { Typography, Paper } from '@mui/material'

export default function About(){
  return (
    <Paper style={{padding:16, marginTop:16}}>
      <Typography variant="h5">About</Typography>
      <Typography variant="body1" style={{marginTop:8}}>This demo Event Management frontend demonstrates React component design, hooks, context state management, routing, API fetch, and local persistence using Local Storage. Built with React and MUI.</Typography>
    </Paper>
  )
}
