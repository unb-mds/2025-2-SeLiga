from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from pymongo import MongoClient
from bson.objectid import ObjectId
from dotenv import load_dotenv
import os

# Carrega variáveis do arquivo .env
load_dotenv()

# Conecta ao MongoDB Atlas
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db_mongo = client['DadosSeLIga']
news_collection = db_mongo['Dados']

# Modelo para notícia completa (como está no MongoDB)
class NewsDocument(BaseModel):
    titulo: str
    texto: str
    fonte: str
    url: str
    data_coleta: str
    status_verificacao: str = "pendente"
    verificacao: Dict[str, Any] = Field(default_factory=dict)

# Modelo para criar/atualizar notícia
class NewsCreate(BaseModel):
    titulo: str
    texto: str
    fonte: str
    url: str

# Modelo de resposta simplificado (para compatibilidade)
class News(BaseModel):
    id: int
    title: str
    veracity: str

class NewsList (BaseModel):
    news : List[News]

app = FastAPI(
    title="SeLiga API",
    description="API para verificação de notícias",
    version="1.0.0"
)

origins = [
    "http://localhost:3000",           
    "http://127.0.0.1:3000"                
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET"],  # APENAS LEITURA 
    allow_headers=["*"],
)

@app.get("/")
def root(titulo: Optional[str] = None):
    """Endpoint raiz - retorna apenas notícias verificadas (ou filtra por título se fornecido)"""
    try:
        filtro = {"status_verificacao": "verificado"}
        
        if titulo:
            filtro["titulo"] = {"$regex": titulo, "$options": "i"}

        # Puxa as notícias com os filtros aplicados
        noticias = list(news_collection.find(filtro))
        
        # Converte ObjectId para string
        for noticia in noticias:
            noticia['_id'] = str(noticia['_id'])
        
        return {
            "total": len(noticias),
            "noticias": noticias
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar notícias: {str(e)}")

@app.get("/sobre")
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
