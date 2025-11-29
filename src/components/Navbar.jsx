import React from 'react'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export default function Navbar(){
  return (
    <AppBar position="static">
      <Toolbar style={{display:'flex',gap:12}}>
        <Typography variant="h6" component={RouterLink} to="/" style={{color:'#fff',textDecoration:'none',flex:1}}>
          Event Manager
        </Typography>
        <Button color="inherit" component={RouterLink} to="/events">Events</Button>
        <Button color="inherit" component={RouterLink} to="/create">Create</Button>
        <Button color="inherit" component={RouterLink} to="/my-events">My Events</Button>
        <Button color="inherit" component={RouterLink} to="/about">About</Button>
      </Toolbar>
    </AppBar>
  )
}
