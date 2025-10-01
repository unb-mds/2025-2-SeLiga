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