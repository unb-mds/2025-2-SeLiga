---
title: "Bem-vindo ao SeLiga 👋"
draft: false
cover:
    image: imagens/profile.JPG
---

---

# Visão Geral

## 🔎 SeLiga: O Portal da Verdade
Sua ferramenta confiável na luta contra a desinformação.

### Contextualização do Problema
Vivemos imersos em um fluxo interminável de notícias. A velocidade com que a informação se espalha, especialmente nas redes sociais, torna quase impossível verificar cada fato. Como podemos confiar no que lemos? Como proteger a nós e à nossa comunidade da desinformação?

### Motivação
Na era da informação instantânea, diferenciar fato de ficção é um desafio constante. O SeLiga nasceu para ser seu aliado, automatizando a checagem de notícias e trazendo clareza para o que você lê.

### Objetivos do Projeto
O SeLiga ataca o problema da desinformação de frente, criando um ecossistema completo que não apenas agrega notícias, mas as processa com inteligência artificial para sinalizar potenciais Fake News, tudo de forma automatizada e transparente.

**Objetivo Geral:** Automatizar a checagem de notícias através de um sistema inteligente que minera, analisa e classifica reportagens de grandes veículos da imprensa brasileira.

**Objetivos Específicos:**
- Coletar artigos em tempo real de mais de 10 portais de notícias brasileiros.
- Processar e analisar o conteúdo utilizando inteligência artificial.
- Classificar notícias quanto à sua confiabilidade.
- Disponibilizar os resultados em uma plataforma web simples e intuitiva.

### Escopo Inicial

**Funcionalidades Principais:**

1. **Coleta Automatizada de Notícias**
   - Mineração de artigos de mais de 10 portais de notícias brasileiros em tempo real.
   - Utilização de spiders (Scrapy) para web scraping estruturado.

2. **Processamento e Análise de Dados**
   - Pipeline de limpeza e pré-processamento de texto.
   - Extração de metadados das notícias.
   - Normalização de conteúdo.

3. **Detecção de Desinformação**
   - Integração com Gemini IA para análise de conteúdo.
   - Classificação automática de notícias quanto à confiabilidade.
   - Geração de vereditos sobre potenciais Fake News.

4. **API e Interface de Usuário**
   - API RESTful (FastAPI) para servir dados.
   - Aplicação web (React) para consulta e visualização.
   - Sistema de busca e filtros inteligentes.
   - Apresentação de resultados com transparência sobre fontes e classificação.

**Infraestrutura:**
- Banco de dados MongoDB para armazenamento.
- Sistema de controle de versão (Git/GitHub).

**Público-alvo:**
- Usuários finais: pessoas buscando verificar a veracidade de notícias.
- Desenvolvedores: interessados em integrar dados via API.

---

# Solução 💡

## Descrição da Solução Desenvolvida
Nosso sistema inteligente minera, analisa e classifica reportagens de mais de 10 grandes veículos da imprensa brasileira, oferecendo um veredito sobre sua confiabilidade em uma plataforma web simples e intuitiva.

### ⚙️ Arquitetura Geral do Sistema
Nosso processo é dividido em quatro etapas fundamentais, garantindo um fluxo de dados robusto e resultados confiáveis:

1. **Mineração Contínua:** Nossos spiders (robôs de coleta) varrem incessantemente mais de 10 portais de notícias, coletando artigos em tempo real para manter nossa base de dados sempre atualizada.

2. **Pipeline de Dados:** Cada artigo passa por um rigoroso processo de limpeza e pré-processamento. Normalizamos o texto e extraímos metadados cruciais para a análise.

3. **Detecção com IA:** O coração do SeLiga. Utilizamos o poder dos modelos de linguagem da Gemini IA para analisar o conteúdo e a estrutura da notícia, classificando-a quanto ao seu potencial de desinformação.

4. **Apresentação Intuitiva:** Os resultados são servidos através de uma API e exibidos em nossa aplicação web, onde você pode pesquisar, filtrar e entender a classificação de cada notícia de forma clara.

## Principais Usuários e Necessidades

### Para Você, Usuário Final
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

