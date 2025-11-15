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
            raise ValueError("MONGO_URI não foi definida. Defina a variável de ambiente.")

        # Variáveis de estado da conexão
        self.client = None
        self.db = None

    def open_spider(self, spider):
        
        try:
            self.client = pymongo.MongoClient(self.mongo_uri)
            self.db = self.client[self.mongo_db]
            log.info(f"Conectado ao MongoDB: {self.mongo_db}")
        except pymongo.errors.ConfigurationError as e:
            log.error(f"Erro ao conectar no MongoDB (verifique a URI): {e}")
            raise

    def close_spider(self, spider):
        
        if self.client:
            self.client.close()
            log.info("Conexão com o MongoDB fechada.")

    def process_item(self, item, spider):
                
        # Verifica se o item é do tipo NoticiaItem 
        if isinstance(item, NoticiaItem):
            try:
                # Insere o item (convertido para dict) na collection "noticias"
                self.db[self.collection_name].insert_one(dict(item))
                log.debug(f"Item salvo na collection '{self.collection_name}'")
            except Exception as e:
                log.error(f"Erro ao salvar item no MongoDB: {e}")
        
        return item