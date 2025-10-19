import scrapy


class G1Spider(scrapy.Spider):
    name = "g1"
    allowed_domains = ["g1.globo.com"]
    start_urls = ["https://g1.globo.com"]

    # Método para página principal 
    def parse(self, response):
        self.log(f'Acessando a página principal: {response.url}')
        # cada notícia do site do g1 está cadastrada como "feed-post-link" 
        links_de_noticia = response.css('a.feed-post-link::attr(href)').getall()

        for link in links_de_noticia:
            yield response.follow(link, callback=self.parse_artigo)

    # Método para cada página individual
    def parse_artigo(self, response):
        self.log(f'Analisando a notícia em: {response.url}')

        # extrai o título da notícia
        titulo = response.css('h1.content-head__title::text').get()
        # extrai a data de publicação da notícia
        data_publicacao = response.css('time[itemprop="datePublished"]::attr(datetime)').get()
        # extrai o corpo do texto da notícia
        paragrafos = response.css('div.content-text__container p::text').getall()
        # junta os paragrafos extraidos em um único bloco 
        corpo_texto = '\n'.join(paragrafos.strip() for paragrafo in paragrafos if paragrafo.strip())

        yield {
            'url' : response.url,
            'titulo' : titulo.strip() if titulo else None,
            'data_publicacao' : data_publicacao,
            'corpo_texto' : corpo_texto,
            'fonte' : self.name,
        }
