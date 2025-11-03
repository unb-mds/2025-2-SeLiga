from fastapi.testclient import TestClient
from main import app
from bson.objectid import ObjectId

client = TestClient(app)

def teste_root():
    """
    Testa o endpoint "/"
    """

    response = client.get("/")
    assert response.status_code == 200  # status_code != 200, falhou

    # O conteúdo JSON da resposta deve ser o esperado
    dados_esperados = {
        "message": "SeLiga API - Sistema de Verificação de Notícias",
        "version": "0.1.0",
        "endpoints": {
            "docs": "/docs",
            "noticias": "/noticias",
            "sobre": "/sobre"
        }
    }
    
    # response != dados_esperados, falhou
    assert response.json() == dados_esperados

def teste_sobre():
    """
    Testa o endpoint "/"
    """

    # status_code != 200, falhou
    response = client.get("/sobre")
    assert response.status_code == 200  # status_code != 200, falhou

    # O conteúdo JSON da resposta deve ser o esperado
    dados_esperados = {
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
    considerando que o titulo da notícia foi encontrada
    """

    termo_de_busca = "Politica"     # termo digitado pelo usuário

    fake_noticia = {
        "_id": ObjectId(fake_id_valido),
        "titulo": "Notícia sobre politica",         # deve conter palavra chave 'politica'
        "texto": "Corpo do texto para a noticia",
        "fonte": "Fonte teste",
        "url": "http://teste.com",
        "data_coleta": "01/01/2025 12:00:00",
        "status_verificacao": "pendente",
        "verificacao": {}
    }

    # substitui o '.find' do pymongo
    # regex localiza o termo específico no título
    def mock_find(filtro):
        assert filtro["titulo"]["$regex"] == termo_de_busca
        assert filtro["titulo"]["$options"] == "i"
        return [fake_noticia]         # retorna notícia que criamos anteriormente caso não falhe
    
    monkeypatch.setattr("main.news_collection.find", mock_find)

    response = client.get(f"/noticias/buscar/{termo_de_busca}")
    assert response.status_code == 200
    data = response.json()

    assert data["total"] == 1
    assert len(data["noticias"]) == 1
    assert data["noticias"][0]["_id"] == fake_id_valido
    assert data["noticias"][0]["titulo"] == "Notícia sobre politica"

def teste_buscar_noticia_inexistente(monkeypatch):
    """
    Testa a função de buscar do endpoint /noticias, 
    mas o titulo da notícia não pode ser encontrado (lista vazia)
    """

    termo_de_busca = "Politica"     # termo digitado pelo usuário    

    def mock_find_vazio(filtro):
        assert filtro["titulo"]["$regex"] == termo_de_busca
        return [] # Retorna sem notícias (deveria falhar)
    
    monkeypatch.setattr("main.news_collection.find", mock_find_vazio)

    response = client.get(f"/noticias/buscar/{termo_de_busca}")

    assert response.status_code == 404      # not found
    assert response.json()["detail"] == "Nenhuma notícia encontrada com esse título"

def teste_buscar_falha_sistema(monkeypatch):
    """
    Testa a função de buscar do endpoint /noticias,
    mas o banco de dados falha
    """
    
    # um mock que simula um erro por padrão
    def mock_find_erro(filtro):
        raise Exception("Erro de regex simulado")
    
    monkeypatch.setattr("main.news_collection.find", mock_find_erro)

    response = client.get(f"/noticias/buscar/exemplo")     # qualquer nome deve falhar, independente do termo de busca

    assert response.status_code == 500          # server error
    assert "Erro ao buscar notícia:" in response.json()["detail"]

