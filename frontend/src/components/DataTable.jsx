import React from 'react';

export default function DataTable({records, onOpen}){
  if(!records || records.length===0) return <p>Sem registros</p>
  const columns = Object.keys(records[0].data);
  return (
    <div style={{overflowX:'auto'}}>
      <table border="1" cellPadding="6" cellSpacing="0">
        <thead>
          <tr>
            <th>#</th>
            {columns.map(c=> <th key={c}>{c}</th>)}
            <th>Link</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {records.map(r=> (
            <tr key={r.id}>
              <td>{r.row_number}</td>
              {columns.map(c=> <td key={c}>{r.data[c]}</td>)}
              <td>{r.link ? <a href={r.link} target="_blank" rel="noreferrer">Abrir</a> : '-'}</td>
              <td>{r.link && <button onClick={()=>onOpen(r.link)}>Abrir</button>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
