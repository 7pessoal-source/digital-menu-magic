

# 🍽️ Cardápio Digital - Plano de Implementação

## Visão Geral
Um cardápio digital moderno e funcional para restaurante/lanchonete, com tema visual remetendo a comida artesanal (tons terrosos, marrom, bege e laranja). 100% frontend, usando localStorage para persistência.

---

## 🎨 Design & Estilo Visual
- **Paleta de cores**: Tons terrosos - marrom chocolate, bege cream, laranja âmbar, branco off-white
- **Tipografia**: Fontes elegantes e legíveis, com peso variado para hierarquia
- **Efeitos**: Sombras suaves, hover com scale, transições fluidas, bordas arredondadas
- **Fundo**: Gradiente sutil de bege para branco

---

## 📱 Página Principal (Cardápio Público)

### Cabeçalho
- Logo/Nome da loja centralizado com estilo atraente
- Indicador de **horário de funcionamento** (aberto/fechado) com badge colorido
- Fundo com gradiente terroso sutil

### Seção de Destaques
- Carrossel horizontal com produtos em destaque/promoção
- Cards maiores com visual diferenciado (badge "Em destaque" ou "Promoção")
- Animação suave de slide

### Barra de Categorias
- Barra horizontal rolável no topo da seção de produtos
- Botões estilizados com ícone + nome da categoria
- Categoria ativa com destaque visual (cor diferente, sublinhado)
- Scroll suave ao clicar

### Grade de Produtos
- Layout em **3 colunas** (desktop), 2 colunas (tablet), 1 coluna (mobile)
- **Cards de produto** contendo:
  - Imagem do produto (thumbnail otimizada)
  - Nome do produto
  - Preço formatado (R$ X,XX)
  - Botão "Adicionar" com ícone de +
- Efeito hover com elevação e sombra
- Animação ao adicionar ao carrinho

### Carrinho (Drawer Lateral)
- **Ícone flutuante** no canto inferior direito
- Badge com quantidade de itens
- Ao clicar, abre **drawer lateral** deslizando da direita
- Lista de produtos adicionados com:
  - Imagem pequena, nome, preço
  - Controles de quantidade (+/-)
  - Botão remover item
- **Subtotal** visível
- Campo de **observação** do pedido (texto livre)
- Botão **"Finalizar Pedido"** proeminente

### Finalização de Pedido
- Gera mensagem formatada com todos os itens
- Inclui: produto, quantidade, preço unitário, observação
- Abre link `wa.me/{numero}` com a mensagem pronta
- Limpa carrinho após envio

---

## 🔐 Painel Administrativo

### Acesso
- Link discreto **"Painel"** no rodapé (texto pequeno, quase invisível)
- Modal de senha ao clicar
- Senha fixa: **1245**
- Bloqueio se senha incorreta

### Dashboard Admin
- Menu lateral com navegação entre seções
- Design limpo e funcional

### Configurações da Loja
- Editar **nome da loja**
- Editar **número do WhatsApp** (com validação de formato)
- Configurar **horário de funcionamento** (hora abertura/fechamento)
- Preview em tempo real das alterações

### Gerenciamento de Categorias
- Lista de categorias existentes
- **Criar** nova categoria (nome)
- **Editar** nome da categoria
- **Remover** categoria (com confirmação)
- Arrastar para reordenar (opcional)

### Gerenciamento de Produtos
- Lista de todos os produtos
- **Criar** produto:
  - Nome
  - Preço
  - Categoria (seleção)
  - Upload de imagem
  - Marcar como "Destaque" (checkbox)
- **Editar** produto existente
- **Remover** produto (com confirmação)
- Filtro por categoria

### Upload de Imagem
- Input de arquivo para upload
- **Redimensionamento automático** (max 300x300px para thumbnails)
- **Compressão** para manter arquivo leve
- Conversão para **base64** para salvar no localStorage
- Preview da imagem antes de salvar

---

## 💾 Persistência de Dados (localStorage)

Estrutura de dados salva:
- **Configurações**: nome da loja, WhatsApp, horário funcionamento
- **Categorias**: lista com ID e nome
- **Produtos**: lista com nome, preço, categoria, imagem (base64), destaque

Dados carregados automaticamente ao abrir o site.

---

## 📱 Responsividade

- **Desktop**: Layout completo, 3 colunas de produtos
- **Tablet**: 2 colunas, menu adaptado
- **Mobile**: 1 coluna, drawer de carrinho fullscreen

---

## ✅ Compatibilidade

- Funciona 100% offline após carregamento
- Pronto para deploy no **Vercel**
- Sem dependências de backend, banco de dados ou APIs externas
- Código limpo e organizado em componentes

