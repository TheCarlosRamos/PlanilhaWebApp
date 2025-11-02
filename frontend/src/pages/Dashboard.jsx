import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, X, Download, Menu } from 'lucide-react';
import API from '../api';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ModernDataTable from '../components/ModernDataTable';

export default function Dashboard() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSheet, setActiveSheet] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);
  
  // Carregar dados iniciais
  useEffect(() => {
    fetchRecords();
  }, []);
  
  async function fetchRecords() {
    setLoading(true);
    try {
      const res = await API.get('/records?limit=10000');
      setRecords(res.data);
      
      // Determinar última atualização
      if (res.data.length > 0) {
        const latest = res.data.sort((a, b) => 
          new Date(b.created_at) - new Date(a.created_at)
        )[0];
        setLastUpdate(latest.created_at);
      }
    } catch (error) {
      console.error('Erro ao buscar registros:', error);
    } finally {
      setLoading(false);
    }
  }
  
  // Organizar dados por aba
  const sheetsData = useMemo(() => {
    const sheets = {};
    
    records.forEach(record => {
      const sheetName = record.data._aba_origem || 'Geral';
      
      if (!sheets[sheetName]) {
        sheets[sheetName] = [];
      }
      sheets[sheetName].push(record);
    });
    
    return Object.entries(sheets)
      .map(([name, records]) => ({
        name,
        count: records.length,
        records
      }))
      .sort((a, b) => {
        // Ordenar: anos primeiro (numérico), depois "Referendar" e "Pendentes"
        const aIsYear = /^\d{4}/.test(a.name);
        const bIsYear = /^\d{4}/.test(b.name);
        
        if (aIsYear && bIsYear) return a.name.localeCompare(b.name);
        if (aIsYear) return -1;
        if (bIsYear) return 1;
        return a.name.localeCompare(b.name);
      });
  }, [records]);
  
  // Definir aba ativa inicial
  useEffect(() => {
    if (!activeSheet && sheetsData.length > 0) {
      setActiveSheet(sheetsData[sheetsData.length - 1].name); // Última aba (mais recente)
    }
  }, [sheetsData, activeSheet]);
  
  // Filtrar registros pela aba ativa e busca
  const filteredRecords = useMemo(() => {
    let filtered = records;
    
    // Filtrar por aba
    if (activeSheet) {
      filtered = filtered.filter(r => r.data._aba_origem === activeSheet);
    }
    
    // Filtrar por busca
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(record => {
        return Object.values(record.data).some(value => {
          const str = String(value || '').toLowerCase();
          return str.includes(query);
        });
      });
    }
    
    return filtered;
  }, [records, activeSheet, searchQuery]);
  
  // Obter colunas da tabela
  const columns = useMemo(() => {
    if (filteredRecords.length === 0) return [];
    return Object.keys(filteredRecords[0].data);
  }, [filteredRecords]);
  
  // Função para abrir links
  function openLink(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
  
  // Função para exportar CSV
  function exportToCSV() {
    if (filteredRecords.length === 0) return;
    
    // Obter colunas
    const cols = Object.keys(filteredRecords[0].data);
    
    // Criar CSV
    const headers = ['#', ...cols].join(',');
    const rows = filteredRecords.map(r => {
      const values = [r.row_number, ...cols.map(c => {
        const val = r.data[c] || '';
        // Escapar vírgulas e aspas
        return `"${String(val).replace(/"/g, '""')}"`;
      })];
      return values.join(',');
    });
    
    const csv = [headers, ...rows].join('\n');
    
    // Download
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${activeSheet || 'dados'}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  }
  
  // Função para mostrar modal de upload
  function handleUploadClick() {
    if (window.confirm('Deseja fazer upload de uma nova planilha?')) {
      window.location.href = '/upload';
    }
  }
  
  // Limpar filtros
  function clearFilters() {
    setSearchQuery('');
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <Header onUploadClick={handleUploadClick} lastUpdate={lastUpdate} />
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          sheets={sheetsData}
          activeSheet={activeSheet}
          onSelectSheet={setActiveSheet}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          isOpen={sidebarOpen}
        />
        
        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Título da aba + badge */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {activeSheet || 'Selecione uma aba'}
                  </h2>
                  {filteredRecords.length > 0 && (
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="gov-badge-primary">
                        {filteredRecords.length} {filteredRecords.length === 1 ? 'item' : 'itens'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {filteredRecords.length > 0 && (
                <button
                  onClick={exportToCSV}
                  className="gov-button-secondary flex items-center space-x-2"
                >
                  <Download className="w-5 h-5" />
                  <span className="hidden sm:inline">Exportar CSV</span>
                </button>
              )}
            </div>
            
            {/* Barra de filtros */}
            <div className="gov-card p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Campo de busca */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar em todos os campos..."
                    className="w-full pl-10 gov-input"
                  />
                </div>
                
                {/* Botão limpar */}
                {(searchQuery) && (
                  <button
                    onClick={clearFilters}
                    className="gov-button-secondary flex items-center space-x-2"
                  >
                    <X className="w-5 h-5" />
                    <span>Limpar</span>
                  </button>
                )}
              </div>
            </div>
            
            {/* Tabela */}
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gov-primary"></div>
                <p className="mt-4 text-gray-500">Carregando dados...</p>
              </div>
            ) : (
              <ModernDataTable
                records={filteredRecords}
                columns={columns}
                onOpenLink={openLink}
              />
            )}
          </div>
        </main>
      </div>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 px-6">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div>
            © 2025 Programa de Parcerias de Investimentos - CPPI
          </div>
          <div>
            {lastUpdate && `Última atualização: ${new Date(lastUpdate).toLocaleString('pt-BR')}`}
          </div>
        </div>
      </footer>
    </div>
  );
}

