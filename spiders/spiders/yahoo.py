import scrapy
import datetime

class YahooSpider(scrapy.Spider):
    
    name = 'yahoo'
    allowed_domains = ['www.yahoo.com', 'news.yahoo.com']
    start_urls = ['https://www.yahoo.com/news/world/']

    def parse(self, response):
        self.log(f'\n\nAnalisando a página de notícias mundiais: {response.url}\n')

        noticias = response.css('li[class*="list-none"]')
        self.log(f"\n\nEncontrados {len(noticias)} cards de notícia na página.\n")

        for noticia in noticias:
            
            link = noticia.css('a[class*="stretched-box"]::attr(href)').get()

            if link:
                yield response.follow(response.urljoin(link), callback=self.parse_artigo)

    def parse_artigo(self, response):
        
        self.log(f'\n\nExtraindo dados do artigo: {response.url}\n')
        
        #categoria = response.css('ul.tags a::text').get()
        titulo = response.css('h1.mt-2::text').get()
        agora = datetime.datetime.now()
        data_publicacao = agora.strftime("%d/%m/%Y")
        
        paragrafos = response.css('div[class*="max-w-screen-sm"] p::text').getall()
        corpo_texto = ' '.join(paragrafo.strip() for paragrafo in paragrafos if paragrafo.strip())

        yield {
            'titulo': titulo.strip() if titulo else None,
            'texto': corpo_texto,
            'fonte': self.name,
            'url': response.url,
            'data_coleta': data_publicacao,
            'categoria': "Mundo",
        }