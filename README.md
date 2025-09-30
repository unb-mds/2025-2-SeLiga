# 🔎 SeLiga: O Portal da Verdade

Na era da informação instantânea, diferenciar fato de ficção é um desafio constante. O **SeLiga** nasceu com um propósito claro: ser a sua ferramenta confiável na luta contra as **Fake News**.

Este projeto automatiza a verificação de notícias, minerando e analisando reportagens de mais de **10 grandes veículos de imprensa**. Oferecemos um sistema inteligente de detecção de desinformação, entregue através de uma **aplicação web intuitiva** onde você pode explorar, filtrar e, o mais importante, **descobrir a veracidade de uma notícia**.

Desenvolvido pela equipe do Squad 05 na disciplina de Métodos de Desenvolvimento de Software (MDS - 2025/2 - FCTE/UnB).

---
## ✨ Experiência do Usuário (UX) e Funcionalidades para Você

Desenvolvemos o SeLiga pensando em como tornar a complexa tarefa de verificação de fatos acessível a todos. A sua experiência é central:

### 1. Funcionalidades para o Usuário Final (A Aplicação Web)

* **Exploração e Filtragem de Notícias:** Pesquise e navegue por um vasto banco de dados de notícias mineradas de forma **simples e rápida**.
* **Verificação na Ponta dos Dedos:** Veja o resultado da **detecção automatizada de desinformação** para cada artigo. Chega de dúvidas!
* **Transparência e Confiança:** Acesso a informações claras sobre a origem e a classificação da notícia.

### 2. O Motor por Trás da Verdade (Funcionalidades Técnicas)

* **Mineração Multi-Fonte:** Coleta contínua e automatizada (*scraping*) de artigos de **múltiplas fontes de imprensa**, garantindo uma base de dados ampla.
* **Pipeline de Dados Robusto:** Um processo de pré-processamento (limpeza de texto, normalização, extração de metadados) que prepara os dados para a análise com **precisão**.
* **Detecção Automatizada:** Módulo central que aplica algoritmos avançados para identificar e classificar a **possível desinformação**.
* **API de Dados:** Uma interface poderosa para servir os dados minerados e os resultados da detecção, permitindo a integração com **outros serviços**.

---

## 💻 Desenvolvimento e Estrutura do Projeto

O SeLiga é um sistema dividido em camadas, garantindo uma facil manuntenção e escalabilidade:

### Tecnologias Utilizadas

| Camada | Tecnologia Principal | Propósito |
| :--- | :--- | :--- |
| **Backend / API** | Python (FastAPI, Uvicorn) | Gerenciamento de rotas, conexão com o modelo de detecção e entrega de dados. |
| **Data Base** | MongoDB  | Banco de dados utilizado.|
| **Machine Learning**| Gemini IA | Fornece acesso a modelos de NLP para a detecção, utilizando o poder de modelos pré-treinados.|
| **Mineração de Dados**| Scrapy|	Framework Python para desenvolver os Spiders que realizam a coleta eficiente e estruturada de artigos de imprensa (web scraping).| 
| **Frontend / Web** | JavaScript (Reac) | Interface de usuário (UX) para explorar e visualizar os resultados das notícias. |
| **Ferramentas** | Git, GitHub | Controle de versão e colaboração. |

### Estrutura de Diretórios
O projeto segue uma estrutura modular, tipicamente organizada em:

```

.
├── backend/   \# Lógica da API e do modelo de detecção
    ├── scraper/   
    ├── Spyder/        
├── frontend/           \# Código da aplicação web (interface do usuário)
├── docs/               \# Documentação técnica e relatórios
└── requirements.txt    \# Dependências necessárias para o ambiente Python

````
---

## ✒Documentação

[GitPage](https://unb-mds.github.io/2025-2-SeLiga)

[Figma](https://www.figma.com/board/CIMdLiO4lAXoEHfFq4qZsg/SeLiga?node-id=4006-8018&t=l5rG3v9vWM2C0yq2-1)

---

## ⚙️ Como Criar um Ambiente de Desenvolvimento

Siga estes passos para configurar e rodar o *backend* do projeto localmente.

### 1. Clonar o Repositório
```bash
git clone [https://github.com/unb-mds/2025-2-SeLiga.git](https://github.com/unb-mds/2025-2-SeLiga.git)
cd 2025-2-SeLiga
````

### 2\. Configurar o Ambiente Virtual

Utilize um ambiente virtual (venv) para isolar as dependências do projeto:

```bash
python -m venv venv
# Se 'python' não funcionar, tente 'python3'
```

### 3\. Ativar o Ambiente

```bash
source venv/bin/activate
# Para desativar a qualquer momento, digite: deactivate
```

### 4\. Instalar as Dependências

```bash
pip install -r requirements.txt
```
### 5. Configurar o Frontend (Node.js)

O Frontend (interface web) exige o Node.js 18.19.1 para funcionar. 
Use um gerenciador de versão (como o nvm é o mais recomendado) para garantir a versão correta, e depois instale as dependências JavaScript:
```bash
# 1. (Opcional, mas recomendado) Garanta a versão correta do Node:
nvm use 18.19.1

# 2. Navegue para a pasta do frontend
cd frontend

# 3. Instale as dependências JavaScript
npm install
```


### 6\. Rodar o Serviço Localmente

Inicie o servidor da API (Backend):

```bash
npm start 
#Acesse a URL abaixo no seu navegador para começar a usar o SeLiga:
http://localhost:3000/
```

O serviço estará rodando e pronto para ser acessado.

-----
## Licença MIT
[MIT](https://github.com/unb-mds/2025-2-SeLiga/tree/main?tab=readme-ov-file#MIT-1-ov-file)
```
