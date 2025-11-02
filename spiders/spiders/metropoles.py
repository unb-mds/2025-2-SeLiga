import scrapy
import datetime

class MetropolesSpider(scrapy.Spider):
    
    name = 'metropoles'
    allowed_domains = ['metropoles.com']
    start_urls = ['https://www.metropoles.com/ultimas-noticias/']

    # Defina aqui as categorias que você quer minerar.
    CATEGORIAS_PERMITIDAS = ['brasil', 'mundo', 'ciência', 'saúde', 'política'] 

    def parse(self, response):
        self.log(f'\n\nAnalisando a página de últimas notícias: {response.url}\n')

        noticias = response.css('article[class*="NoticiaWrapper__Article"]')
        self.log(f"\n\nEncontrados {len(noticias)} cards de notícia na página.\n")

        for noticia in noticias:
            
            categoria_texto = noticia.css('div[class*="NoticiaWrapper__Categoria"] a::text').get()
            
            if not categoria_texto:
                continue # Pula o card de noticia se não encontrar a categoria

            categoria_limpa = categoria_texto.strip().lower()

            if categoria_limpa in self.CATEGORIAS_PERMITIDAS:
                self.log(f"\n\nCategoria '{categoria_limpa}' encontrada! Seguindo link...\n")
                
                link = noticia.css('h5.noticia__titulo a::attr(href)').get()

                if link:
                    yield response.follow(response.urljoin(link), callback=self.parse_artigo)
            
            else:
                self.log(f"\n\nCategoria '{categoria_limpa}' não permitida. Pulando.\n")
                pass

    def parse_artigo(self, response):
        
        self.log(f'\n\nExtraindo dados do artigo: {response.url}\n')
        
        categoria = response.css('div[class*="HeaderNoticiaWrapper__Categoria"] a::text').get()
        titulo = response.css('h1[class*="Text__TextBase"]::text').get()

        agora = datetime.datetime.now()
        data_publicacao = agora.strftime("%d/%m/%Y")

        paragrafos = response.css('div[class*="ConteudoNoticiaWrapper__Artigo"] p::text').getall()
        corpo_texto = ' '.join(paragrafo.strip() for paragrafo in paragrafos if paragrafo.strip())

        yield {
            'titulo': titulo.strip() if titulo else None,
            'texto': corpo_texto,
            'fonte': self.name,
            'url': response.url,
            'data_coleta': data_publicacao,
            'categoria': categoria.strip() if categoria else None,
        }