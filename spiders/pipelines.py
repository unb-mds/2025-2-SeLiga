import pymongo
import os
import logging
from spiders.items import NoticiaItem 

log = logging.getLogger(__name__)

class MongoPipeline:

    def __init__(self):
        # O pipeline vai tentar pegar a URI da variável de ambiente "MONGO_URI"
        # Isso é mais seguro para não colocar a senha no código
        self.mongo_uri = os.environ.get('MONGO_URI') 
        
        # Coloque o nome do seu banco de dados
        self.mongo_db = "DadosSeLIga" 
        
        self.collection_name = "Dados" 
        
        if not self.mongo_uri:
            raise ValueError("\n\nMONGO_URI não foi definida. Defina a variável de ambiente.\n\n")

        # Variáveis de estado da conexão
        self.client = None
        self.db = None

    def open_spider(self, spider):
        
        try:
            self.client = pymongo.MongoClient(self.mongo_uri)
            self.db = self.client[self.mongo_db]
            log.info(f"\n\nConectado ao MongoDB: {self.mongo_db}\n\n")
        except pymongo.errors.ConfigurationError as e:
            log.error(f"\n\nErro ao conectar no MongoDB (verifique a URI): {e}\n\n")
            raise

    def close_spider(self, spider):
        
        if self.client:
            self.client.close()
            log.info("\n\nConexão com o MongoDB fechada.\n\n")

    def process_item(self, item, spider):
                
        # Verifica se o item é do tipo NoticiaItem 
        if isinstance(item, NoticiaItem):
            try:
                # Insere o item (convertido para dict) na collection "noticias"
                self.db[self.collection_name].insert_one(dict(item))
                log.debug(f"I\n\ntem salvo na collection '{self.collection_name}'\n\n")
            except Exception as e:
                log.error(f"\n\nErro ao salvar item no MongoDB: {e}\n\n")
        
        return item
