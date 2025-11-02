/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ppi: {
          blue: '#1E40AF',           // Azul principal PPI
          'blue-light': '#EFF6FF',   // Fundo claro
          gray: '#F9FAFB',           // Fundo tabela
          dark: '#1F2937',           // Texto escuro
          accent: '#2563EB',         // Hover, links
          success: '#10B981',        // Status positivo
          warning: '#F59E0B',        // Pendentes
          error: '#EF4444',          // Erros
        },
        gov: {
          primary: '#1E40AF',
          secondary: '#2563EB',
          accent: '#3B82F6',
          light: '#DBEAFE',
          dark: '#1E3A8A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'gov': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'gov-md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      }
    },
  },
  plugins: [],
}

