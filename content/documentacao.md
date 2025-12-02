---
title: "Documentação"
draft: false
---

---

## 📜 Requisitos De Software

Esta seção define os requisitos funcionais e não funcionais que norteiam nosso projeto, garantindo que a entrega final atenda a todos os objetivos e critérios de qualidade.

<div align="center">
  <img src="/2025-2-SeLiga/imagens/documentacao/requisitos_funcionais.png">
</div>
<div align="center">
  <img src="/2025-2-SeLiga/imagens/documentacao/requisitos_naofuncionais.png">
</div>

---

## 🏗️ Arquitetura de Software

A arquitetura define a estrutura de alto nível do sistema e como seus principais componentes (frontend, backend, banco de dados, APIs) se organizam e se comunicam. Para este projeto, foi adotado o modelo cliente-servidor (client-server), que separa claramente as responsabilidades da interface de usuário (cliente) da lógica de negócio e armazenamento de dados (servidor). Esta estrutura é crucial para garantir o desempenho, a escalabilidade e a manutenibilidade da aplicação.

* **Diagrama de contexto do sistema:**
<div align="center">
  <img src="/2025-2-SeLiga/imagens/documentacao/diagrama_de_contexto.png">
</div>

* **Diagrama de containers:**
<div align="center">
  <img src="/2025-2-SeLiga/imagens/documentacao/diagrama_de_containers.png">
</div>

* **Diagrama de componentes:**
<div align="center">
  <img src="/2025-2-SeLiga/imagens/documentacao/diagrama_de_componentes.png">
</div>

---

# Planejamento e Gestão do Projeto
## Story Map

<div align="center">
  <img src="/2025-2-SeLiga/imagens/documentacao/storymap/1.png">
</div>
<div align="center">
  <img src="/2025-2-SeLiga/imagens/documentacao/storymap/2.png">
</div>
<div align="center">
  <img src="/2025-2-SeLiga/imagens/documentacao/storymap/3.png">
</div>
<div align="center">
  <img src="/2025-2-SeLiga/imagens/documentacao/storymap/4.png">
</div>
<div align="center">
  <img src="/2025-2-SeLiga/imagens/documentacao/storymap/5.png">
</div>


---

## 📁 Estrutura do Projeto
O projeto segue uma estrutura modular para facilitar o desenvolvimento e a manutenção.

```
seliga-project/
├── 📄 .gitignore
├── 📄 README.md
├── 📄 requirements.txt
├── 📂 docs/               # Documentação técnica e relatórios
├── 🚀 backend/            # Lógica da API e do modelo de detecção
│   ├── 🧠 verificador.py
│   ├── 🧠 verifica_duplicatas.py
│   └── 🐍 main.py
├── 💻 frontend/           # Código da aplicação web (React)
│   ├── 📁 public/
│   └── 📁 src/
├── 🕷️ spiders/         # Módulo de mineração de dados com Scrapy
│   ├── 📁 itens.py
│   ├── 📁 spiders/
│       ├── 🕸️ band.py
│       ├── 🕸️ metropoles.py
│       ├── 🕸️ jovempan.py
│       ├── 🕸️ yahoo.py
│       ├── 🕸️ leodias.py
│   ├── middlewares.py
│   ├── pipelines.py
|   └── ⚙️ settings.py🕸️

```
