# Documentação Inicial — FinZip

> Checkpoint 4 — Idealização. Este documento é vivo: será atualizado (não reescrito) nos Checkpoints 5 e 6.

## 1. Descrição do problema

Jovens entre 18 e 25 anos — estudantes, estagiários ou em seus primeiros empregos — costumam ter dificuldade em controlar o próprio dinheiro. Mesadas, bolsas, salários de estágio e trabalhos freelance entram e saem da conta sem que fique claro para onde foi cada real gasto.

A maioria dos aplicativos financeiros disponíveis hoje (bancos digitais, planilhas complexas, softwares de gestão financeira pessoal) foi pensada para um público mais velho, com mais produtos financeiros (investimentos, financiamentos, cartões múltiplos) e uma linguagem carregada de jargão técnico. Isso afasta quem está começando a lidar com dinheiro agora e só precisa de algo simples: saber quanto entra, quanto sai, e conseguir guardar um pouco.

O **FinZip** existe para preencher essa lacuna: um app para organizar o dinheiro do dia a dia de forma rápida e visual, sem exigir conhecimento financeiro prévio.

## 2. Persona / Público-alvo

**Nome:** Marina Alves
**Idade:** 21 anos
**Ocupação:** estudante universitária, estagiária em período parcial
**Renda:** mesada dos pais + bolsa de estágio, valor que varia mês a mês
**Contexto:** usa o celular para praticamente tudo, já tentou controlar gastos em planilha do Excel duas vezes e desistiu nas duas por achar trabalhoso. Não sabe, no fim do mês, quanto gastou com o quê. Gostaria de guardar dinheiro para uma viagem, mas nunca sobra o suficiente.

**Frustrações:**
- Apps de banco mostram extrato, mas não ajudam a entender *para onde* o dinheiro vai.
- Planilhas exigem digitação manual constante e ninguém mantém o hábito.
- Termos como "reserva de emergência", "CDI", "liquidez" soam distantes e intimidadores.

**O que ela precisa:**
- Lançar gastos e ganhos rapidamente, sem fricção.
- Ver de forma visual (não em números soltos) para onde o dinheiro está indo.
- Definir metas pequenas e alcançáveis ("juntar R$ 300 pra viagem até dezembro") e acompanhar o progresso.

## 3. Requisitos Funcionais (RF)

| Código | Descrição |
|---|---|
| RF01 | O sistema deve permitir que o usuário crie uma conta (cadastro) informando nome, e-mail e senha. |
| RF02 | O sistema deve permitir que o usuário faça login com e-mail e senha. |
| RF03 | O sistema deve permitir o registro de transações financeiras (receitas e despesas), com valor, categoria, data e descrição. |
| RF04 | O sistema deve permitir a categorização das transações (ex.: alimentação, transporte, lazer, moradia, educação). |
| RF05 | O sistema deve permitir a edição e a exclusão de transações já registradas. |
| RF06 | O sistema deve permitir a criação de metas de economia, com título, valor-alvo e prazo. |
| RF07 | O sistema deve exibir o progresso de cada meta de economia em relação ao valor-alvo. |
| RF08 | O sistema deve exibir um resumo financeiro (dashboard) com saldo atual, total de receitas, total de despesas e distribuição de gastos por categoria. |
| RF09 | O sistema deve permitir que o usuário edite os dados do próprio perfil. |

## 4. Requisitos Não Funcionais (RNF)

| Código | Descrição |
|---|---|
| RNF01 | **Usabilidade:** a interface deve ser simples e intuitiva, sem exigir conhecimento financeiro prévio para ser utilizada. |
| RNF02 | **Segurança:** a senha do usuário deve ser armazenada de forma criptografada, nunca em texto puro. |
| RNF03 | **Desempenho:** as telas principais (login, dashboard) devem carregar em até 2 segundos em condições normais de rede. |
| RNF04 | **Compatibilidade:** a aplicação deve ser responsiva, acessível tanto em navegador desktop quanto mobile. |
| RNF05 | **Disponibilidade:** a aplicação deve estar hospedada em um serviço com disponibilidade compatível com uso educacional (ex.: Vercel, Render). |
| RNF06 | **Arquitetura tecnológica:** front-end em React, back-end em Node.js/Express, banco de dados PostgreSQL. |

## 5. Escopo do projeto

### Entra nesta primeira versão (CP4 → CP6)
- Cadastro e login de usuário
- Registro, edição e exclusão de transações (receitas e despesas)
- Categorização de transações
- Criação e acompanhamento de metas de economia
- Dashboard com resumo financeiro simples

### Fica de fora desta versão
- Integração bancária automática (Open Finance / conexão direta com bancos)
- Múltiplas contas bancárias vinculadas
- Notificações push
- Gamificação avançada (conquistas, ranking entre usuários)
- Aplicativo mobile nativo (o projeto será web, responsivo)
