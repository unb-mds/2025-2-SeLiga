from fastapi.testclient import TestClient
from main import app
from bson.objectid import ObjectId

client = TestClient(app)

def teste_root():
    """
    Testa o endpoint "/"
    """
    response = client.get("/")

    # status_code != 200, falhou
    assert response.status_code == 200

    # O conteúdo JSON da resposta deve ser o esperado
    dados_esperados = {
        "message": "SeLiga API - Sistema de Verificação de Notícias",
        "version": "1.0.0",
        "endpoints": {
            "docs": "/docs",
            "noticias": "/noticias",
            "sobre": "/sobre",
            "equipe": "/equipe"
        }
    }
    
    # response != dados_esperados, falhou
    assert response.json() == dados_esperados

def teste_listar_noticias(monkeypatch):
    """
    Testa a função de listar do endpoint "/noticias"
    """

    # ID's falsos para o teste
    fake_id_1 = "60c72b9f9b1d8f001f8e4a9a"
    fake_id_2 = "60c72b9f9b1d8f001f8e4a9b"

    noticias_fake = [
        {
            "_id": ObjectId(fake_id_1),
            "titulo": "Noticia 1",
            "texto": "Corpo do texto para a noticia 1",
            "fonte": "fonte1",
            "url":"http://sitefake1.com",
            "data_coleta": "01/01/2025",
            "status_verificacao": "pendente",
            "verificacao": {}
        },
        {
            "_id": ObjectId(fake_id_2),
            "titulo": "Noticia 2",
            "texto": "Corpo do texto para a noticia 2",
            "fonte": "fonte2",
            "url":"http://sitefake2.com",
            "data_coleta": "02/02/2025",
            "status_verificacao": "pendente",
            "verificacao": {}
        }
    ]

    # 'filtro' é referente ao '{}' em 'news_collection.find({})'
    def mock_find(filtro):
        return noticias_fake
    
    # o monkeypatch é quem substitui o 'newws_collection.find' pelos dados de teste
    monkeypatch.setattr("main.news_collection.find", mock_find)
    response = client.get("/noticias")

    # status_code != 200, falha
    assert response.status_code == 200
    
    data = response.json()

    # Verificação se os ID's foram convertidos para string
    assert data["noticias"][0]["_id"] == fake_id_1
    assert data["noticias"][1]["_id"] == fake_id_2
    
    # Verificação do total de notícias
    assert data["total"] == 2
    assert len(data["noticias"]) == 2

# id que atende os requisitos de ObjectId para os testes de busca
fake_id_valido = "60c72b9f9b1d8f001f8e4a9a"

def teste_buscar_noticia_sucesso(monkeypatch):
    """
    Testa a função de buscar do endpoint /noticias, 
    considerando que o id é válido  e a notícia foi encontrada
    """
    fake_noticia = {
        "_id": ObjectId(fake_id_valido),
        "titulo": "Notícia específica",
        "texto": "Corpo do texto para a noticia",
        "fonte": "Fonte teste",
        "url": "http://teste.com",
        "data_coleta": "01/01/2025 12:00:00",
        "status_verificacao": "pendente",
        "verificacao": {}
    }

    # substitui o '.find_one' do pymongo
    def mock_find_one(filtro):
        assert filtro["_id"] == ObjectId(fake_id_valido)
        return fake_noticia         # retorna notícia que criamos anteriormente caso não falhe
    
    monkeypatch.setattr("main.news_collection.find_one", mock_find_one)

    response = client.get(f"/noticias/{fake_id_valido}")
    assert response.status_code == 200
    data = response.json()
    
    assert data["_id"] == fake_id_valido

def teste_buscar_noticia_inexistente(monkeypatch):
    """
    Testa a função de buscar do endpoint /noticias, caso o id da notícia não exista
    """


    

