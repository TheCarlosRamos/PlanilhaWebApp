# 🚀 Quick Start - Dashboard CPPI

## Instalação Rápida

### 1. Instalar dependências do frontend

```bash
cd frontend
npm install
cd ..
```

### 2. Reconstruir containers

```bash
make rebuild
# ou
make down && make up
```

### 3. Acessar aplicação

```bash
make open
# ou abrir manualmente: http://localhost:3000
```

## 📋 Funcionalidades Implementadas

### ✅ Dashboard Moderno
- **Sidebar navegável** com todas as abas da planilha
- **Design governamental** estilo Gov.br
- **Totalmente responsivo** (mobile-first)
- **Filtros e busca** em tempo real
- **Exportação para CSV** das abas filtradas

### ✅ Visualização de Dados
- **Tabela moderna** com Tailwind CSS
- **Linhas zebradas** para melhor leitura
- **Links clicáveis** com ícone de abertura externa
- **Expandir/colapsar** linhas longas (Ementa, Projetos)
- **Hover states** e transições suaves

### ✅ Upload de Planilhas
- **Interface moderna** com drag & drop visual
- **Validação de arquivos** (.xlsx, .xls)
- **Feedback visual** de sucesso/erro
- **Redirecionamento automático** após upload

### ✅ Organização por Abas
- **Todas as 12 abas** da planilha disponíveis
- **Contador de registros** por aba
- **Badge informativo** com total de itens
- **Ordenação inteligente** (anos primeiro, depois categorias)

## 🎨 Customização de Cores

Edite `frontend/tailwind.config.js`:

```javascript
colors: {
  gov: {
    primary: '#1E40AF',    // Azul CPPI/Gov.br
    secondary: '#2563EB',  // Azul secundário
    accent: '#3B82F6',     // Azul de destaque
    light: '#DBEAFE',      // Azul claro
    dark: '#1E3A8A',       // Azul escuro
  }
}
```

## 🔧 Comandos Úteis

```bash
# Ver logs em tempo real
make logs

# Ver logs apenas do frontend
make logs-frontend

# Ver logs apenas do backend
make logs-backend

# Reiniciar serviços
make restart

# Limpar tudo e começar do zero
make clean
make rebuild
```

## 📱 Responsividade

O dashboard é totalmente responsivo:
- **Desktop**: Sidebar fixa + área de conteúdo
- **Tablet**: Sidebar colapsável (hamburger menu)
- **Mobile**: Layout adaptado, tabela com scroll horizontal

## 🐛 Troubleshooting

### Frontend não inicia

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
cd ..
make rebuild
```

### Backend com erro 500

Verifique se `openpyxl` e `xlrd` estão instalados:
```bash
make logs-backend
```

### Dados não aparecem

1. Faça upload da planilha novamente
2. Limpe o cache do navegador (Ctrl+F5)
3. Verifique se o backend está rodando: `make logs-backend`

## 📊 Estrutura de Dados

Cada registro contém:
- `id`: ID único
- `row_number`: Número da linha
- `data`: Objeto JSON com todas as colunas da planilha
- `link`: Link extraído (se houver)
- `created_at`: Data de criação

Campo especial adicionado:
- `_aba_origem`: Nome da aba de origem da planilha

## 🚀 Próximos Passos

- [ ] Adicionar paginação na tabela
- [ ] Implementar filtros avançados por data
- [ ] Adicionar gráficos e estatísticas
- [ ] Implementar autenticação
- [ ] Adicionar histórico de uploads
- [ ] Implementar notificações

## 📝 Licença

Este projeto faz parte do Programa de Parcerias de Investimentos (PPI).

