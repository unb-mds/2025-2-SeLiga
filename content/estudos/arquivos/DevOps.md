# Guia de Estudos sobre DevOps

---

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


## Pipelines de DevOps  

Um **pipeline de DevOps** é uma sequência de etapas automatizadas que suporta a construção, o teste e a implantação de novas versões de software.  
Ele é a base da **Integração Contínua e Entrega Contínua (CI/CD)**, garantindo entregas rápidas, seguras e com mínima intervenção manual.  

### Etapas principais  
- **Gerenciamento de Código-Fonte:** mudanças enviadas para um repositório (ex.: Git) disparam o pipeline.  
- **Construção (Build):** o código é compilado, dependências resolvidas e artefatos gerados.  
- **Testes:** execução de testes automatizados (unidade, integração, funcionais e segurança).  
- **Implantação (Deploy):** código aprovado segue para ambientes de homologação ou produção (manual ou automático).  
- **Monitoramento e Feedback:** métricas e logs são coletados após o deploy para identificar falhas e melhorar as próximas entregas.

## DevOps e Transformação Digital  

A **transformação digital** é a transição das empresas para processos e estratégias que utilizam tecnologias digitais para melhorar negócios, operações e experiência do cliente.  

- O **DevOps** é um elemento-chave nesse processo, permitindo que equipes de desenvolvimento e operações integrem novas tecnologias de forma rápida, confiável e sustentável.  
- Ajuda a criar sistemas **úteis, escaláveis e fáceis de manter**, que evoluem conforme as mudanças nos requisitos de negócios.  
- Enquanto a TI tradicional se apoia em tecnologias legadas, o DevOps promove **agilidade, inovação e adaptação**, tornando-se sinônimo de transformação digital.

## DevOps e Gerenciamento de Custos de Nuvem  

O **DevOps** impacta significativamente os custos da nuvem ao introduzir **eficiência, automação e melhor gestão de recursos**.  

- **Provisionamento automático:** recursos são criados ou removidos conforme a demanda, evitando desperdício.  
- **Monitoramento contínuo:** identifica recursos ociosos ou subutilizados.  
- **Infraestrutura como Código (IaC):** padroniza ambientes e reduz provisionamento excessivo.  
- **Pipelines CI/CD:** minimizam retrabalho e falhas em produção, evitando custos desnecessários.  

Essas práticas permitem **uso mais eficiente da nuvem e economia de custos**, sem comprometer desempenho ou confiabilidade.  

## Referências 
https://octopus.com/devops/devops-approach/?utm_source=chatgpt.com
