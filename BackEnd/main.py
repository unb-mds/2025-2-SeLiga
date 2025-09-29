from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI();

origins = [
    "http://localhost:3000"                 # informa a porta para o frontend
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    )

@app.get("/")
def root():

    # exemplos de notícias
    return {
        "message": "API funcionando",
        "articles": [
            {"id": 1, "title": "Notícia 1", "veracity": "verified"},
            {"id": 2, "title": "Notícia 2", "veracity": "fake"},
            {"id": 3, "title": "Notícia 3", "veracity": "verified"},
        ]
    }

@app.get("/sobre")
def sobre():
    return