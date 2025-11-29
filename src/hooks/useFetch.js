import { useEffect, useState } from 'react'
import axios from 'axios'

export function useFetch(url){
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(()=>{
    let mounted = true
    setLoading(true)
    axios.get(url).then(res=>{
      if(!mounted) return
      setData(res.data)
    }).catch(err=>{
      if(!mounted) return
      setError(err)
    }).finally(()=>mounted && setLoading(false))

    return ()=>{mounted = false}
  },[url])

  return {data, loading, error}
}
