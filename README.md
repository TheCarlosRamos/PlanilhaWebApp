# Dashboard CPPI - Acompanhamento de Resoluções e Decretos

Aplicação web moderna para visualização de dados de resoluções e decretos do CPPI (Programa de Parcerias de Investimentos). Upload de planilhas Excel com múltiplas abas, persistência em PostgreSQL e interface governamental profissional.

**Funcionalidades:**
- ✅ **Dashboard moderno** com design estilo Gov.br
- ✅ **Sidebar navegável** com todas as abas da planilha
- ✅ **Upload de planilhas** Excel (.xlsx, .xls)
- ✅ Processa **todas as abas** automaticamente
- ✅ Extração automática de links de publicação
- ✅ Busca e filtragem em tempo real
- ✅ Exportação para CSV das abas filtradas
- ✅ Interface responsiva (mobile, tablet, desktop)
- ✅ API REST com FastAPI

**Stack Tecnológica:**
- Frontend: React 18 + Vite + Tailwind CSS + Lucide Icons
- Backend: FastAPI + PostgreSQL
- Containerização: Docker + Docker Compose

## Como rodar

### Com Docker

Opção 1 - Usando Makefile (recomendado):
```bash
make help          # Ver todos os comandos disponíveis
make up            # Inicia todos os serviços (reconstroi se necessário)
make open          # Abre o frontend no navegador
make logs          # Ver logs em tempo real
make down          # Para todos os serviços
make rebuild       # Limpa tudo e reconstrói do zero
```

**Primeira vez:** Se houver mudanças no código, execute `make rebuild` para garantir que tudo está atualizado.

Opção 2 - Usando Docker Compose diretamente:
```bash
docker-compose up --build
```

### Acessos

- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/docs

## 📸 Preview

O dashboard apresenta:
- **Layout Governamental**: Design limpo e profissional estilo Gov.br
- **Navegação por Abas**: Sidebar com todas as abas da planilha
- **Tabela Moderna**: Estilizada com Tailwind CSS, linhas zebradas, hover states
- **Busca Poderosa**: Filtros em tempo real em todos os campos
- **Exportação**: Download CSV das abas filtradas
- **Responsivo**: Funciona perfeitamente em mobile, tablet e desktop

## 📚 Documentação Adicional

- [Quick Start Guide](./QUICKSTART.md) - Guia rápido de instalação e uso
- [Frontend README](./frontend/README.md) - Documentação do frontend

## 🛠️ Desenvolvimento

### Instalar dependências do frontend

```bash
cd frontend
npm install
```

### Reconstruir após mudanças

```bash
make rebuild
```

### Ver logs

```bash
make logs-frontend  # Logs do React
make logs-backend   # Logs do FastAPI
```
