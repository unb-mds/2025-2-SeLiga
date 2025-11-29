import scrapy
import datetime
from spiders.items import NoticiaItem

class BandnoticiasSpider(scrapy.Spider):

    name = "band"
    allowed_domains = ['www.band.com.br']
    start_urls = ["https://www.band.com.br/noticias"]

    def parse(self, response):
        # 1. Encontrar todos os "cards" de notícia
        for noticia in response.css('div.item-headline'):
            # 2. Pegar o link de cada notícia
            link = noticia.css('a::attr(href)').get() # O link está dentro de uma tag <a> dentro da div
            
            if link:
                # 3. Mandar o Scrapy "seguir" o link
                yield response.follow(response.urljoin(link), callback=self.parse_artigo)

    def parse_artigo(self, response):
        item = NoticiaItem()

        item["titulo"] = response.css('h1.title::text').get() 
        item["categoria"] = response.css('ul.tags a::text').get()
        item["fonte"] = self.name
        item["url"] = response.url

        agora = datetime.datetime.now()
        data_publicacao = agora.strftime("%d/%m/%Y")        
        item["data_coleta"] = data_publicacao
        
        paragrafos = response.css('div.text p::text').getall()
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