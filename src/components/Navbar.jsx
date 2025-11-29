import React from 'react'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useEventState, useEventDispatch } from '../context/EventContext'

export default function Navbar(){
  const { isAdmin } = useEventState()
  const dispatch = useEventDispatch()

  const logout = ()=>{
    dispatch({type:'SET_ADMIN', payload:false})
  }

  return (
    <AppBar position="static">
      <Toolbar style={{display:'flex',gap:12}}>
        <Typography variant="h6" component={RouterLink} to="/" style={{color:'#fff',textDecoration:'none',flex:1}}>
          Event Manager
        </Typography>
        <Button color="inherit" component={RouterLink} to="/events">Events</Button>
        <Button color="inherit" component={RouterLink} to="/user">User</Button>
        <Button color="inherit" component={RouterLink} to="/admin">Admin</Button>
        <Button color="inherit" component={RouterLink} to="/my-events">My Events</Button>
        <Button color="inherit" component={RouterLink} to="/about">About</Button>
        {isAdmin && <Button color="inherit" onClick={logout}>Logout</Button>}
      </Toolbar>
    </AppBar>
  )
}
