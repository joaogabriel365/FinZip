# Diagramas UML — FinZip

> Visão inicial do sistema (CP4). Serão revisados e atualizados nos Checkpoints 5 e 6 conforme o desenvolvimento avança.

## Diagrama de Casos de Uso

```mermaid
flowchart LR
    Usuario(["🧑 Usuário (jovem)"])

    UC1(("Cadastrar-se"))
    UC2(("Fazer login"))
    UC3(("Registrar transação\n(receita/despesa)"))
    UC4(("Categorizar transação"))
    UC5(("Editar/excluir transação"))
    UC6(("Criar meta de economia"))
    UC7(("Acompanhar progresso\nda meta"))
    UC8(("Visualizar dashboard\nfinanceiro"))
    UC9(("Editar perfil"))

    Usuario --- UC1
    Usuario --- UC2
    Usuario --- UC3
    Usuario --- UC4
    Usuario --- UC5
    Usuario --- UC6
    Usuario --- UC7
    Usuario --- UC8
    Usuario --- UC9

    UC3 -.include.-> UC4
    UC6 -.include.-> UC7
```

## Diagrama de Classes

```mermaid
classDiagram
    class Usuario {
        +int id
        +string nome
        +string email
        +string senhaHash
        +date dataCriacao
        +cadastrar()
        +login()
        +atualizarPerfil()
    }

    class Transacao {
        +int id
        +int usuarioId
        +int categoriaId
        +decimal valor
        +string tipo
        +date data
        +string descricao
        +criar()
        +editar()
        +excluir()
    }

    class Categoria {
        +int id
        +string nome
        +string tipo
    }

    class Meta {
        +int id
        +int usuarioId
        +string titulo
        +decimal valorAlvo
        +decimal valorAtual
        +date prazo
        +criar()
        +atualizarProgresso()
    }

    Usuario "1" --> "*" Transacao : registra
    Usuario "1" --> "*" Meta : define
    Categoria "1" --> "*" Transacao : classifica
```

