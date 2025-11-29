import React from 'react'
import { Navigate } from 'react-router-dom'
import { useEventState } from '../context/EventContext'

export default function ProtectedRoute({ children }){
  const { isAdmin } = useEventState()
  if(!isAdmin) return <Navigate to="/admin/login" replace />
  return children
}
