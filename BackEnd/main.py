from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

class News (BaseModel):
    id: int
    title: str
    veracity: str

class NewsList (BaseModel):
    news : List[News]

app = FastAPI();

origins = [
    "http://localhost:3000"                 # informa a porta para o frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],                    # se precisar bloquear algum método (GET ou POST)  
    allow_headers=["*"],                    # ou header, apenas modificar linha
    )

# database temporário para testes
db =[   {"id": 1, "title": "Notícia 1", "veracity": "verified"},
        {"id": 2, "title": "Notícia 2", "veracity": "fake"},
        {"id": 3, "title": "Notícia 3", "veracity": "verified"},                           
    ]

@app.get("/", response_model=NewsList)
def root():
    return NewsList(news=db)

@app.get("/sobre")
def sobre():
    return {
        "message": "Informações sobre a aplicação SeLiga",
        "version": "0.1.0",
        "author": "SeLiga"
    }
    
@app.get("/equipe")
def equipe():
    return {
        "squad": "Squad 05",
        "membros": [
            {"nome": "Gustavo", "papeis": ["Scrum Master", "Back-end"], "imagem_url": "/imagens_equipe/gustavo.jpg"},
            {"nome": "Arthur", "papeis": ["Product Owner", "Back-end", "DevOps"], "imagem_url": "/imagens_equipe/arthur.jpg"},
            {"nome": "Marcus", "papeis": ["Front-end", "Banco de Dados"], "imagem_url": "/imagens_equipe/marcus.jpg"},
            {"nome": "Amanda", "papeis": ["Front-end", "Banco de Dados"], "imagem_url": "/imagens_equipe/amanda.jpg"},
            {"nome": "Enzo", "papeis": ["Back-end", "Banco de Dados", "Arquitetura"], "imagem_url": "/imagens_equipe/enzo.jpg"},
            {"nome": "Erick", "papeis": ["DevOps", "Arquitetura"], "imagem_url": "/imagens_equipe/erick.jpg"}
        ]
    }
# nova endpoint criado para equipe
# agora quando o front fizer uma requisição para /equipe, receberá a lista de membros do time
# no caso http://localhost:8000/equipe
# membro.nome pega o nome
# membro.papeis pega a lista de papeis
# memebro.imagem_url pega a url da imagem
# ai é so fazer a requisição no front pois as rotas ja estao configuradas

