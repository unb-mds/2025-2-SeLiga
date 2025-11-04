# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface
from itemadapter import ItemAdapter
import pymongo

class SpidersPipeline:
    def process_item(self, item, spider):
        return item
        
#AUTOMATIZAR O ARMAZENAMENTO DE NOTICIAS COLETADAS NO BANDO DE DADOS:
class MongoDBPipeline:
    #O init vai definir o que será guardado ao criar o pipeline
    def __init__(self, mongo_uri, mongo_db):
        # Endereço do servidor do mongoDB,    "uri" é uma string de conexao que conecta o scrapy ao mongo
        #mongo_uri é uma nomenclatura padrao da biblioteca pymongo
        self.mongo_uri = mongo_uri
        # Nome do banco de dados onde as notícias serão salvas
        self.mongo_db = mongo_db

# Método especial usado pelo Scrapy para criar o pipeline com base nas configurações do settings.py
    @classmethod
    def from_crawler(cls, crawler):
        # Retorna uma instância da classe passando os valores definidos no settings.py
        return cls(
            #Essa linha busca no arquivo settings.py a configuração chamada MONGO_URI,
            # armazena o valor encontrado na variável mongo_uri.
            mongo_uri=crawler.settings.get('MONGO_URI'),
            #essa linha faz a mesma coisa, mas agora busca a variável MONGO_DATABASE, que é o nome do banco dentro do MongoDB.
            mongo_db=crawler.settings.get('MONGO_DATABASE')
        )

# É executado automaticamente quando a spider é aberta
    # (ou seja, antes de começar a coletar)
    def open_spider(self, spider):
        # Cria uma conexão com o servidor MongoDB
        self.client = pymongo.MongoClient(self.mongo_uri)
        # Acessa o banco de dados especificado
        self.db = self.client[self.mongo_db]
        # Define a coleção (tabela) onde os dados serão armazenados
        self.collection = self.db['noticias']


    # É executado automaticamente quando a spider termina
    def close_spider(self, spider):
        # Fecha a conexão com o Mongo
        self.client.close()


    # Essa função é chamada para cada item que a spider coleta
    def process_item(self, item, spider):
        # Usa o ItemAdapter para acessar os campos do item
        adapter = ItemAdapter(item)
        # Pega a URL da notícia, vamos usar pra evitar duplicadas
        url = adapter.get('url')

        # Verifica se já existe uma notícia com essa URL no banco
        if not self.collection.find_one({'url': url}):
            # Se não existir, insere o item convertido em dicionário
            self.collection.insert_one(dict(adapter))
            # Mostra no log que a notícia foi inserida com sucesso
            spider.logger.info(f"Notícia inserida: {adapter.get('titulo')}")
        else:
            # Caso já exista, exibe aviso no log e não insere de novo
            spider.logger.info(f"Notícia duplicada ignorada: {url}")


        # Retorna o item
        return item



