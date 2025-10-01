---
title: "Bem-vindo ao SeLiga 👋"
draft: false
cover:
    image: imagens/profile.JPG
---
---
# Objetivo do projeto

## 🔎 SeLiga: O Portal da Verdade
Sua ferramenta confiável na luta contra a desinformação.

Na era da informação instantânea, diferenciar fato de ficção é um desafio constante. O SeLiga nasceu para ser seu aliado, automatizando a checagem de notícias e trazendo clareza para o que você lê.

Nosso sistema inteligente minera, analisa e classifica reportagens de mais de 10 grandes veículos da imprensa brasileira, oferecendo um veredito sobre sua confiabilidade em uma plataforma web simples e intuitiva.

<p align="center">
<a href="#-como-funciona">Como Funciona</a> •
<a href="#-principais-funcionalidades">Funcionalidades</a> •
<a href="#-tecnologias-utilizadas">Tecnologias</a> •
<a href="https://github.com/unb-mds/2025-2-SeLiga" target="_blank">Ver no GitHub</a>
</p>

---

### 🎯 O Problema: Uma Avalanche de Informação
Vivemos imersos em um fluxo interminável de notícias. A velocidade com que a informação se espalha, especialmente nas redes sociais, torna quase impossível verificar cada fato. Como podemos confiar no que lemos? Como proteger a nós e à nossa comunidade da desinformação?

### ✨ A Solução: Apresentando o SeLiga
O SeLiga ataca esse problema de frente. Nós criamos um ecossistema completo que não apenas agrega notícias, mas as processa com inteligência artificial para sinalizar potenciais Fake News, tudo de forma automatizada e transparente.

---

## ⚙️ Como Funciona
Nosso processo é dividido em quatro etapas fundamentais, garantindo um fluxo de dados robusto e resultados confiáveis.

<div align="center">

### Etapa Descrição
1. Mineração Contínua	Nossos spiders (robôs de coleta) varrem incessantemente mais de 10 portais de notícias, coletando artigos em tempo real para manter nossa base de dados sempre atualizada.
2. Pipeline de Dados	Cada artigo passa por um rigoroso processo de limpeza e pré-processamento. Normalizamos o texto e extraímos metadados cruciais para a análise.
3. Detecção com IA	O coração do SeLiga. Utilizamos o poder dos modelos de linguagem da Gemini IA para analisar o conteúdo e a estrutura da notícia, classificando-a quanto ao seu potencial de desinformação.
4. Apresentação Intuitiva	Os resultados são servidos através de uma API e exibidos em nossa aplicação web, onde você pode pesquisar, filtrar e entender a classificação de cada notícia de forma clara.

</div>

---

## 🚀 Principais Funcionalidades
Pensamos em cada detalhe para criar uma experiência poderosa tanto para o usuário final quanto para desenvolvedores.

### Para Você, Usuário
🔎 **Exploração Simplificada:** Navegue e pesquise em um vasto banco de dados de notícias com filtros inteligentes.

✅ **Verificação na Ponta dos Dedos:** Veja o resultado da análise de IA para cada artigo. Chega de incertezas!

🤝 **Transparência Total:** Acesse informações claras sobre a fonte da notícia e os motivos da sua classificação.

### Para Desenvolvedores
🕷️ **Mineração Multi-Fonte:** Um sistema de scraping robusto e escalável que garante uma base de dados ampla e diversa.

🤖 **Detecção Automatizada:** Um módulo de Machine Learning que aplica algoritmos avançados para identificar e classificar desinformação.

🔌 **API de Dados Poderosa:** Uma interface RESTful para servir os dados minerados e os resultados da detecção, pronta para ser integrada a outros serviços.

---

## 💻 Tecnologias Utilizadas
O SeLiga é construído com tecnologias modernas, escolhidas para garantir performance, escalabilidade e manutenibilidade.

| Camada | Tecnologia Principal | Propósito |
| :--- | :---: | ---: |
| **Backend / API** | *Python (FastAPI, Uvicorn)* | Gerenciamento de rotas, conexão com o modelo de detecção e entrega de dados. |
| **Data Base** | *MongoDB*  | Banco de dados utilizado.|
| **Machine Learning**| *Gemini IA* | Fornece acesso a modelos de NLP para a detecção, utilizando o poder de modelos pré-treinados.|
| **Mineração de Dados**| *Scrapy* |	Framework Python para desenvolver os Spiders que realizam a coleta eficiente e estruturada de artigos de imprensa (web scraping).| 
| **Frontend / Web** | *JavaScript (Reac)* | Interface de usuário (UX) para explorar e visualizar os resultados das notícias. |
| **Ferramentas** | *Git, GitHub* | Controle de versão e colaboração. |

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
│   ├── 🐍 main.py
│   ├── 🕷️ scraper/         # Módulo de mineração de dados com Scrapy
│   └── 🧠 model/          # Módulo de integração com a IA
└── 💻 frontend/           # Código da aplicação web (React)
    ├── 📁 public/
    └── 📁 src/

```

---

💡 **Dica:** Explore os ícones e links no topo da página para acessar rapidamente nossa GitHub ou página do curso.
