import React, { useState } from 'react';
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function ModernUploadPage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();
  
  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!file) {
      setMessage('Por favor, selecione um arquivo Excel (.xlsx ou .xls)');
      setMessageType('error');
      return;
    }
    
    setUploading(true);
    setMessage('');
    
    try {
      const fd = new FormData();
      fd.append('file', file);
      
      const response = await API.post('/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setMessage(`Upload realizado com sucesso! ${response.data.meta?.rows || 0} registros processados.`);
      setMessageType('success');
      
      // Redirecionar após 2 segundos
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (error) {
      setMessage(`Erro no upload: ${error?.response?.data?.detail || error.message}`);
      setMessageType('error');
    } finally {
      setUploading(false);
    }
  }
  
  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setMessage('');
    
    // Validar extensão
    if (selectedFile && !selectedFile.name.match(/\.(xlsx|xls)$/i)) {
      setMessage('Por favor, selecione apenas arquivos Excel (.xlsx ou .xls)');
      setMessageType('error');
      setFile(null);
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Voltar */}
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center space-x-2 text-gov-primary hover:text-gov-dark mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Voltar para o Dashboard</span>
        </button>
        
        {/* Card principal */}
        <div className="gov-card p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gov-light rounded-full mb-4">
              <FileSpreadsheet className="w-8 h-8 text-gov-primary" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Atualizar Planilha
            </h1>
            <p className="text-gray-600">
              Faça o upload de uma planilha Excel (.xlsx ou .xls) para atualizar os dados do sistema
            </p>
          </div>
          
          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selecione o arquivo
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-gov-primary transition-colors">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="gov-button-primary inline-flex items-center space-x-2">
                      <Upload className="w-5 h-5" />
                      <span>Escolher arquivo</span>
                    </span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      accept=".xlsx,.xls"
                      onChange={handleFileChange}
                      disabled={uploading}
                    />
                  </label>
                  <p className="mt-2 text-sm text-gray-600">
                    {file ? file.name : 'Nenhum arquivo selecionado'}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Mensagem */}
            {message && (
              <div className={`p-4 rounded-lg flex items-start space-x-3 ${
                messageType === 'success' 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                {messageType === 'success' ? (
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                )}
                <p className={`text-sm ${
                  messageType === 'success' ? 'text-green-800' : 'text-red-800'
                }`}>
                  {message}
                </p>
              </div>
            )}
            
            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="gov-button-secondary flex-1"
                disabled={uploading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="gov-button-primary flex-1 flex items-center justify-center space-x-2"
                disabled={uploading || !file}
              >
                {uploading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5" />
                    <span>Enviar Planilha</span>
                  </>
                )}
              </button>
            </div>
          </form>
          
          {/* Informações */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              Instruções:
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start space-x-2">
                <span className="text-gov-primary mt-0.5">•</span>
                <span>A planilha deve estar no formato Excel (.xlsx ou .xls)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-gov-primary mt-0.5">•</span>
                <span>Todas as abas serão processadas automaticamente</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-gov-primary mt-0.5">•</span>
                <span>Os dados antigos serão substituídos pelos novos</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

