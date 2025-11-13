import scrapy
import datetime
from spiders.items import NoticiaItem

class MetropolesSpider(scrapy.Spider):
    
    name = 'metropoles'
    allowed_domains = ['metropoles.com']
    start_urls = ['https://www.metropoles.com/ultimas-noticias/']

    # Defina aqui as categorias que você quer minerar.
    CATEGORIAS_PERMITIDAS = ['brasil', 'mundo', 'ciência', 'saúde', 'política'] 

    def parse(self, response):
        for noticia in response.css('article[class*="NoticiaWrapper__Article"]'):
            categoria_texto = noticia.css('div[class*="NoticiaWrapper__Categoria"] a::text').get()
            
            if not categoria_texto:
                continue # Pula o card de noticia se não encontrar a categoria

            categoria_limpa = categoria_texto.strip().lower()

            if categoria_limpa in self.CATEGORIAS_PERMITIDAS:
                link = noticia.css('h5.noticia__titulo a::attr(href)').get()

                if link:
                    yield response.follow(response.urljoin(link), callback=self.parse_artigo)
            
            else:
                pass # Categoria não permitida

    def parse_artigo(self, response):
        item = NoticiaItem()
        
        item["titulo"] = response.css('h1[class*="Text__TextBase"]::text').get()
        item["categoria"] = response.css('div[class*="HeaderNoticiaWrapper__Categoria"] a::text').get()
        item["fonte"] = self.name
        item["url"] = response.url

        agora = datetime.datetime.now()
        data_publicacao = agora.strftime("%d/%m/%Y")
        item["data_coleta"] = data_publicacao

        paragrafos = response.css('div[class*="ConteudoNoticiaWrapper__Artigo"] p::text').getall()
        item["texto"] = ' '.join(paragrafo.strip() for paragrafo in paragrafos if paragrafo.strip())

        yield item