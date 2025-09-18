# Estudo sobre FastAPI

## O que é
- **FastAPI** é um framework moderno e rápido para construir APIs com Python.  
- Baseado em **Python 3.7+**.  
- Utiliza **tipagem** (type hints) para validação automática.  
- Utiliza **json** para retornar qualquer dado de um endpoint.
- Gera documentação interativa automaticamente.  
- **Nota:** É recomendado que os arquivos de estudo de **APIs** e **protocolo HTTP** sejam visitados antes de estudar o que vem a seguir.

---

## Vantagens
- **Rápido**: baseado em ASGI (uvicorn, starlette).  
- **Validação automática**: usando **Pydantic**.  
- **Documentação automática**: Swagger UI e Redoc.  
- **Suporte a autenticação**: OAuth2, JWT, etc.  
- **Fácil de usar**: código simples e intuitivo.  

---

## Instalação

* Para conseguir utilizar o framework, é necessário seguir os seguintes passos:

**1. Instale o módulo do fastAPI:**

```bash
pip install fastapi
```

**2. Instale uvicorn:**
```bash
pip install uvicorn
```

* Para descobrir se a instalação ocorreu como esperado (faça isso no seu arquivo python):

```bash
import fastapi
```
* Rode o arquivo, se não ocorrerem erros, a instalação foi eficaz.

## Criando uma API

### Importe o módulo fastAPI e crie um "objeto" para a API:
```bash
from fastapi import fastAPI

app = FastAPI()
```

### Para criar um endpoint:
```bash
@app.get("/")
def home():
    return{"Dados": "Nome"}
```
* "get" - Método HTTP (Para mais informações sobre métodos HTTP, confira o estudo sobre protocolo HTTP)
* "/" - Endpoint que foi criado

## Rodando a API
* Para rodar a API, abra seu terminal no diretório em que o arquivo python foi criado e digite:
```bash
uvicorn <nome_do_arquivo>:<nome_do_objeto> --reload
```
* Sendo assim:
    * <nome_do_arquivo> - nome do .py (importante notar que no terminal não se deve colocar o ".py")
    * <nome_do_objeto> - app
    * --reload - recarrega o servidor toda vez que ocorrer uma mudança no arquivo python
* Note que, graças ao "--reload", é possível atualizar o arquivo em tempo real.

## Acessando a documentação
* Ao realizar a etapa anterior, adicionando o endpoint "/docs" é possível acessar uma documentação da API gerada atuomaticamente.
* É um jeito de se testar a API de uma forma mais visual

## Parâmetros de endpoint

* Vamos construir uma dicionário em python que represente um armazém de produtos de uma loja, em que cada produto é identificado por um ID:

```bash
armazem = {
        1:{
            "nome": "maca", 
            "validade": "28/10/2028",
            "preco": 4.21
        }
    }
```
* Neste caso, maca tem ID 1. Vamos criar um endpoint que retorne informações de um produto, levando em consideração sem ID:

```bash
@app.get("/get-item/{item_id}")
def get_item(item_id: int):
    return armazem[item_id]
```
* Para uma melhor análise, vamos olhar linha por linha:
    * **@app.get("/get-item/{item_id}")** - Cria um endpoint com método get, adicionando um parâmetro "item_id" que vai ser definido na função.   

    * **def get_item(item_id: int):** - Define a função utilizada para o endpoint, em que "item_id: int" é um parâmetro definido por um **"type hint"**, para que assim, nada além de um tipo inteiro seja reconhecido, gerando uma mensagem de erro caso não seja.  

    * **return armazem[item_id]** - Retorna todas as informações do produto.   
* Então, no nosso caso, se tentassemos acessar o endpoint "/get-item/1", obteríamos:

```bash
nome:   	"maca"
validade:	"28/10/2028"
preco:	    4.21
```
