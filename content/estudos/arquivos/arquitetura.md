---
title: "Arquitetura de Software"
draft: false
url: "/estudos/arquivos/arquitetura"
---

---

# O que é Arquitetura de Software?

A **arquitetura de software** é a estrutura fundamental de um sistema de software.

Ela define **como os componentes são organizados** e **como eles interagem entre si**.

📌 **Analogia:**

Pense no software como uma **casa** e na arquitetura como a **planta da casa**.

- Os **cômodos** representam os módulos do sistema (ex.: login, cadastro, carrinho de compras).
- Os **canos e fios** representam a comunicação entre módulos (ex.: APIs, filas de mensagens).
- Os **materiais de construção** são as tecnologias usadas (linguagens, frameworks, banco de dados).

Uma boa arquitetura facilita a **manutenção, extensibilidade e compreensão** do software, permitindo que ele evolua de forma sustentável ao longo do tempo.

---

# Objetivos da Arquitetura

- ✅ Garantir a **organização** do sistema
- ✅ Facilitar a **manutenção e evolução**
- ✅ Melhorar a **performance e escalabilidade**
- ✅ Aumentar a **segurança e confiabilidade**
- ✅ Permitir que equipes diferentes trabalhem em partes distintas
- ✅ Garantir uma boa **comunicação entre os módulos**
- ✅ Apoiar a **tomada de decisões técnicas** a longo prazo

👉 Em resumo, a arquitetura mantém o software **fácil de manter, seguro, escalável e organizado**.

---

# Passos para Projetar uma Boa Arquitetura de Software

Agora indo para a prática, aqui estão os passos principais para projetar uma boa arquitetura:

### 1. Entender o problema e os requisitos

- Identifique **quem vai usar** e **como vai usar** o sistema.
- Levante os **requisitos funcionais** (o que o sistema deve fazer) e os **não funcionais** (performance, segurança, disponibilidade).
- Considere também como lidar com **possíveis falhas e bugs**.

### 2. Definir as restrições

- O sistema será **web, mobile ou desktop**?
- Precisa rodar em **nuvem ou localmente**?
- Existem **tecnologias obrigatórias** (linguagem, framework, banco de dados)?
- Há **limitações de custo, tempo ou equipe**?

### 3. Escolher o estilo arquitetural

Selecione o modelo mais adequado para o projeto:

- **Arquitetura em Camadas (Layers):** organiza o sistema em camadas com responsabilidades específicas.
- **Cliente-Servidor (Client-Server):** separa a aplicação entre solicitantes e fornecedores de serviços.
- **Microsserviços (Microservices):** divide a aplicação em serviços pequenos e independentes.
- **Event-Driven:** baseado em eventos e reações assíncronas.

Cada modelo tem vantagens e casos de uso específicos. A escolha deve estar alinhada aos requisitos.

### 4. Definir os componentes e responsabilidades

- Quebre o sistema em **módulos ou serviços**.
- Garanta que cada um tenha uma **única responsabilidade** (ex.: autenticação, pagamentos, relatórios).

### 5. Escolher tecnologias

- Linguagem de programação
- Frameworks
- Banco de dados

Sempre baseie nas necessidades reais do projeto, não apenas na tecnologia da moda.

### 6. Tratar segurança

- Autenticação e autorização (Auth/AuthZ)
- Criptografia de dados sensíveis
- Logs, auditoria e backups

### 7. Planejar escalabilidade e desempenho

- O sistema consegue suportar o crescimento de usuários?
- Banco de dados e cache são suficientes?
- Será necessário **balanceamento de carga**?
- Como o sistema se recupera de falhas?

### 8. Documentar a arquitetura

- Diagramas (ex.: C4 Model, UML, fluxos de dados)
- Registros de decisão (ADR – *Architecture Decision Records*)
- Justificativas para as escolhas feitas

### 9. Validar e revisar

- Feedback de **usuários, devs e stakeholders**
- Testes contínuos (automação, integração, performance)
- Revisões periódicas conforme o sistema evolui

---

# Exemplo Simples

Um **e-commerce** pode ser estruturado assim:

- **Camada de Apresentação:** site ou app que o cliente usa.
- **Camada de Negócio:** regras como cálculo de frete, promoções e carrinho.
- **Camada de Dados:** banco de dados que armazena produtos, usuários e pedidos.
- **Integrações:** serviços externos como APIs de pagamento e logística.

---

✍️ **Resumo:**

Projetar uma boa arquitetura de software significa **entender bem o problema, escolher o estilo adequado, dividir responsabilidades, planejar comunicação, segurança e escalabilidade, documentar e validar**.

Isso garante que o sistema seja **organizado, seguro e preparado para crescer**.

---

# Melhor Tipo de Arquitetura para o Projeto

## Após estudos, foi considerado que a arquitetura **Cliente-Servidor** se encaixa melhor no projeto pelos seguintes motivos:

- **Simplicidade:** Estrutura direta, com cliente solicitando e servidor respondendo.
- **Centralização:** O servidor concentra a mineração, organização e disponibilização dos dados.
- **Facilidade de manutenção:** Menos complexidade em comparação a outras arquiteturas.
- **Escalabilidade adequada:** Possibilidade de replicar o servidor caso a demanda aumente.
- **Clareza no fluxo:**
    - Cliente → faz requisição.
    - Servidor → processa, busca e retorna a informação.
    - Cliente → apresenta os dados ao usuário final.

---

# Referências

- [Introdução à Arquitetura de Software - UFPR](https://www.inf.ufpr.br/andrey/ci163/IntroduzArquiteturaAl.pdf)
- [Material de Aula - MDS Lappis](https://mds.lappis.rocks/static_files/presentations/MDS-AULA-01.pdf)
- [DevMedia - Arquitetura de Software](https://www.devmedia.com.br/arquitetura-de-software-desenvolvimento-orientado-para-arquitetura/8033)
- [Client-Server by  controle.net](https://www.controle.net/faq/cliente-servidor-uma-estrutura-para-a-computacao-centralizada)
