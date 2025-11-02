import React, { useState } from 'react';
import { ExternalLink, ChevronDown, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

function TruncatedText({ text, maxLength = 150 }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!text || text.length <= maxLength) {
    return <span>{text}</span>;
  }
  
  const truncated = text.substring(0, maxLength).trim() + '...';
  
  return (
    <div>
      <span>{isExpanded ? text : truncated}</span>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="ml-2 text-ppi-blue hover:text-ppi-dark hover:underline text-sm font-medium focus-visible:ring-2 focus-visible:ring-ppi-accent rounded"
      >
        {isExpanded ? 'Ver menos' : 'Leia mais'}
      </button>
    </div>
  );
}

function ExpandableCell({ content, isOpen, onToggle }) {
  return (
    <td className="px-4 py-3 text-sm">
      <button
        onClick={onToggle}
        className="flex items-center space-x-2 text-left hover:text-ppi-blue transition-colors focus-visible:ring-2 focus-visible:ring-ppi-accent rounded"
      >
        {isOpen ? (
          <ChevronDown className="w-4 h-4 flex-shrink-0 text-ppi-blue" />
        ) : (
          <ChevronRight className="w-4 h-4 flex-shrink-0 text-ppi-blue" />
        )}
        <TruncatedText text={content} maxLength={50} />
      </button>
    </td>
  );
}

export default function ModernDataTable({ records, columns, onOpenLink }) {
  const [expandedRows, setExpandedRows] = useState(new Set());
  
  const toggleRow = (id) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };
  
  if (!records || records.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Nenhum registro encontrado</p>
      </div>
    );
  }
  
  // Definir colunas importantes (prioridade visual)
  const importantColumns = columns.filter(col => 
    !['_aba_origem'].includes(col) &&
    !col.toLowerCase().includes('observação')
  );
  
  // Colunas secundárias
  const secondaryColumns = columns.filter(col => 
    col.toLowerCase().includes('observação')
  );
  
  return (
    <div className="gov-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
                #
              </th>
              {importantColumns.map((col) => (
                <th key={col} className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider min-w-[150px]">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {records.map((record, idx) => {
              const isExpanded = expandedRows.has(record.id);
              
              return (
                <React.Fragment key={record.id}>
                  <tr className={clsx(
                    "gov-table-row",
                    idx % 2 === 0 ? "bg-white" : "bg-ppi-gray"
                  )}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 sticky left-0 bg-inherit z-10">
                      {record.row_number}
                    </td>
                    
                    {importantColumns.map((col, colIdx) => {
                      const value = record.data[col];
                      const hasLink = col.toLowerCase().includes('link') && value;
                      
                      // Casos especiais de renderização
                      if (col.toLowerCase() === 'ementa' || col.toLowerCase() === 'projetos') {
                        return (
                          <ExpandableCell
                            key={col}
                            content={value}
                            isOpen={isExpanded}
                            onToggle={() => toggleRow(record.id)}
                          />
                        );
                      }
                      
                      if (hasLink) {
                        return (
                          <td key={col} className="px-4 py-3 text-sm">
                            <a
                              href={value}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center space-x-1 text-ppi-blue hover:text-ppi-dark hover:underline focus-visible:ring-2 focus-visible:ring-ppi-accent rounded"
                              onClick={(e) => {
                                e.preventDefault();
                                onOpenLink(value);
                              }}
                            >
                              <span className="truncate max-w-xs">{value}</span>
                              <ExternalLink className="w-4 h-4 flex-shrink-0" />
                            </a>
                          </td>
                        );
                      }
                      
                      return (
                        <td key={col} className="px-4 py-3 text-sm text-gray-900 break-words">
                          <TruncatedText text={value} maxLength={100} />
                        </td>
                      );
                    })}
                  </tr>
                  
                  {/* Linha expandida com colunas secundárias */}
                  {isExpanded && secondaryColumns.length > 0 && (
                    <tr className="bg-gray-100">
                      <td colSpan={importantColumns.length + 1} className="px-4 py-4">
                        <div className="space-y-2">
                          {secondaryColumns.map((col) => (
                            <div key={col}>
                              <strong className="text-xs font-semibold text-gray-700 uppercase">
                                {col}:
                              </strong>
                              <p className="text-sm text-gray-900 mt-1">
                                {record.data[col] || '-'}
                              </p>
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

