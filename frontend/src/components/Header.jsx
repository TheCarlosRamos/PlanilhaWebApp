import React from 'react';
import { Upload } from 'lucide-react';

export default function Header({ onUploadClick, lastUpdate }) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="bg-ppi-blue text-white font-bold text-xl px-4 py-2 rounded shadow-sm">
              CPPI
            </div>
            <div className="hidden md:block border-l border-gray-300 pl-4">
              <h1 className="text-lg font-semibold text-gray-900">
                Acompanhamento de Resoluções e Decretos
              </h1>
              <p className="text-sm text-gray-500">
                Programa de Parcerias de Investimentos
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          {lastUpdate && (
            <div className="hidden md:block text-sm text-gray-600">
              Última atualização: {new Date(lastUpdate).toLocaleString('pt-BR')}
            </div>
          )}
          <button
            onClick={onUploadClick}
            className="gov-button-primary flex items-center space-x-2"
          >
            <Upload className="w-5 h-5" />
            <span className="hidden sm:inline">Atualizar Planilha</span>
            <span className="sm:hidden">Upload</span>
          </button>
        </div>
      </div>
    </header>
  );
}

