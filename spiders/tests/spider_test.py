import pytest
import os
from scrapy.http import HtmlResponse, Request
from spiders.spiders.metropoles import MetropolesSpider
from spiders.spiders.bandnoticias import BandnoticiasSpider
from spiders.spiders.leodias import LeodiasSpider
from spiders.spiders.jovempan import JovempanSpider

# busca dinâmica de onde este arquivo de teste está (para o workflow)
TEST_DIR = os.path.dirname(os.path.abspath(__file__))
FIXTURES_DIR = os.path.join(TEST_DIR, 'fixtures')       # define que as fixtures estão no mesmo lugar que este arquivo

def mock_response (url, body):
    request = Request(url=url)
    return HtmlResponse(
        url=url,
        request=request,
        body=body.encode('utf-8'),
        encoding='utf-8'
    )

# As fixtures são páginas html usadas como teste do web scraper
casos_teste = [
    (MetropolesSpider, "metropoles_fixture.html", "Governo anuncia novas medidas econômicas nesta manhã"),
    (BandnoticiasSpider, "band_noticias_fixture.html", "Inflação cai e mercado reage positivamente nesta sexta"),
    (LeodiasSpider, "leo_dias_fixture.html", "Governo propõe mudanças na reforma administrativa"),
    (JovempanSpider, "jovem_pan_fixture.html", "Senado aprova novo projeto de lei sobre tecnologia e inovação"),
]

# Parametrização de cada spider: classe, html, título
@pytest.mark.parametrize("spider_class, fixture, expected_title", casos_teste)
def test_spider(spider_class, fixture, expected_title):
    
    fixture_path = os.path.join(FIXTURES_DIR, fixture)

    if not os.path.exists(fixture_path):
        pytest.fail(f"Arquivo de fixture não encontrado no caminho: {fixture_path}")

    with open(fixture, 'r', encoding='utf-8') as f:
        conteudo_html = f.read()
    
    spider = spider_class()

    url = "https://SeLiga_testes.com/noticia"
    response = mock_response(url, conteudo_html)

    # generator é o retorno do yield da spider
    generator = spider.parse_artigo(response)

    try:
        item = next(generator)  # pega o primeiro item gerado (dicionario)
    except StopIteration:
        pytest.fail("Yield parou de ser chamado")

    assert item["titulo"].strip() == expected_title
    assert len(item["texto"]) > 10, "Erro ao extrair texto"