---
title: "Desenvolvimento do projeto"
draft: false
---

---

## Desenvolvimento e Implementação

## Arquitetura da Solução

A arquitetura geral do sistema foi modelada em C4, já apresentada anteriormente.
Nesta seção, são descritas apenas as camadas implementadas e as decisões arquiteturais, considerando um ponto essencial:

O backend não se comunica diretamente com a IA.
A classificação é feita por um serviço separado em python que usa a API do Gemini, que acessa o banco de dados.

Camadas Implementadas

### Camada de Apresentação (Frontend)

1. Interface Web acessada pelo usuário.
2. Realiza requisições ao backend via HTTPS.
3. Exibe apenas notícias já classificadas.

### Camada de Aplicação (Backend / API)

1. Exposição de endpoints REST.
2. Realiza somente operações no MongoDB.
3. Não chama a IA e não realiza classificação.
4. Apenas retorna ao frontend os dados já presentes no banco.


### Serviço de Classificação(Gemini API)

1. Ler notícias pendentes no MongoDB
2. Enviar todos os dados da notícia para a API Gemini
3. Receber a classificação da IA
4. Atualizar o documento no banco

### Bando de dados (MongoDB)

Armazena:

1. Notícias brutas coletadas pelo Scrapy
2. Classificações retornadas pela IA
3. Status de pendências
4. Metadados do processo de validação

### Coletor Externo(Scrapy)
1. Extrai notícias de fontes externas.
2. Insere diretamente no MongoDB.
3. Não acessa o backend.


## Implementação das Funcionalidades
### Funcionalidades Entregues

1. Coleta automática de notícias usando Scrapy.
2. Armazenamento inicial no MongoDB como não classificadas.
3. Serviço independente de classificação usando GEMINI API.
4. Persistência das classificações no banco.
5. Backend que consulta o MongoDB e serve dados ao frontend.
6. Interface listando somente notícias finalizadas pela IA.


### Demonstrações (prints)

* Páginas do frontend com as noticias:
<div align="center">
  <img src="/2025-2-SeLiga/imagens/front/image.png">
</div>
<div align="center">
  <img src="/2025-2-SeLiga/imagens/front/image5.png">
</div>

* Banco de dados Mongo DB:
<div align="center">
  <img src="/2025-2-SeLiga/imagens/desenvolvimento/mongoDBexemplo.png">
</div>
<div align="center">
  <img src="/2025-2-SeLiga/imagens/desenvolvimento/terminalscrapy.png">
</div>

* Verificador.py em execução:

<div align="center">
  <img src="/2025-2-SeLiga/imagens/desenvolvimento/terminalverificador.png">
</div>

* WebScrapy funcionando:
``` Python
>> scrapy crawl metropoles
2025-12-01 23:28:24 [scrapy.utils.log] INFO: Scrapy 2.13.3 started (bot: spiders)
2025-12-01 23:28:24 [scrapy.utils.log] INFO: Versions:
{'lxml': '6.0.2',
 'libxml2': '2.14.6',
 'cssselect': '1.3.0',
 'parsel': '1.10.0',
 'w3lib': '2.3.1',
 'Twisted': '25.5.0',
 'Python': '3.12.3 (main, Nov  6 2025, 13:44:16) [GCC 13.3.0]',
 'pyOpenSSL': '25.3.0 (OpenSSL 3.5.3 16 Sep 2025)',
 'cryptography': '46.0.1',
 'Platform': 'Linux-6.14.0-1016-oem-x86_64-with-glibc2.39'}
2025-12-01 23:28:24 [scrapy.addons] INFO: Enabled addons:
[]
2025-12-01 23:28:24 [asyncio] DEBUG: Using selector: EpollSelector
2025-12-01 23:28:24 [scrapy.utils.log] DEBUG: Using reactor: twisted.internet.asyncioreactor.AsyncioSelectorReactor
2025-12-01 23:28:24 [scrapy.utils.log] DEBUG: Using asyncio event loop: asyncio.unix_events._UnixSelectorEventLoop
2025-12-01 23:28:24 [scrapy.extensions.telnet] INFO: Telnet Password: 7cf4db04d5d52631
2025-12-01 23:28:24 [scrapy.middleware] INFO: Enabled extensions:
['scrapy.extensions.corestats.CoreStats',
 'scrapy.extensions.telnet.TelnetConsole',
 'scrapy.extensions.memusage.MemoryUsage',
 'scrapy.extensions.logstats.LogStats']
2025-12-01 23:28:24 [scrapy.crawler] INFO: Overridden settings:
...
```

---

# Testes e Qualidade
Para garantir uma boa qualidade de produto, é necessário que cada entrega mantenha um padrão de excelência. Para isso, foram implementados teste unitários que verificam a resposta do sistema no nível mais básico de cada função.

## Testes Unitários
### Framework utilizado

| Tecnologia | Aplicação | Justificativa |
| :--- | :---: | ---: |
| **Pytest** | *BackEnd e WebScraping* | O Pytest é um framework utilizado para desenvolvimento Python que permite a criação de casos teste para determinadas funções de um código. |
| **Jest** | *FrontEnd*  | O Jest é um framework utilizado para desenvolvimento JavaScript/React que permite a verificação do comportamento de páginas e componentes de uma aplicação Web. |
| **Flake8**| *BackEnd e WebScraping* | O Flake8 é uma ferramenta de linha de comando em Python para verificação de violações de sintaxe em um código. |

