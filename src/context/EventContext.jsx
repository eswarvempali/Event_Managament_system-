import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const EventStateContext = createContext()
const EventDispatchContext = createContext()

const initialState = {
  events: [],
  myEvents: [],
  registrations: {}, // { [eventId]: [{id, name, email?}] }
  currentUser: null
}

function reducer(state, action){
  switch(action.type){
    case 'SET_EVENTS':
      // initialize registrations for events if missing
      const regs = {...state.registrations}
      (action.payload || []).forEach(ev=>{ if(!regs[ev.id]) regs[ev.id] = regs[ev.id] || [] })
      return {...state, events: action.payload, registrations: regs}
    case 'ADD_EVENT':
      return {...state, events: [action.payload, ...state.events], registrations: {...state.registrations, [action.payload.id]: []}}
    case 'MODIFY_EVENT':
      return {...state, events: state.events.map(ev=> ev.id === action.payload.id ? action.payload : ev)}
    case 'DELETE_EVENT':
      const nextEvents = state.events.filter(ev=> ev.id !== action.payload)
      const nextRegs = {...state.registrations}
      delete nextRegs[action.payload]
      return {...state, events: nextEvents, registrations: nextRegs}
    case 'BOOK_EVENT':
      return {...state, myEvents: [action.payload, ...state.myEvents]}
    case 'REGISTER':
      // payload: { eventId, user }
      const { eventId, user } = action.payload
      const cur = state.registrations[eventId] || []
      return {...state, registrations: {...state.registrations, [eventId]: [user, ...cur]}, currentUser: state.currentUser || user}
    case 'SET_CURRENT_USER':
      return {...state, currentUser: action.payload}
    case 'UNREGISTER':
      // payload: { eventId, userId }
      const { userId } = action.payload
      const list = (state.registrations[action.payload.eventId] || []).filter(u=>u.id !== userId)
      return {...state, registrations: {...state.registrations, [action.payload.eventId]: list}}
    case 'SET_MY_EVENTS':
      return {...state, myEvents: action.payload}
    default:
      return state
  }
}

export function EventProvider({children}){
  const [persisted, setPersisted] = useLocalStorage('ems_state', initialState)
  const [state, dispatch] = useReducer(reducer, persisted || initialState)

  useEffect(()=>{
    setPersisted(state)
  },[state, setPersisted])

  return (
    <EventStateContext.Provider value={state}>
      <EventDispatchContext.Provider value={dispatch}>
        {children}
      </EventDispatchContext.Provider>
    </EventStateContext.Provider>
  )
}

export function useEventState(){
  const ctx = useContext(EventStateContext)
  if (!ctx) throw new Error('useEventState must be used within EventProvider')
  return ctx
}

export function useEventDispatch(){
  const ctx = useContext(EventDispatchContext)
  if (!ctx) throw new Error('useEventDispatch must be used within EventProvider')
  return ctx
}
