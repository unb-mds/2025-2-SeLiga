import scrapy

class NoticiaItem(scrapy.Item):
    titulo = scrapy.Field()
    texto = scrapy.Field()
    fonte = scrapy.Field()
    url = scrapy.Field()
    data_coleta = scrapy.Field()
    categoria = scrapy.Field()
    status_verificacao = scrapy.Field()
    verificacao = scrapy.Field()