* Exemplo de função de teste:
``` Python
def teste_root(monkeypatch):
    """
    Testa o endpoint "/" com filtro de titulo
    """

    # ID's falsos para o teste
    fake_id_1 = "60c72b9f9b1d8f001f8e4a9a"
    fake_id_2 = "60c72b9f9b1d8f001f8e4a9b"

    noticias_fake = [
        {
            "_id": ObjectId(fake_id_1),
            "titulo": "Noticia sobre politica",
            "texto": "Corpo do texto para a noticia sobre politica",
            "fonte": "fonte1",
            "url":"http://sitefake1.com",
            "data_coleta": "01/01/2025",
            "status_verificacao": "verificado",
            "verificacao": {}
        },
        {
            "_id": ObjectId(fake_id_2),
            "titulo": "Noticia sobre economia",
            "texto": "Corpo do texto para a noticia sobre ecnomia",
            "fonte": "fonte2",
            "url":"http://sitefake2.com",
            "data_coleta": "02/02/2025",
            "status_verificacao": "verificado",
            "verificacao": {}
        }
    ]
    

    termo_de_busca = "politica"

    # 'filtro' é referente ao '{}' em 'news_collection.find({})'
    def mock_find(filtro):
        assert filtro["titulo"]["$regex"] == termo_de_busca
        assert filtro["titulo"]["$options"] == "i"
        assert filtro.get("status_verificacao") == "verificado"
        return noticias_fake
    
    # o monkeypatch é quem substitui o 'newws_collection.find' pelos dados de teste
    monkeypatch.setattr("main.news_collection.find", mock_find)

    response = client.get(f"/?titulo={termo_de_busca}")
    assert response.status_code == 200  # status_code != 200, falhou

    dados = response.json()

    # deve apenas mostrar a primeira notícia (sobre politica)
    assert dados["total"] == 2
    assert dados["noticias"][0]["_id"] == fake_id_1
    assert dados["noticias"][0]["titulo"] == "Noticia sobre politica"
```

### Cobertura de testes
- BackEnd : 42,3%
- FrontEnd : 71,15%
- WebScraping : 82,1%

## Testes de Integração
Para a validação de pushes e pullrequests no repositório, foram implementadas 3 rotinas principais de teste que verificam a resposta do sistema em cada seção do projeto.

### Fluxos testados
* Workflow para BackEnd:
``` Python
    name: React CI

on:
push:
branches: ["main","feat/workflows"]
paths:
    - 'FrontEnd/**'
pull_request: 
branches: ["main"]
paths:
    - 'FrontEnd/**'

jobs:
build: 
runs-on: ubuntu-latest

defaults:
    run:
    working-directory: FrontEnd

steps:
    - name: Checkout repository
    uses: actions/checkout@v4

    - name: Set up Node.js
    uses: actions/setup-node@v4
    with:
        node-version: "18" 
        cache: "npm"
        cache-dependency-path: "FrontEnd/package-lock.json"

    - name: Install dependencies
    run: npm ci
    
    - name: Run tests
    run: CI=true npm test -- --watchAll=false --passWithNoTests

    - name: Build project
    run: CI=false npm run build
```

<br>

* Workflow para FrontEnd:
``` Python

name: fastAPI CI

on:
  push:
    branches: ["main"]
    paths:
      - 'BackEnd/**'
  pull_request: 
    branches: ["main"]
    paths:
      - 'BackEnd/**'

jobs:
  build:
    runs-on: ubuntu-latest

    defaults:
      run:
        working-directory: BackEnd
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up python
        uses: actions/setup-python@v5
        with:
          python-version: "3.12"
          cache: "pip"
        
      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r ../requirements.txt
          pip install flake8 pytest httpx

          if [ -f "../requirements.txt" ]; then
            pip install -r "../requirements.txt"
          fi

      - name: Lint with flake8
        run: |
          flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics
          flake8 . --count --exit-zero --max-complexity=10 --max-line-length=127 --statistics
      
      - name: Run tests
        run: |
          export PYTHONPATH=$PYTHONPATH:$(pwd)
          pytest

```

<br>

* Workflow para WebScraping:
``` Python
name: Scrapy CI

on:
  push:
    branches: ["main"]
    paths:
      - 'spiders/**'
  pull_request: 
    branches: ["main"]
    paths:
      - 'spiders/**'

jobs:
  build:
    runs-on: ubuntu-latest

    defaults:
      run:
        working-directory: spiders 

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up python
        uses: actions/setup-python@v5
        with:
          python-version: "3.12"
          cache: "pip"

      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r ../requirements.txt
          pip install flake8 pytest scrapy

          if [ -f "../requirements.txt" ]; then
            pip install -r "../requirements.txt"
          fi

      - name: Lint with flake8
        run: |
          flake8 . --count --select=E9,F63,F7,F82 --show-source --statistics
          flake8 . --count --exit-zero --max-complexity=10 --max-line-length=127 --statistics

      - name: Run tests
        run: |
          export PYTHONPATH=$PYTHONPATH:$(pwd)
          pytest
```

<br>
