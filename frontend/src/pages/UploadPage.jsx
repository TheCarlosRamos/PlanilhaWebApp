import React, {useState} from 'react';
import API from '../api';

export default function UploadPage(){
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');
  async function submit(e){
    e.preventDefault();
    if(!file) return setMsg('Selecione um arquivo');
    const fd = new FormData();
    fd.append('file', file);
    try{
      const r = await API.post('/upload', fd, { headers: {'Content-Type': 'multipart/form-data'} });
      setMsg(`Upload com sucesso: ${r.data.filename} (${r.data.meta?.rows} linhas)`)
    }catch(err){
      setMsg('Erro no upload: ' + (err?.response?.data?.detail || err.message))
    }
  }
  return (
    <div style={{padding:20}}>
      <h2>Upload da planilha</h2>
      <form onSubmit={submit}>
        <input type="file" accept=".xlsx,.xls" onChange={e=>setFile(e.target.files[0])} />
        <button type="submit">Enviar</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  )
}
