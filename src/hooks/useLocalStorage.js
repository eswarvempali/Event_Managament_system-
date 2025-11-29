import { useCallback, useState } from 'react'

export function useLocalStorage(key, initial){
  const [state, setState] = useState(()=>{
    try{
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : initial
    }catch(e){
      console.error('useLocalStorage parse error', e)
      return initial
    }
  })

  const save = useCallback((val)=>{
    try{
      const next = typeof val === 'function' ? val(state) : val
      setState(next)
      localStorage.setItem(key, JSON.stringify(next))
    }catch(e){
      console.error('useLocalStorage save error', e)
    }
  },[key, state])

  return [state, save]
}
