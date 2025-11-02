import React from 'react';
import { FolderOpen } from 'lucide-react';
import clsx from 'clsx';

export default function Sidebar({ sheets, activeSheet, onSelectSheet, onToggle, isOpen }) {
  return (
    <>
      {/* Backdrop para mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <aside className={clsx(
        "fixed lg:static inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out",
        "w-64 overflow-y-auto",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-4">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
            Abas da Planilha
          </h2>
          
          <nav className="space-y-1">
            {sheets.map((sheet) => {
              const isActive = activeSheet === sheet.name;
              const count = sheet.count || 0;
              
              return (
                <button
                  key={sheet.name}
                  onClick={() => {
                    onSelectSheet(sheet.name);
                    onToggle(); // Fecha o menu no mobile após selecionar
                  }}
                  className={clsx(
                    "w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-ppi-accent focus-visible:ring-offset-2",
                    isActive 
                      ? "bg-ppi-blue text-white shadow-sm" 
                      : "text-ppi-dark hover:bg-ppi-blue-light active:bg-ppi-blue active:text-white"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <FolderOpen className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium">{sheet.name}</span>
                  </div>
                  <span className={clsx(
                    "text-xs font-semibold px-2 py-1 rounded-full",
                    isActive ? "bg-white/20" : "bg-gray-200"
                  )}>
                    {count}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}