| Camada | Tecnologia Principal | Justificativa |
| :--- | :---: | ---: |
| **Backend / API** | *Python (FastAPI, Uvicorn)* | Gerenciamento de rotas, conexão com o modelo de detecção e entrega de dados de forma eficiente e escalável. |
| **Banco de Dados** | *MongoDB*  | Armazenamento flexível de documentos não-estruturados, ideal para notícias com diferentes formatos.|
| **Machine Learning**| *Gemini IA* | Fornece acesso a modelos de NLP avançados para detecção de desinformação, utilizando o poder de modelos pré-treinados.|
| **Mineração de Dados**| *Scrapy* |	Framework Python robusto para desenvolver spiders que realizam coleta eficiente e estruturada de artigos de imprensa.| 
| **Frontend / Web** | *JavaScript (React)* | Interface de usuário moderna e responsiva para explorar e visualizar os resultados das notícias. |
| **Ferramentas** | *Git e GitHub* | Controle de versão e colaboração em equipe. |
| **Tecnologias de Teste** | *Pytest, Jest e flake8* | Testes para o backend e frontend. Verificação de falhas no sistema e erros de sintaxe. |

---

# Resultados e Entregas da Release Final

## 🆕 Release notes - SeLiga 
**Data do lançamento:** 2/12/2025

**Figma do projeto:** [v1.0.0](https://www.figma.com/board/CIMdLiO4lAXoEHfFq4qZsg/SeLiga?node-id=0-1&t=wvpNNgTH1pzg8D7N-1)

## 📔 O que fizemos até então?

### 📌 Desenvolvimento de páginas Web
Durante o período de desenvolvimento, as páginas projetadas foram: 

**1. Página de notícias:** apresenta todas as notícias coletadas durante o processo automatizado de web scraping, sendo essas classificadas em "Verificadas", "Duvidosas" e "Fake-news", que podem ser selecionadas por meio de botões de filtro. Há também uma barra de pesquisa onde é possível procurar notícias por palavras-chave.

**2. Página 'sobre':** introduz a equipe, com o nome dos membros e seus respectivos cargos, assim como metodologias utilizadas na elaboração do projeto. 

**3. Página de painel:** exibe informações estatísticas acerca das notícias coletadas, como porcentagem de notícias verdadeiras, duvidosas e falsas, que também são representadas visualmente por um gráfico.

### 📌 Coleta automatizada de notícias
Para fornecer as notícias apresentadas na página web, foi desenvolvido pela equipe um sistema de automatização de coleta de notícias para a futura verificação. Essas notícias são coletadas duas vezes ao dia, distribuidas por 5 portais diferentes.

### 📌 Verificação de veracidade
Juntamente com a coleta automatizada de notícias, foi implementada também a **verificação de veracidade**, que, utilizando uma inteligência artificial treinada, utiliza de uma série de fontes confiáveis para a validação das notícias vindas de portais suspeitos.

---

## Lições Aprendidas 🧠
* **O que funcionou bem:**
Todos do grupo mantiveram o compromisso de comparecer nas reuniões e, com uma boa administração, estabeleceram uma clara comunicação com a equipe sobre os trabalhos semanais. Dessa forma, o projeto se desenvolveu muito bem, conforme esperado. 

* **O que poderia ter sido melhor:**
Considerando a nossa falta de conhecimento inicial, o projeto foi bem desenvolvido durante o semestre letivo. 

* **Ajustes feitos ao longo do projeto:**
Muitas dúvidas que não estavam claras sobre nosso projeto foram sanadas durante o desenvolvimento. Como por exemplo: "Onde encontrar notícias falsas?" ou "Como verificar notícias falsas?", entre outros.

* **Impacto na experiência:**
O conhecimento adquirido nesse curso nos capacitou para desenvolvermos com mais qualidade próximos projetos futuros.

---

## Conclusão 👍
### Avaliação final do projeto
O desenvolvimento do nosso verificador de notícias falsas foi executado com excelência. Entregamos uma ferramenta funcional que cumpre seu papel social e tecnológico com robustez.

Contudo, a tecnologia de combate à desinformação nunca para. O que construímos é uma base sólida que permite expansão. Numa próxima fase, o foco seria a escalabilidade e a inteligência preditiva, elevando o projeto de uma ferramenta reativa para uma solução proativa de monitoramento de informações. Estamos orgulhosos do resultado e entusiasmados com o potencial futuro.

### Relevância da solução
Este projeto é extremamente útil no mundo atual, já que são muito comuns notícias que cotém caráter falso, mas que apresentam alguns elementos de caráter verdadeiro. Essas características são responsáveis por trazer desinformação para a população ingênua, implantando falsas verdades em sua vida.

### Próximos passos recomendados
Como próximos passos, seria importante aprimorar a escalabiliade do projeto, para que ele possa crescer de maneira saudável. Adicionalmente, seria interessante ampliar as fontes de coleta de notícias para que assim mais notícias possam ser verificadas. 

---

<p align="center">
<a href="https://github.com/unb-mds/2025-2-SeLiga" target="_blank">Ver no GitHub</a>
</p>

