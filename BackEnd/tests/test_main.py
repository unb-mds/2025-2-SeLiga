from fastapi.testclient import TestClient
from main import app
"""
TestClient da lib do fastapi permite 
testes sem criar conexão HTTP real
"""
client = TestClient(app)

def test_root():
    """
    Testa se o endpoint root (/) está funcionando 
    e retornando os dados corretos.
    """
    response = client.get("/")

    # Aqui, se o código de resposta = 200, passou
    # Se for diferente de 200, falhou
    assert response.status_code == 200
    # O conteúdo JSON da resposta deve ser o esperado
    expected_data = {
        "message": "SeLiga API - Sistema de Verificação de Notícias",
        "version": "1.0.0",
        "endpoints": {
            "docs": "/docs",
            "noticias": "/noticias",
            "sobre": "/sobre",
            "equipe": "/equipe"
        }
    }
    """
     Se a resposta real enviada pela API não
     for igual aos dados esperados, retorna falha
    """
    assert response.json() == expected_data
