---
title: " APIs"
draft: false
url: "/estudos/arquivos/API"
---

---

# O que é uma API?
Uma **API (Application Programming Interface)** é um conjunto de definições e protocolos responsáveis por fazer a **comunicação** entre dois **sistemas distintos**

Ela atua como um intermediário entre diferentes aplicações, possibilitando que uma solicite funcionalidades ou dados de outra.

Pense em uma API como um restaurante:
- O **cliente** é o usuário.
- Os **cozinheiros** são o servidor.
- O **garçom** é a API.
    - Anota o pedido.
    - Fala o que foi pedido para os cozinheiros.
    - Traz a comida ao cliente.

---

# Principais Conceitos
- **Endpoint**: URL específico que expõe um recurso ou funcionalidade.
- **Recurso**: Entidade representada na API, geralmente manipulada via endpoints.
- **Métodos HTTP**: Comandos usados para interagir com os recursos.
  - `GET`: Obter dados.
  - `POST`: Criar novos dados.
  - `PUT`: Atualiza todos dados de um registro.
  - `PATCH`: Atualiza alguns campos de um registro.
  - `DELETE`: Remover dados.
- **Status Codes**: Indicam o resultado da requisição (ex.: `200 OK`, `404 Not Found`, `500 Internal Server Error`).

---

# Estilos de API
## REST (Representational State Transfer)
- Baseado em **recursos** - organiza suas operações em torno de entidades (ex: /user/ID/123), e não em termos de ações/funções (ex: /getUser?id=123).
- Simples, escalável e stateless (cada requisição é independente).
- Popular em servidores **web** e com fácil implementação.
- Construído baseado em métodos HTTP.
- **RESTful** é o termo utilizado para APIs que implementam corretamente os princípios REST.

## GraphQL
- Utiliza **Query**.
- Permite que o cliente solicite dados específicos.
- Evita **overfetching** (buscar dados demais) e **underfetching** (dados de menos).
- Útil quando as respostas variam conforme a necessidade do cliente.
- Possui uma íngrime curva de aprendizado.
- Requere maior processamento do sistema.

## gRPC (Google Remote Procedure Call)
- Framework de comunicação de alta performance usando HTTP/2 e Protobuf.
- Muito utilizado em comunicação serviço-serviço (microserviços).
- Suporta streaming bidirecional.

## WebSockets
- Conexões bi-direcionais em **tempo real**, baseado em eventos.
- Ideal para aplicações que exigem troca de dados em **baixa latência**.

## SOAP (Simple Object Access Protocol)
- Baseado em **XML** (Linguagem de Marcação Extensível).
- Utilizado em serviços financeiros e gateways de pagamentos por sua **segurança**.

---

# Boas Práticas no Design de APIs
- **Documentação clara**: Use OpenAPI/Swagger.
- **Autenticação e autorização**: Ex.: OAuth2, JWT.
- **Idempotência**: Requisições repetidas não devem causar efeitos inesperados.
- **Tratamento de erros consistente**: Mensagens claras e códigos adequados.

---

# Melhor estilo de API para o projeto
## REST
Após análise de pontos cruciais e a arquitetura definida, foi percebido que o estilo REST se encaixa melhor nos interesses do projeto, visto que possui:
1. **Simplicidade e padronização**
    - Usa HTTP, que é familiar à equipe.
    - Operações básicas se resumem a **GET, POST, PUT, PATCH, DELETE**.
    - Fácil aprendizado.
2. **Baseado em recursos**
    - Torna a API mais intuitiva, até mesmo para usuários, devido aos endpoints que mostram o que está sendo manipulado.
3. **Permite o uso de JSON**
    - Uma das restrições arquiteturais é o uso de JSON para o banco de dados.
    - JSON é leve e popular para aplicações.
4. **Escolha da arquitetura cliente-servidor**
    - Cliente e servidor podem evoluir de forma independente.
    - Permite múltiplos clientes consumindo a mesma API.
5. **Stateless**
    - Não há necessidade de manter sessões de usuário no servidor.
    - Requisições independentes.

# Referências
* API Design Patterns - JJ Geewax
* REST API Design Rulebook - Mark Masse
* RESTful Web APIs - Leonard Richardson, Mike Amundsen, Sam Ruby
* [Documentação Swagger / OpenAPI](https://swagger.io/resources/open-api/)
* [REST vs GraphQL](https://www.apollographql.com/blog/graphql/rest-vs-graphql)
