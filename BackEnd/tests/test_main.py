from fastapi.testclient import TestClient
from main import app
from bson.objectid import ObjectId

client = TestClient(app)

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

def teste_sobre():
    """
    Testa o endpoint "/sobre"
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
