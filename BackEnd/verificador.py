
# Lembre que junto com o verificador.py precisa do .env com a chave da API e o direcionamento para o banco de dados Mongo
# O arquivo .env deve conter as seguintes variáveis:
# GEMINI_API_KEY=<sua-chave-da-api-gemini>
# MONGO_URI=<sua-uri-de-conexao-mongodb>

import pymongo  
import os  
import json  
import datetime  
from dotenv import load_dotenv  
import logging  
import sys  


# Aqui dizemos pro sistema: "Só me mostra erros GRAVES, o resto eu não quero saber"
os.environ['GRPC_VERBOSITY'] = 'ERROR'
os.environ['GRPC_TRACE'] = ''

# Aqui a gente fala pros sistemas de log do Python: "Relaxa aí, só me avisa se for MUITO sério"
logging.getLogger('grpc').setLevel(logging.ERROR)
logging.getLogger('absl').setLevel(logging.ERROR)



def suppress_stderr():
    """Essa função cria um 'silenciador' temporário para mensagens de erro."""
    import contextlib
    
    @contextlib.contextmanager
    def _redirect():
        # Guarda a "boca" original do sistema
        original_stderr_fd = sys.stderr.fileno()
        saved_stderr_fd = os.dup(original_stderr_fd)
        
        try:
            # Redireciona a "boca" pra um buraco negro (devnull = nada)
            devnull_fd = os.open(os.devnull, os.O_WRONLY)
            os.dup2(devnull_fd, original_stderr_fd)
            os.close(devnull_fd)
            yield
        finally:
            # Devolve a "boca" original pro sistema
            os.dup2(saved_stderr_fd, original_stderr_fd)
            os.close(saved_stderr_fd)
    
    return _redirect()

# Importa o gemini e não deixa ele reclamar de nada (Evitando erros bobos da propria api) 
with suppress_stderr():
    import google.generativeai as genai

# Pega as coisas do env como chave de api e etc 
load_dotenv()

# Fala pro Gemini qual é nossa chave de API 
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Conecta no banco de dados MongoDB
mongo_client = pymongo.MongoClient(os.getenv("MONGO_URI"))
db = mongo_client["DadosSeLIga"]  # Abre o banco chamado "DadosSeLIga"
noticias_collection = db["Dados"]  # Abre a gaveta "Dados" dentro do banco

# Escolhe qual IA vamos usar tendo varios modelos no site da API 2.5 flash vai atender bem as nossas necessidades
model = genai.GenerativeModel('gemini-2.5-flash')  


# Essa função cria a pergunta que vamos fazer pra IA.
# Explica direitinho pro Gemini o que ele tem que fazer.

def criar_prompt_verificacao(titulo, texto):
    """
    Cria a pergunta (prompt) que vamos mandar pro Gemini.
    
    É tipo fazer um pedido bem específico num restaurante:
    "Eu quero um hambúrguer, SEM picles, COM queijo extra, e me traz num prato azul!"
    
    Aqui a gente pede:
    - Analisa essa notícia aí
    - Me diz se é verdade ou fake
    - Me dá um número de 0 a 100 de quão certo você está
    - Explica o porquê
    - Me conta onde você pesquisou
    - E me responde TUDO em formato JSON (tipo um formulário organizadinho)
    """
    prompt = f"""
    Você é um especialista em checagem de fatos. Sua tarefa é analisar a veracidade da notícia abaixo.

    Notícia:
    - Título: "{titulo}"
    - Texto: "{texto}"

    Retorne sua análise em um objeto JSON com a seguinte estrutura:
    {{
      "classificacao": "Verdadeira", "Falsa" ou "Inconclusiva",
      "confianca_percentual": um número de 0 a 100,
      "justificativa": "Uma explicação curta e objetiva.",
      "fontes_consultadas": ["lista de fontes, sites, ou bases de conhecimento que você usou para fazer esta análise"]
    }}

    IMPORTANTE: Inclua no campo "fontes_consultadas" as fontes de informação, sites conhecidos, estudos, 
    ou bases de conhecimento que você considerou para fazer esta verificação.

    Não adicione nenhum texto antes ou depois do JSON.
    """
    return prompt


