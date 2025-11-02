import React, {useEffect, useState} from 'react'
import API from '../api'
import DataTable from '../components/DataTable'

export default function TablePage(){
  const [records, setRecords] = useState([])
  const [q, setQ] = useState('')
  useEffect(()=>{ fetchRecords() }, [])
  async function fetchRecords(){
    const res = await API.get('/records')
    setRecords(res.data)
  }
  function openLink(url){ window.open(url, '_blank') }
  async function search(){
    const res = await API.get('/records', { params: { q }})
    setRecords(res.data)
  }
  return (
    <div style={{padding:20}}>
      <h2>Registros</h2>
      <div style={{marginBottom:10}}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Pesquisar..." />
        <button onClick={search}>Buscar</button>
        <button onClick={fetchRecords}>Atualizar</button>
      </div>
      <DataTable records={records} onOpen={openLink} />
    </div>
  )
}
