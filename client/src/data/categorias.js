// Categorias fixas do FinZip. Usuários, transações e metas começam vazios
// e são criados pelo próprio usuário (tudo salvo no localStorage do navegador).

export const CATEGORIAS = [
  { id: 'alimentacao', nome: 'Alimentação', tipo: 'despesa' },
  { id: 'transporte', nome: 'Transporte', tipo: 'despesa' },
  { id: 'lazer', nome: 'Lazer', tipo: 'despesa' },
  { id: 'moradia', nome: 'Moradia', tipo: 'despesa' },
  { id: 'educacao', nome: 'Educação', tipo: 'despesa' },
  { id: 'saude', nome: 'Saúde', tipo: 'despesa' },
  { id: 'outros_despesa', nome: 'Outros', tipo: 'despesa' },
  { id: 'salario', nome: 'Estágio/Salário', tipo: 'receita' },
  { id: 'mesada', nome: 'Mesada', tipo: 'receita' },
  { id: 'freelance', nome: 'Freelance', tipo: 'receita' },
  { id: 'outros_receita', nome: 'Outros', tipo: 'receita' },
];
