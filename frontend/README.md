# CPPI Dashboard - Frontend

Dashboard moderno para visualização de dados de Resoluções e Decretos do CPPI.

## Tecnologias

- React 18
- Vite
- Tailwind CSS 3
- Lucide React (ícones)
- React Router
- Axios

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

## Build para produção

```bash
npm run build
```

## Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Cabeçalho com logo e navegação
│   │   ├── Sidebar.jsx         # Menu lateral com abas
│   │   ├── ModernDataTable.jsx # Tabela estilizada
│   │   └── DataTable.jsx       # Tabela antiga (legado)
│   ├── pages/
│   │   ├── Dashboard.jsx       # Página principal do dashboard
│   │   ├── ModernUploadPage.jsx # Upload moderno
│   │   ├── UploadPage.jsx      # Upload antigo (legado)
│   │   └── TablePage.jsx       # Tabela antiga (legado)
│   ├── App.jsx                 # Componente raiz com rotas
│   ├── main.jsx                # Entry point
│   ├── index.css               # Estilos Tailwind
│   └── api.js                  # Configuração Axios
├── index.html                  # HTML principal
├── package.json                # Dependências
├── vite.config.js             # Configuração Vite
├── tailwind.config.js         # Configuração Tailwind
└── postcss.config.js          # Configuração PostCSS
```

## Funcionalidades

- ✅ Dashboard com sidebar navegável
- ✅ Visualização de múltiplas abas da planilha
- ✅ Busca em tempo real
- ✅ Tabela responsiva com Tailwind CSS
- ✅ Exportação para CSV
- ✅ Upload de planilhas Excel
- ✅ Design governamental (estilo Gov.br)
- ✅ Totalmente responsivo

## Personalização

### Cores

Edite `tailwind.config.js` para alterar o esquema de cores:

```js
colors: {
  gov: {
    primary: '#1E40AF',    // Azul principal
    secondary: '#2563EB',  // Azul secundário
    accent: '#3B82F6',     // Azul de destaque
    light: '#DBEAFE',      // Azul claro
    dark: '#1E3A8A',       // Azul escuro
  }
}
```

## Integração com Backend

O frontend espera que o backend esteja rodando em `http://localhost:8000` (ou conforme configurado em `src/api.js`).

### Endpoints esperados:

- `GET /records` - Lista todos os registros
- `GET /records?q=termo` - Busca registros
- `POST /upload` - Upload de planilha

## Build no Docker

O Dockerfile já está configurado. Para reconstruir:

```bash
docker-compose build frontend
docker-compose up frontend
```

