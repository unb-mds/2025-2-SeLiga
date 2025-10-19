import scrapy


class MetropolesSpider(scrapy.Spider):
    name = "metropoles"
    allowed_domains = ["metropoles.com"]
    start_urls = ["https://metropoles.com/ultimas-noticias/"]

    def parse(self, response):
        """
        Aqui analiso a página de "Últimas Notícias".
        Ele itera sobre cada notícia, verifica se a categoria é "Na Mira",
        e só então segue o link.
        """
        self.log(f'Analisando a página de categoria: {response.url}')
        
        noticias = response.css('article.m-feed-news')

        for noticia in noticias:
            categoria = noticia.css('span.m-label::text').get()

            if categoria and 'na mira' in categoria.strip().lower():
                link = noticia.css('a::attr(href)').get()

                if link:
                    self.log(f'Notícia da categoria "Na Mira" encontrada: {link}')
                    yield response.follow(link, callback=self.parse_artigo)
    
    def parse_artigo(self, response):
        self.log(f'Extraindo dados do artigo: {response.url}')
        
        titulo = response.css('h1.m-headline::text').get()
        autor = response.css('a.m-author-name__link::text').get()
        data_publicacao = response.css('time[itemprop="datePublished"]::attr(datetime)').get()
        paragrafos = response.css('div.m-body p::text').getall()
        corpo_texto = '\n'.join(paragrafo.strip() for paragrafo in paragrafos if paragrafos.strip())

        yield {
            'url':response.url,
            'titulo':titulo.strip() if titulo else None,
            'autor':autor.strip() if autor else None,
            'data_publicacao':data_publicacao,
            'corpo_texto':corpo_texto,
            'fonte':self.name,
            'categoria': 'Na Mira',
        }