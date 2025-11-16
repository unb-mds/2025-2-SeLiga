# Scrapy settings for spiders project
#
# For simplicity, this file contains only settings considered important or
# commonly used. You can find more settings consulting the documentation:
#
#     https://docs.scrapy.org/en/latest/topics/settings.html
#     https://docs.scrapy.org/en/latest/topics/downloader-middleware.html
#     https://docs.scrapy.org/en/latest/topics/spider-middleware.html

BOT_NAME = "spiders"

SPIDER_MODULES = ["spiders.spiders"]
NEWSPIDER_MODULE = "spiders.spiders"

ADDONS = {}

# Indentação
FEED_EXPORT_INDENT = 4

# User agent que identifica o projeto
USER_AGENT = "SeLiga/0.1.0"
#USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36'

# Isso faz com que o scrapy obedeça as regras de "robots.txt"
ROBOTSTXT_OBEY = True

# Limita o número de requisições concorrentes
CONCURRENT_REQUESTS_PER_DOMAIN = 8

# Delay para não sobrecarregar servidor
# Ainda estou decidindo o valor exato
DOWNLOAD_DELAY = 3

# Disable cookies (enabled by default)
#COOKIES_ENABLED = False

# Disable Telnet Console (enabled by default)
#TELNETCONSOLE_ENABLED = False

# isso configura a linguagem do web scrapping para pt-BR
# user agent definido para evitar que o website nos veja como um bot
DEFAULT_REQUEST_HEADERS = {
    "Accept-Language": "pt-BR",
    "User-Agent": "Mozilla/5.0"
}

# Enable or disable spider middlewares
# See https://docs.scrapy.org/en/latest/topics/spider-middleware.html
#SPIDER_MIDDLEWARES = {
#    "spiders.middlewares.SpidersSpiderMiddleware": 543,
#}

# Enable or disable downloader middlewares
# See https://docs.scrapy.org/en/latest/topics/downloader-middleware.html
#DOWNLOADER_MIDDLEWARES = {
#    "spiders.middlewares.SpidersDownloaderMiddleware": 543,
#}

# Enable or disable extensions
# See https://docs.scrapy.org/en/latest/topics/extensions.html
#EXTENSIONS = {
#    "scrapy.extensions.telnet.TelnetConsole": None,
#}

# Configure item pipelines
# See https://docs.scrapy.org/en/latest/topics/item-pipeline.html
ITEM_PIPELINES = {
    "spiders.pipelines.MongoPipeline": 300,
}

# Enable and configure the AutoThrottle extension (disabled by default)
# See https://docs.scrapy.org/en/latest/topics/autothrottle.html
#AUTOTHROTTLE_ENABLED = True
# The initial download delay
#AUTOTHROTTLE_START_DELAY = 5
# The maximum download delay to be set in case of high latencies
#AUTOTHROTTLE_MAX_DELAY = 60
# The average number of requests Scrapy should be sending in parallel to
# each remote server
#AUTOTHROTTLE_TARGET_CONCURRENCY = 1.0
# Enable showing throttling stats for every response received:
#AUTOTHROTTLE_DEBUG = False

# Enable and configure HTTP caching (disabled by default)
# See https://docs.scrapy.org/en/latest/topics/downloader-middleware.html#httpcache-middleware-settings
#HTTPCACHE_ENABLED = True
#HTTPCACHE_EXPIRATION_SECS = 0
#HTTPCACHE_DIR = "httpcache"
#HTTPCACHE_IGNORE_HTTP_CODES = []
#HTTPCACHE_STORAGE = "scrapy.extensions.httpcache.FilesystemCacheStorage"

# Set settings whose default value is deprecated to a future-proof value
FEED_EXPORT_ENCODING = "utf-8"

#define o Pipeline de Itens (ITEM_PINELINES) que o Scrapy deve usar. 
# Pipeline de Itens processa os dados (chamados Items) depois que eles são extraídos pelo spider.
ITEM_PIPELINES = {
    'spiders.pipelines.MongoDBPipeline': 300, 
    #código do pipeline está no arquivo pipelines.py dentro da pasta spiders, e o nome da classe é MongoDBPipeline.
    # 300: É um valor numérico que define a ordem de execução do pipeline.O valor pode ir de 0 a 1000. Pipelines com números menores são executados primeiro. Como este é o único pipeline listado e o valor padrão para a maioria é 300, ele será o primeiro (e único) a ser executado.   
}

# endereço de conexão (URI) do servidor MongoDB:
MONGO_URI = "mongodb+srv://erickrguara_db_user:<squad5Seliga2025#>@cluster0.jia9stf.mongodb.net/?appName=Cluster0"
#nome do banco de dados dentro do MongoDB onde as notícias serão salvas.
MONGO_DATABASE = "DadosSeLIga"                
