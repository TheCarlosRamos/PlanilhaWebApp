# 🎨 Guia de Estilos - Dashboard CPPI

## Paleta de Cores Oficial

### Cores PPI (Programa de Parcerias de Investimentos)

```css
--ppi-blue: #1E40AF           /* Azul principal */
--ppi-blue-light: #EFF6FF     /* Fundo claro */
--ppi-gray: #F9FAFB           /* Fundo tabela */
--ppi-dark: #1F2937           /* Texto escuro */
--ppi-accent: #2563EB         /* Hover, links */
--ppi-success: #10B981        /* Status positivo */
--ppi-warning: #F59E0B        /* Pendentes */
--ppi-error: #EF4444          /* Erros */
```

### Uso no Tailwind

```jsx
// Background
className="bg-ppi-blue"
className="bg-ppi-blue-light"
className="bg-ppi-gray"

// Texto
className="text-ppi-blue"
className="text-ppi-dark"
className="text-ppi-accent"

// Bordas
className="border-ppi-blue"
```

## Componentes Governamentais

### Botões

```jsx
// Primário (ação principal)
<button className="gov-button-primary">
  Enviar
</button>

// Secundário (ações alternativas)
<button className="gov-button-secondary">
  Cancelar
</button>

// Ghost (ações discretas)
<button className="gov-button-ghost">
  Editar
</button>
```

### Cards

```jsx
<div className="gov-card">
  <h3>Título</h3>
  <p>Conteúdo...</p>
</div>
```

### Inputs

```jsx
<input 
  type="text" 
  className="gov-input"
  placeholder="Digite..."
/>
```

### Badges

```jsx
// Primário
<span className="gov-badge-primary">
  42 itens
</span>

// Sucesso
<span className="gov-badge-success">
  Concluído
</span>

// Aviso
<span className="gov-badge-warning">
  Pendente
</span>
```

### Links

```jsx
<a href="#" className="gov-link">
  Ver mais detalhes
</a>
```

## Tabelas

### Tabela Básica

```jsx
<div className="gov-card overflow-hidden">
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
            Coluna
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        <tr className="gov-table-row">
          <td className="px-4 py-3">Valor</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

### Linhas Zebradas

```jsx
// Alternar entre branco e fundo claro automaticamente
<tr className="gov-table-row">
  {/* primeira linha - branco */}
</tr>
<tr className="gov-table-row bg-ppi-gray">
  {/* segunda linha - fundo claro */}
</tr>
```

## Sombras

```css
shadow-gov      /* Sombra leve para cards */
shadow-gov-md   /* Sombra média */
```

## Acessibilidade

### Foco Visível

Todos os elementos interativos têm foco visível automaticamente:

```jsx
className="focus-visible:ring-2 focus-visible:ring-ppi-accent"
```

### Contraste

- Texto escuro sobre fundo claro: `text-ppi-dark`
- Texto claro sobre fundo escuro: `text-white`
- Links: `text-ppi-blue hover:text-ppi-dark`

## Responsividade

### Breakpoints

```jsx
// Mobile
className="block"

// Tablet+
className="md:block"

// Desktop
className="lg:block"
```

## Animações e Transições

```jsx
// Transição suave de cores
className="transition-colors duration-200"

// Transição completa
className="transition-all duration-200"

// Hover
className="hover:bg-ppi-blue-light"
className="hover:text-ppi-dark"
```

## Exemplos Práticos

### Header Governamental

```jsx
<header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
  <div className="flex items-center justify-between px-6 py-4">
    <div className="flex items-center space-x-4">
      <div className="bg-ppi-blue text-white font-bold text-xl px-4 py-2 rounded shadow-sm">
        CPPI
      </div>
    </div>
  </div>
</header>
```

### Sidebar Navegável

```jsx
<aside className="bg-white border-r border-gray-200">
  <nav>
    <button className={`
      w-full text-left px-4 py-3 rounded-lg
      ${active ? 'bg-ppi-blue text-white' : 'text-ppi-dark hover:bg-ppi-blue-light'}
      transition-colors
    `}>
      Item
    </button>
  </nav>
</aside>
```

### Card de Dados

```jsx
<div className="gov-card">
  <h3 className="text-lg font-bold text-ppi-dark mb-2">
    Título
  </h3>
  <p className="text-gray-600">
    Conteúdo...
  </p>
  <div className="mt-4">
    <span className="gov-badge-primary">
      42 itens
    </span>
  </div>
</div>
```

## Checklist de Design

- ✅ Usar cores PPI oficiais
- ✅ Aplicar classes governamentais
- ✅ Garantir contraste adequado
- ✅ Adicionar foco visível
- ✅ Implementar hover states
- ✅ Usar sombras suaves
- ✅ Manter consistência visual
- ✅ Testar responsividade

## Recursos

- [Design System Gov.br](https://designsystem.gov.br/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/icons/)

