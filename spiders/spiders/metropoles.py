import scrapy

class MetropolesSpider(scrapy.Spider):
    
    name = 'metropoles'
    allowed_domains = ['metropoles.com']
    start_urls = ['https://www.metropoles.com/ultimas-noticias/']

    def parse(self, response):
        self.log(f'Analisando a página de últimas notícias: {response.url}')

        noticias = response.css('article[class*="NoticiaWrapper__Article"]')

        self.log(f"Encontrados {len(noticias)} cards de notícia na página.")

        for noticia in noticias:
            link = noticia.css('h5.noticia__titulo a::attr(href)').get()
            
            if link:
                yield response.follow(response.urljoin(link), callback=self.parse_artigo)

    def parse_artigo(self, response):
        
        self.log(f'Extraindo dados do artigo: {response.url}')
        
        categoria = response.css('div[class*="HeaderNoticiaWrapper__Categoria"] a::text').get()
        
        titulo = response.css('h1[class*="Text__TextBase"]::text').get()
        
        autor = response.css('div[class*="HeaderNoticiaWrapper__Autor"] a::text').get()
        
        data_publicacao = response.css('time[class*="HeaderNoticiaWrapper__DataPublicacao"]::attr(datetime)').get()
        
        paragrafos = response.css('div[class*="ConteudoNoticiaWrapper__Artigo"] p::text').getall()

        # combinação dos paragrafos em um só corpo de texto
        corpo_texto = '\n'.join(paragrafo.strip() for paragrafo in paragrafos if paragrafo.strip())

        yield {
            'url': response.url,
            'titulo': titulo.strip() if titulo else None,
            'autor': autor.strip() if autor else None,
            'data_publicacao': data_publicacao,
            'categoria': categoria.strip() if categoria else 'Geral',
            'corpo_texto': corpo_texto,
            'fonte': self.name,
        }