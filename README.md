<div align="center">
  <img src="FrontEnd/public/logo512x512.png" alt="Logo SeLiga" width="120"/>
  <h1>🔎 SeLiga: O Portal da Verdade</h1>

  <p>
    <img src="https://img.shields.io/badge/Python-3.x-blue?style=for-the-badge&logo=python" alt="Python" />
    <img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi" alt="FastAPI" />
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
    <a href="https://www.figma.com/board/CIMdLiO4lAXoEHfFq4qZsg/SeLiga?node-id=0-1&t=cW6M6PqNMMI18hG7-1" target="_blank">
      <img src="https://img.shields.io/badge/Design%20Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" alt="Acessar Figma" />
    </a>
  </p>
  
  <p>
    <strong>Combate às Fake News com Inteligência Artificial e Verificação Automatizada.</strong>
  </p>
</div>

<br />

Na era da informação instantânea, diferenciar fato de ficção é um desafio constante. O **SeLiga**
nasceu com um propósito claro: ser a sua ferramenta confiável na luta contra a desinformação.
---

## ✨ Funcionalidades

### 👤 Para o Usuário
* **Exploração de Notícias:** Navegue por um vasto banco de dados de notícias coletadas em tempo real.
* **Detector de Veracidade:** Indicadores claros de confiança baseados em análise de IA.
* **Filtros Inteligentes:** Busque por título, status de verificação ou fonte.

### ⚙️ Bastidores (Técnico)
* **Web Scraping Robusto:** Spiders desenvolvidos com **Scrapy** para coleta contínua de múltiplos portais (Band, Jovem Pan, Metrópoles, etc.).
* **API RESTful:** Backend performático construído com **FastAPI**.
* **Inteligência Artificial:** Integração com **Gemini IA** para análise semântica e verificação de fatos.
* **Arquitetura Cliente-Servidor:** Separação clara de responsabilidades para facilitar a escalabilidade.

---

## 🛠️ Tecnologias Utilizadas

| Escopo | Tecnologia | Descrição |
| :--- | :--- | :--- |
| **Backend** | Python, FastAPI, Uvicorn | API REST, gerenciamento de rotas e regras de negócio. |
| **Frontend** | React, TailwindCSS, Bootstrap | Interface responsiva e interativa. |
| **Banco de Dados** | MongoDB (Atlas) | Armazenamento NoSQL escalável para documentos de notícias. |
| **Coleta de Dados** | Scrapy | Framework para extração de dados da web. |
| **IA / NLP** | Google Gemini API | Motor de inteligência para análise de veracidade. |
| **DevOps** | Docker, Docker Compose | Containerização e orquestração de ambiente. |

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
* [Docker](https://www.docker.com/) (Recomendado)
* Ou: [Node.js](https://nodejs.org/) (v18+) e [Python](https://www.python.org/) (v3.10+)

### 🔐 Configuração de Ambiente (.env)

Antes de executar, crie um arquivo `.env` dentro da pasta `BackEnd/` com as seguintes variáveis:

```env
MONGO_URI=sua_string_de_conexao_mongodb
GOOGLE_API_KEY=sua_chave_da_api_gemini
```

### Opção 1: Via Docker (Recomendado)

A maneira mais simples de subir todo o ambiente.

1.  Na raiz do projeto, execute:
    ```bash
    docker-compose up --build
    ```
2.  Acesse:
    * **Aplicação Web:** [http://localhost:3000](http://localhost:3000)
    * **Documentação da API (Swagger):** [http://localhost:8000/docs](http://localhost:8000/docs)

### Opção 2: Instalação Manual

#### 1. Backend
```bash
cd BackEnd
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate
pip install -r requirements.txt
```

#### 2. Frontend
```bash
cd FrontEnd
npm install react-icons concurrently 
```

#### 3. Executando Tudo
Temos um script facilitador no frontend que levanta ambos os serviços:
```bash
npm run start:all
```
_Isso iniciará o Backend na porta 8000 e o Frontend na porta 3000._

---

## 📂 Estrutura do Projeto

```
.
├── BackEnd/
│   ├── main.py          # Ponto de entrada da API
│   ├── scraper/         # Scripts de automação
│   ├── spiders/         # Robôs de coleta (Scrapy)
│   └── tests/           # Testes unitários e de integração
├── FrontEnd/
│   ├── src/             # Componentes React e páginas
│   ├── public/          # Assets estáticos
│   └── package.json     # Dependências e scripts
├── documentos/          # Documentação de arquitetura e estudos
└── docker-compose.yml   # Orquestração dos containers
```

---

## 👥 Autores (Squad 05)

<table align="center">
  <tr>
    <td align="center">
      <img src="FrontEnd/public/imagens_equipe/gustavo.jpg" width="110px;" alt="Foto do Gustavo"/><br>
      <br>
      <sub><b>Gustavo</b></sub><br>
      <img src="https://img.shields.io/badge/Scrum%20Master-FD7E14?style=flat-square" alt="Scrum Master" />
      <img src="https://img.shields.io/badge/Back--end-007BFF?style=flat-square" alt="Back-end" />
    </td>
    <td align="center">
      <img src="FrontEnd/public/imagens_equipe/arthur.jpg" width="110px;" alt="Foto do Arthur"/><br>
      <br>
      <sub><b>Arthur</b></sub><br>
      <img src="https://img.shields.io/badge/Product%20Owner-DC3545?style=flat-square" alt="PO" />
      <img src="https://img.shields.io/badge/DevOps-343A40?style=flat-square" alt="DevOps" />
    </td>
    <td align="center">
      <img src="FrontEnd/public/imagens_equipe/marcus.jpg" width="110px;" alt="Foto do Marcus"/><br>
      <br>
      <sub><b>Marcus</b></sub><br>
      <img src="https://img.shields.io/badge/Front--end-6F42C1?style=flat-square" alt="Front-end" />
      <img src="https://img.shields.io/badge/Banco%20de%20Dados-28A745?style=flat-square" alt="DB" />
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="FrontEnd/public/imagens_equipe/amanda.jpg" width="110px;" alt="Foto da Amanda"/><br>
      <br>
      <sub><b>Amanda</b></sub><br>
      <img src="https://img.shields.io/badge/Front--end-6F42C1?style=flat-square" alt="Front-end" />
      <img src="https://img.shields.io/badge/Banco%20de%20Dados-28A745?style=flat-square" alt="DB" />
    </td>
    <td align="center">
      <img src="FrontEnd/public/imagens_equipe/enzo.jpg" width="110px;" alt="Foto do Enzo"/><br>
      <br>
      <sub><b>Enzo</b></sub><br>
      <img src="https://img.shields.io/badge/Back--end-007BFF?style=flat-square" alt="Back-end" />
      <img src="https://img.shields.io/badge/Arquitetura-17A2B8?style=flat-square" alt="Arquitetura" />
    </td>
    <td align="center">
      <img src="FrontEnd/public/imagens_equipe/erick.jpg" width="110px;" alt="Foto do Erick"/><br>
      <br>
      <sub><b>Erick</b></sub><br>
      <img src="https://img.shields.io/badge/DevOps-343A40?style=flat-square" alt="DevOps" />
      <img src="https://img.shields.io/badge/Arquitetura-17A2B8?style=flat-square" alt="Arquitetura" />
    </td>
  </tr>
</table>


---

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE). Consulte o arquivo LICENSE para mais detalhes.

[GitPage do Projeto](https://unb-mds.github.io/2025-2-SeLiga)