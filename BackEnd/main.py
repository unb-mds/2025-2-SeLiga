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
    "http://127.0.0.1:3000"                # informa a porta para o frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # se precisar bloquear algum método (GET ou POST)  
    allow_headers=["*"], # ou header, apenas modificar linha
)

@app.get("/")
def root():
    """Endpoint raiz - retorna informações da API"""
    return {
        "message": "SeLiga API - Sistema de Verificação de Notícias",
        "version": "1.0.0",
        "endpoints": {
            "docs": "/docs",
            "noticias": "/noticias",
            "sobre": "/sobre",
            "equipe": "/equipe"
        }
    }

@app.get("/noticias")
def listar_noticias():
    """Lista todas as notícias do banco de dados"""
    try:
        noticias = list(news_collection.find({}))
        
        # Converte ObjectId para string
        for noticia in noticias:
            noticia['_id'] = str(noticia['_id'])
        
        return {
            "total": len(noticias),
            "noticias": noticias
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar notícias: {str(e)}")

@app.get("/noticias/buscar/{titulo}")
def buscar_noticia_por_titulo(titulo: str):
    """Busca notícias por título (busca parcial, case-insensitive)"""
    try:
        # Busca usando regex para permitir busca parcial e ignorar maiúsculas/minúsculas
        noticias = list(news_collection.find({"titulo": {"$regex": titulo, "$options": "i"}}))
        
        if not noticias:
            raise HTTPException(status_code=404, detail="Nenhuma notícia encontrada com esse título")
        
        # Converte ObjectId para string
        for noticia in noticias:
            noticia['_id'] = str(noticia['_id'])
        
        return {
            "total": len(noticias),
            "noticias": noticias
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar notícia: {str(e)}")

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


@app.put("/noticias/{noticia_id}")
def atualizar_noticia(noticia_id: str, noticia: NewsCreate):
    """Atualiza uma notícia existente"""
    try:
        # Valida se é um ObjectId válido
        if not ObjectId.is_valid(noticia_id):
            raise HTTPException(status_code=400, detail="ID inválido")
        
        # Prepara os dados para atualização
        dados_atualizacao = {
            "titulo": noticia.titulo,
            "texto": noticia.texto,
            "fonte": noticia.fonte,
            "url": noticia.url
        }
        
        resultado = news_collection.update_one(
            {"_id": ObjectId(noticia_id)},
            {"$set": dados_atualizacao}
        )
        
        if resultado.matched_count == 0:
            raise HTTPException(status_code=404, detail="Notícia não encontrada")
        
        return {
            "message": "Notícia atualizada com sucesso!",
            "id": noticia_id,
            "modificado": resultado.modified_count > 0
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao atualizar notícia: {str(e)}")

@app.delete("/noticias/{noticia_id}")
def deletar_noticia(noticia_id: str):
    """Remove uma notícia do banco de dados"""
    try:
        # Valida se é um ObjectId válido
        if not ObjectId.is_valid(noticia_id):
            raise HTTPException(status_code=400, detail="ID inválido")
        
        resultado = news_collection.delete_one({"_id": ObjectId(noticia_id)})
        
        if resultado.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Notícia não encontrada")
        
        return {
            "message": "Notícia deletada com sucesso!",
            "id": noticia_id
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao deletar notícia: {str(e)}")

@app.get("/noticias/status/{status}")
def buscar_por_status(status: str):
    """Busca notícias por status de verificação"""
    try:
        noticias = list(news_collection.find({"status_verificacao": status}))
        
        # Converte ObjectId para string
        for noticia in noticias:
            noticia['_id'] = str(noticia['_id'])
        
        return {
            "status": status,
            "total": len(noticias),
            "noticias": noticias
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar notícias: {str(e)}")

