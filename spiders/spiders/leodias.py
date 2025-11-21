import scrapy
import datetime
from spiders.items import NoticiaItem


class LeodiasSpider(scrapy.Spider):
    name = "leodias"
    allowed_domains = ["portalleodias.com"]
    start_urls = ["https://portalleodias.com/politica"]

    def parse(self, response):
        
        for noticia in response.css('div.ld-list article:has(div.ld-info)'):
            
            link = noticia.css('h3 a::attr(href)').get()

            if link:
                yield response.follow(response.urljoin(link), callback=self.parse_artigo)

    def parse_artigo(self, response):
        item = NoticiaItem()

        item["titulo"] = response.css('div.ld-single-content article h1::text').get()
        item["categoria"] = "Politica"
        item["fonte"] = self.name
        item["url"] = response.url

        agora = datetime.datetime.now()
        data_publicacao = agora.strftime("%d/%m/%Y")
        item["data_coleta"] = data_publicacao

        paragrafos = response.css('article div.ld-cms-content p::text').getall()
        item["texto"] = ' '.join(p.strip() for p in paragrafos if p.strip())

        item["status_verificacao"] = "pendente"
        item["verificacao"] = {
            "classificacao": None,
            "confianca_percentual": None,
            "justificativa": None,
            "fontes_consultadas": [],
            "data_verificacao": None
        }

        # 4. Gerar o item final com todos os dados extraídos da PÁGINA DO ARTIGO
        yield item