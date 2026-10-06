# client/

Aplicação front-end do FinZip, em **React** (Vite) — protótipo funcional do CP5, com dados mockados (sem banco de dados real).

## Como rodar

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## Login de demonstração

- E-mail: `demo@finzip.com`
- Senha: `123456`

Ou clique em "Cadastre-se" pra criar uma conta nova.

## O que já funciona

- Cadastro e login (mockado, validado contra dados salvos no `localStorage`)
- Dashboard com saldo, receitas, despesas e gastos por categoria
- Registrar, editar e excluir transações (receitas e despesas)
- Criar metas de economia e acompanhar o progresso
- Editar dados do perfil

## O que ainda é mockado

Não há back-end nem banco de dados real nesta etapa — tudo é salvo no `localStorage` do navegador. A API em Node.js/Express e o banco PostgreSQL (pasta `server/` e `database/`) serão implementados no CP6.

## Deploy

Publicado gratuitamente no [Vercel](https://vercel.com), conectado direto ao repositório do GitHub.
