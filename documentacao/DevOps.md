# Guia de Estudos sobre DevOps

## O que é DevOps?

- DevOps é um conjunto de práticas, princípios e ferramentas que integram a equipe de desenvolvimento e a equipe de operações em uma só.
- Nesse modelo, os engenheiros trabalham em diversos setores do projeto, como desenvolvimento, teste, deployment, operações e etc. 
- Os times de DevOps usam práticas para automatizar processos que antes consutmavam ser manuais e devagares.
- O objetivo é reduzir o ciclo de vida de desenvolvimento e entregar software de alta qualidade de forma contínua e confiável.


## Práticas Fundamentais
### Integração Contínua 
Prática onde os desenvolvedores mesclam seus códigos com frequência em um repositório central, com o objetivo de encontrar e lidar com bugs de maneira mais eficiente e rápida e reduzir o tempo de validação de updates.
### Entrega Contínua
Prática onde as mudanças são automaticamente constrúidas, testadas e preparadas para serem entregues. Quando bem implementada, os desenvolvedores sempre terão um update pronto para deploy que foi devidamente testado e validado.
### Infraestrutura como Código
A infraestrutura é provisionada e gerenciada através de código e técnicas de software (controle de versão e integração contínua).Permite que quem trabalhe no projeto consiga interagir com a infraestrutura de maneira pragmática e escalonada.
### Monitoramento e Logs
Utilizado para visualizar como a aplicação e sua performance impacta na experiencia do usuário, coletando informações, categorizando e analisando os dados.
### Cultura de Colaboração
Comunicação entre equipes de desenvolvimento, QA e operações.


## Ferramentas Populares

* **Controle de Versão:** Git, GitHub, GitLab, Bitbucket.
* **Integração/Entrega Contínua:** Jenkins, GitLab CI/CD, GitHub Actions, CircleCI.
* **Containerização:** Docker, Podman.
* **Orquestração:** Kubernetes, Docker Swarm.
* **Infraestrutura como Código:** Terraform, Ansible, Puppet, Chef.
* **Monitoramento:** Prometheus, Grafana, Nagios, Datadog.
* **Gerenciamento de Configuração:** Consul, etcd, Vault.

## Conceitos-Chave

* **Microserviços:** arquitetura que divide a aplicação em serviços independentes.
* **Containerização:** empacotar aplicações e suas dependências em um ambiente isolado.
* **Orquestração:** gerenciar automaticamente múltiplos containers (ex: Kubernetes).
* **Blue-Green Deployment:** duas versões do sistema (uma ativa, outra em standby) para migração suave.
* **Canary Releases:** liberar a nova versão para um grupo pequeno de usuários antes do lançamento completo.
* **Rollback:** reverter para uma versão anterior em caso de falhas.

## Boas Práticas

* Commits pequenos e frequentes.
* Automação de testes e builds.
* Ambientes consistentes (dev, staging, produção).
* Uso de métricas e logs para decisões baseadas em dados.
* Cultura de aprendizado contínuo e feedback rápido.