def verificar_noticias_pendentes():
    """
    Essa é a função principal! Ela faz TODO o trampo! 
    
    Pensa nela como uma linha de produção de fábrica:
    - Pega as notícias que tão esperando (as pendentes)
    - Passa cada uma pela "máquina de verificação" (o Gemini)
    - Coloca o resultado na caixa (banco de dados)
    - Te mostra quantas passaram e quantas deram problema
    """
    
    # PASSO 1: Procurar todas as notícias que tão esperando pra serem verificadas
    noticias_pendentes = list(noticias_collection.find({"status_verificacao": "pendente"}))

    # Se não tem nada pra verificar, a gente avisa e sai fora!
    if not noticias_pendentes:
        print("Nenhuma notícia pendente encontrada. Tudo em dia!")
        return  

    # Mostra um banner bonitão dizendo quantas notícias vamos verificar
    print("=" * 80)
    print(f"Encontradas {len(noticias_pendentes)} notícia(s) pendente(s) para verificação")
    print("=" * 80)

    # Vamos contar quantas deram certo e quantas deram errado
    verificadas_com_sucesso = 0
    verificadas_com_erro = 0  

    # PASSO 2: Agora vamos processar cada notícia, uma de cada vez

    for i, noticia_para_verificar in enumerate(noticias_pendentes, 1):
        print(f"\n[{i}/{len(noticias_pendentes)}] Verificando: '{noticia_para_verificar['titulo']}'")
        print("-" * 80)

        try:  
            
            # PASSO 3: Preparar a pergunta e mandar pro Gemini
            # Aqui a gente monta a pergunta usando aquela função que criamos lá em cima
            prompt = criar_prompt_verificacao(
                noticia_para_verificar['titulo'],  # O título da notícia
                noticia_para_verificar['texto']     # O texto completo
            )
            # Agora manda a pergunta pro Gemini e espera ele responder
            response = model.generate_content(prompt)
            
            # PASSO 4: Limpar e organizar a resposta que o Gemini mandou
            # Às vezes ele manda uns textos extras tipo "```json" que a gente não quer
            # Então a gente limpa isso tudo e transforma em algo que o Python entende
            resposta_texto = response.text.strip().replace("```json", "").replace("```", "")
            resultado_json = json.loads(resposta_texto)  
            # Transforma o texto em um dicionário Python
            
            # PASSO 5: Salvar o resultado no banco de dados
            # Aqui a gente atualiza a notícia no banco, colocando:
            # - Status como "verificado" (pra não verificar de novo)
            # - Todas as informações que o Gemini nos deu
            noticias_collection.update_one(
                {"_id": noticia_para_verificar["_id"]},  # Encontra a notícia pelo ID único
                {
                    "$set": {  
                        "status_verificacao": "verificado",  # Marca como verificado 
                        "verificacao": {
                            "classificacao": resultado_json.get("classificacao"),
                            "confianca_percentual": resultado_json.get("confianca_percentual"),
                            "justificativa": resultado_json.get("justificativa"),
                            "fontes_consultadas": resultado_json.get("fontes_consultadas", []),
                            "data_verificacao": datetime.datetime.now(datetime.timezone.utc)
                        }
                    }
                }
            )
            
            # PASSO 6: Mostrar o resultado na tela pra gente ver!
            print(f"✅ Classificação: {resultado_json.get('classificacao')}")
            print(f"   Confiança: {resultado_json.get('confianca_percentual')}%")
            print(f"   Justificativa: {resultado_json.get('justificativa')}")
            
            # Mostra as fontes que o Gemini usou 
            fontes = resultado_json.get('fontes_consultadas', [])
            if fontes:
                print(f"   Fontes consultadas:")
                for fonte in fontes:
                    print(f"      - {fonte}")
            else:
                print(f"   Fontes consultadas: Nenhuma fonte específica mencionada")
            
            verificadas_com_sucesso += 1

        # Se deu algum erro (a internet caiu, o Gemini bugou, etc.), cai aqui!
        except Exception as e:
            print(f"❌ ERRO ao verificar esta notícia: {e}")
            
            # Tenta mostrar o que o Gemini respondeu (se ele chegou a responder)
            if 'response' in locals():
                print(f"   Resposta recebida do Gemini:")
                print(f"   {response.text[:200]}...")  # Mostra só os primeiros 200 caracteres
            else:
                print(f"   O erro ocorreu antes mesmo de receber uma resposta do Gemini.")

            # Marca a notícia como "erro" no banco de dados
            # É tipo marcar na lista: "Essa aqui deu problema, olhar depois"
            noticias_collection.update_one(
                {"_id": noticia_para_verificar["_id"]},
                {"$set": {"status_verificacao": "erro"}}
            )
            
            verificadas_com_erro += 1

    print("\n" + "=" * 80)
    print("RESUMO DA VERIFICAÇÃO")
    print("=" * 80)
    print(f"✅ Verificadas com sucesso: {verificadas_com_sucesso}")
    print(f"❌ Verificadas com erro: {verificadas_com_erro}")
    print(f"📊 Total processado: {len(noticias_pendentes)}")
    print("=" * 80)


if __name__ == "__main__":
    verificar_noticias_pendentes()  