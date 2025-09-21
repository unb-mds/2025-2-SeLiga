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

* Para adicionar informações mais detalhadas ao caminho do endpoint, uma função que pode ser útil é:

```bash
from fastapi import FastAPI, Path

...

@app.get("/get-item/{item_id}")
def get_item(item_id: int = Path(None, description="Insira ID do item")):
    return armazem[item_id]
```
* Note que para adicionar descrição ao path é necessário adicionar um valor "padrão" (valor que será passado se nenhum valor for informado), denotado pelo parâmetro "None", que não retorna valor.


## Parâmetros de query

* De maneira simples, é o que vem depois do "?" em um URL. Ex: "aprender3.com/home?key='****'/msg=succeded".

```bash
@app.get("/get-por-nome")
def get_item(nome: str = Query(None, title="Nome", description="Nome")):
    for item_id in armazem:
        if armazem[item_id].nome == nome:
            return armazem[item_id]
    return {"Dado": "Not found"}
```

* Também é possível combinar parâmetros de caminho e query.

```bash
@app.get("/get-nome/{item_id}")
def get_item(item_id: int, name: str):
    for item_id in armazem:
        if armazem[item_id]["nome"] == name:
            return armazem[item_id]
    return {"Dado": "Not found"}
```


## Outros métodos

* Já vimos aqui, indiretamente, o método "GET". Vamos ver também outros métodos HTTP que podem ser utilizados no framework:

### POST

```bash
from pydantic import BaseModel

class Item(BaseModel):                    # Herda de BaseModel
    nome: str
    validade: str
    preco: float

...

@app.post("/cria-item/{item_id}")
def cria_item(item_id: int, item: Item):  # item pertence à classe Item
    if item_id in armazem:
        return {"Erro": "Item existente!"}
    armazem[item_id] = item               # Insere o objeto item ao dicionário, convertendo 
    return armazem[item_id]               # em json (Utiliza o BaseModel para isso)
```

### PUT

```bash
@app.put("/update-item/{item_id}")
def update_item(item_id: int, item: Item):
    if item_id not in armazem:
        return {"Erro": "Item não existe!"}     # Impossível atualizar um item que não existe
    
    if item.nome != None:                       # Checa se nome do item não é vazio
        armazem[item_id].nome = item.nome
    if item.validade != None:                       # Checa se validade do item não é vazio
        armazem[item_id].validade = item.validade
    if item.preco != None:                       # Checa se preco do item não é vazio
        armazem[item_id].preco = item.preco
    return armazem[item_id]


```

### DELETE

```bash
@app.delete("/delete-item")
def delete_item(item_id: int = Query(..., description="ID do item"))        # "..." significa que é opcional
    if item_id not in armazem:
        return{"Erro": "ID não cadastrado"}
    del armazem[item_id]                                                    # Simplesmente deleta do dicionário
    return{"Sucesso": "Item deletado"}
```

## Códigos de resposta do sistema

* Para conseguir retornar algum código, é preciso:

```bash
from fastapi import FastAPI, HTTPException, status

...
```

* Agora, quando se desejar retornar um código de resposta, ao invés de utilizar um "return" para retornar dados, use "raise HTTPException", seguido de "status_code", como mostrado a seguir:

```bash
@app.delete("/delete-item")
def delete_item(item_id: int = Query(..., description="ID do item"))        # "..." significa que é opcional
    if item_id not in armazem:
        raise HTTPException(satus_code = status.HTTP_404_NOT_FOUND, detail="Nome nao encontrado")       # Ou utilize o código que desejar 
    del armazem[item_id]                                                    # Simplesmente deleta do dicionário
    return{"Sucesso": "Item deletado"}
```