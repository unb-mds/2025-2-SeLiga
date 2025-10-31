import scrapy


class BandnoticiasSpider(scrapy.Spider):
    name = "band"
   # allowed_domains = ["www.band.com.br"]
    start_urls = ["https://www.band.com.br/noticias"]

    def parse(self, response):
        for noticias in response.css('div.item-headline'):
             yield {
            'url': noticias.css('div.item-headline a::attr(href)').get(),
            'titulo': noticias.css('h3.title::text').get(),
            'autor': None,
            'data_publicacao': None,
            'categoria': 'Geral',
            'corpo_texto': None,
            'fonte': self.name,
        }
             
             