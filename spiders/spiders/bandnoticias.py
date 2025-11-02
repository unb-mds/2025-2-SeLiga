import scrapy
import datetime

class BandnoticiasSpider(scrapy.Spider):
    name = "band"
    allowed_domains = ['www.band.com.br']
    start_urls = ["https://www.band.com.br/noticias"]

    def parse(self, response):
        
        self.log(f"\n\nAnalisando a página de listagem: {response.url}\n")
        
        noticias = response.css('div.item-headline')

        self.log(f"\n\nEncontrados {len(noticias)} cards de notícia na página.\n")

        # 1. Encontrar todos os "cards" de notícia
        for noticia in noticias:
            # 2. Pegar o link de cada notícia
            link = noticia.css('a::attr(href)').get() # O link está dentro de uma tag <a> dentro da div
            
            if link:
                # 3. Mandar o Scrapy "seguir" o link
                yield response.follow(response.urljoin(link), callback=self.parse_artigo)

    def parse_artigo(self, response):

        self.log(f"\n\nExtraindo dados do artigo: {response.url}\n")

        categoria = response.css('ul.tags a::text').get()
        titulo = response.css('h1.title::text').get() 

        agora = datetime.datetime.now()
        data_publicacao = agora.strftime("%d/%m/%Y")        
        
        paragrafos = response.css('div.text p::text').getall()
        corpo_texto = ' '.join(p.strip() for p in paragrafos if p.strip())

        # 4. Gerar o item final com todos os dados extraídos da PÁGINA DO ARTIGO
        yield {
            'titulo': titulo.strip() if titulo else None,
            'texto': corpo_texto,
            'fonte': self.name,
            'url': response.url,
            'data_coleta': data_publicacao,
            'categoria': categoria.strip() if categoria else None, 
        }