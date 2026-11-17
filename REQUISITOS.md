# Documento de Requisitos — Achados & Perdidos Escolar (PWA)

## 1. Visão Geral
Aplicação web progressiva (PWA) responsiva e instalável destinada a facilitar o registro, a busca e a devolução de objetos perdidos ou encontrados nas dependências do colégio.

## 2. Público-Alvo
- Alunos, professores e funcionários da secretaria/coordenação escolar.

## 3. Requisitos Funcionais (RF)
- **RF01 — Cadastrar Item:** O usuário deve poder registrar um objeto (nome do item, categoria, local onde foi encontrado/perdido, data, descrição e contato/turma do responsável).
- **RF02 — Listar Itens:** O sistema deve exibir todos os itens cadastrados em formato de cartões organizados do mais recente para o mais antigo.
- **RF03 — Filtrar e Buscar:** O usuário deve poder buscar itens por palavra-chave (título/descrição) e filtrar por status ("Todos", "Pendente", "Devolvido").
- **RF04 — Alterar Status:** O usuário deve poder marcar um item pendente como "Devolvido" (ou reabrir caso marcado por engano).
- **RF05 — Excluir Registro:** O usuário deve poder remover um cadastro incorreto.

## 4. Requisitos Não Funcionais (RNF)
- **RNF01 — Persistência Local:** Os dados devem ser armazenados no navegador utilizando `localStorage`, dispensando servidor externo.
- **RNF02 — Responsividade:** A interface deve adaptar-se perfeitamente a smartphones, tablets e computadores (Mobile-First).
- **RNF03 — PWA (Instalável e Offline):** A aplicação deve conter `manifest.json` e `Service Worker` para permitir instalação na tela inicial e funcionamento offline.
- **RNF04 — Usabilidade:** Interface limpa, com contraste adequado e feedback visual imediato nas ações.

## 5. Regras de Negócio (RN)
- **RN01:** Todo item recém-cadastrado inicia automaticamente com o status `"Pendente"`.
- **RN02:** Campos obrigatórios no cadastro: Nome do Item, Local e Data.