import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const EventStateContext = createContext()
const EventDispatchContext = createContext()

const initialState = {
  events: [],
  myEvents: []
}

function reducer(state, action){
  switch(action.type){
    case 'SET_EVENTS':
      return {...state, events: action.payload}
    case 'ADD_EVENT':
      return {...state, events: [action.payload, ...state.events]}
    case 'BOOK_EVENT':
      return {...state, myEvents: [action.payload, ...state.myEvents]}
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
