import scrapy
import datetime
from spiders.items import NoticiaItem

class JovempanSpider(scrapy.Spider):

    name = "jovempan"
    allowed_domains = ['jovempan.com.br', 'www.jovempan.com.br']
    start_urls = ["https://jovempan.com.br/noticias/politica"]

    def parse(self, response):
        # 1. Encontrar todos os "cards" de notícia
        for noticia in response.css('h2.post-title'):
            # 2. Pegar o link de cada notícia
            link = noticia.css('a::attr(href)').get() 
            
            if link:
                # 3. Mandar o Scrapy "seguir" o link
                yield response.follow(response.urljoin(link), callback=self.parse_artigo)

    def parse_artigo(self, response):
        item = NoticiaItem()

        item["titulo"] = response.css('h1.post-title::text').get() 
        item["categoria"] = "Política"
        item["fonte"] = self.name
        item["url"] = response.url

        agora = datetime.datetime.now()
        data_publicacao = agora.strftime("%d/%m/%Y")        
        item["data_coleta"] = data_publicacao
        
        paragrafos = response.css('div.context p').xpath('.//text()').getall()
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