import scrapy
import datetime
from spiders.items import NoticiaItem

class YahooSpider(scrapy.Spider):
    
    name = 'yahoo'
    allowed_domains = ['www.yahoo.com', 'news.yahoo.com']
    start_urls = ['https://www.yahoo.com/news/world/']

    def parse(self, response):
        # 1. Encontrar todos os "cards" de notícia
        for noticia in response.css('li[class*="list-none"]'):
            # 2. Pegar o link de cada notícia
            link = noticia.css('a[class*="stretched-box"]::attr(href)').get()

            if link:
                # 3. Mandar o Scrapy "seguir" o link
                yield response.follow(response.urljoin(link), callback=self.parse_artigo)

    def parse_artigo(self, response):
        item = NoticiaItem()

        item["titulo"] = response.css('h1.mt-2::text').get()
        item["categoria"] = "Mundo"
        # obtenção de categoria com erro
        #categoria = response.css('ul.tags a::text').get()
        item["fonte"] = self.name
        item["url"] = response.url

        agora = datetime.datetime.now()
        data_publicacao = agora.strftime("%d/%m/%Y")
        item["data_coleta"] = data_publicacao
        
        paragrafos = response.css('div[class*="max-w-screen-sm"] p::text').getall()
        item["texto"] = ' '.join(paragrafo.strip() for paragrafo in paragrafos if paragrafo.strip())

        item["status_verificacao"] = "pendente"
        item["verificacao"] = {
            "classificacao": None,
            "confianca_percentual": None,
            "justificativa": None,
            "fontes_consultadas": [],
            "data_verificacao": None
        }

        yield item