
import pymongo  
import os  
import json  
import datetime  
from dotenv import load_dotenv  
import logging  
import sys
from ddgs import DDGS  


os.environ['GRPC_VERBOSITY'] = 'ERROR'
os.environ['GRPC_TRACE'] = ''

logging.getLogger('grpc').setLevel(logging.ERROR)
logging.getLogger('absl').setLevel(logging.ERROR)


def suppress_stderr():
    import contextlib
    
    @contextlib.contextmanager
    def _redirect():
        original_stderr_fd = sys.stderr.fileno()
        saved_stderr_fd = os.dup(original_stderr_fd)
        
        try:
            devnull_fd = os.open(os.devnull, os.O_WRONLY)
            os.dup2(devnull_fd, original_stderr_fd)
            os.close(devnull_fd)
            yield
        finally:
            os.dup2(saved_stderr_fd, original_stderr_fd)
            os.close(saved_stderr_fd)
    
    return _redirect()

with suppress_stderr():
    import google.generativeai as genai

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

mongo_client = pymongo.MongoClient(os.getenv("MONGO_URI"))
db = mongo_client["DadosSeLIga"]
noticias_collection = db["Dados"]

model = genai.GenerativeModel('gemini-2.5-flash')  


def buscar_noticias_relacionadas(titulo, texto):
    try:
        print(f"   Buscando informações sobre: {titulo[:60]}...")
        

        sites_confiaveis = ['g1.globo.com', 'cnnbrasil.com.br', 'folha.uol.com.br', 
                           'uol.com.br', 'estadao.com.br', 'oglobo.globo.com',
                           'r7.com', 'band.uol.com.br', 'metropoles.com']
        
        noticias_encontradas = []
        fontes_utilizadas = set()
        
        ddgs = DDGS()
        
        print(f"   Buscando em todos os portais...")
        
        try:
            sites_query = "site:g1.globo.com OR site:cnnbrasil.com.br OR site:metropoles.com OR site:oglobo.globo.com OR site:folha.uol.com.br OR site:uol.com.br OR site:estadao.com.br OR site:r7.com OR site:band.uol.com.br"
            query_completa = f"{titulo} ({sites_query})"
            
            resultados = ddgs.text(
                query_completa,
                region='br-pt',
                safesearch='off',
                max_results=15,
                backend='api'
            )
            
            for resultado in resultados:
                url = resultado.get('href', '').lower()
                
                if any(site in url for site in sites_confiaveis):
                    if not any(n['url'] == resultado.get('href', '') for n in noticias_encontradas):
                        noticias_encontradas.append({
                            'titulo': resultado.get('title', ''),
                            'descricao': resultado.get('body', ''),
                            'url': resultado.get('href', '')
                        })
                        
                        for site in sites_confiaveis:
                            if site in url:
                                fontes_utilizadas.add(site)
                                break
            
            if len(noticias_encontradas) > 0:
                print(f"   [OK] Fase 1: {len(noticias_encontradas)} resultados de {len(fontes_utilizadas)} sites")
        except Exception as e:
            print(f"   [AVISO] Busca ampla falhou: {str(e)[:50]}")
        
        sites_principais = [
            ('g1.globo.com', 'G1'),
            ('cnnbrasil.com.br', 'CNN'),
            ('metropoles.com', 'Metrópoles'),
            ('oglobo.globo.com', 'O Globo')
        ]
        
        for site_url, site_nome in sites_principais:
            if site_url in fontes_utilizadas or len(noticias_encontradas) >= 12:
                continue
            
            try:
                print(f"   Verificando {site_nome}...")
                query_site = f"site:{site_url} {' '.join(titulo.split()[:6])}"
                
                resultados_site = ddgs.text(
                    query_site,
                    region='br-pt',
                    safesearch='off',
                    max_results=3,
                    backend='api'
                )
                
                encontrou_neste_site = False
                for resultado in resultados_site:
                    url = resultado.get('href', '').lower()
                    
                    if site_url in url:
                        if not any(n['url'] == resultado.get('href', '') for n in noticias_encontradas):
                            noticias_encontradas.append({
                                'titulo': resultado.get('title', ''),
                                'descricao': resultado.get('body', ''),
                                'url': resultado.get('href', '')
                            })
                            fontes_utilizadas.add(site_url)
                            encontrou_neste_site = True
                
                if encontrou_neste_site:
                    print(f"   [OK] Encontrado em {site_nome}")
            except Exception as e:
                print(f"   [AVISO] Busca em {site_nome} falhou: {str(e)[:50]}")
                continue
        
        if fontes_utilizadas:
            print(f"   Fontes: {', '.join(list(fontes_utilizadas)[:3])}")
        else:
            print(f"   [AVISO] Nenhum resultado encontrado em sites confiáveis")
        
        return noticias_encontradas, list(fontes_utilizadas)
    
    except Exception as e:
        print(f"   [ERRO] Erro ao buscar notícias: {e}")
        return [], []


def criar_prompt_verificacao(titulo, texto, noticias_encontradas=None, fontes=None):
    prompt = f"""
    Você é um especialista em checagem de fatos e jornalismo investigativo. 
    
    Notícia a ser verificada:
    - Título: "{titulo}"
    - Texto: "{texto}"
    
    IMPORTANTE - CONTEXTO DE ABREVIAÇÕES COMUNS:
    - MS pode significar "Ministério da Saúde" (mais comum em notícias de saúde)
    - MS também pode ser "Mato Grosso do Sul" (estado brasileiro)
    - Analise o CONTEXTO para identificar qual significado se aplica
    - Se a notícia fala de hospitais, saúde, SUS → provavelmente é "Ministério da Saúde"
    """
    
    if noticias_encontradas and len(noticias_encontradas) > 0:
        prompt += f"""

    ═══════════════════════════════════════════════════════════════════════════
    RESULTADOS DE BUSCA ENCONTRADOS ({len(noticias_encontradas)} fontes diferentes)
    ═══════════════════════════════════════════════════════════════════════════
    
    [ATENÇÃO] VOCÊ DEVE LER E ANALISAR IGUALMENTE TODAS AS {len(noticias_encontradas)} FONTES ABAIXO:
    NÃO DÊ PRIORIDADE A NENHUMA FONTE - TODAS SÃO IGUALMENTE IMPORTANTES!
    
"""
        for idx, noticia in enumerate(noticias_encontradas[:10], 1):
            url_lower = noticia['url'].lower()
            fonte_identificada = "Fonte"
            if 'g1.globo.com' in url_lower:
                fonte_identificada = "G1"
            elif 'cnnbrasil.com.br' in url_lower:
                fonte_identificada = "CNN Brasil"
            elif 'metropoles.com' in url_lower:
                fonte_identificada = "Metrópoles"
            elif 'oglobo.globo.com' in url_lower:
                fonte_identificada = "O Globo"
            elif 'folha.uol.com.br' in url_lower:
                fonte_identificada = "Folha de S.Paulo"
            elif 'uol.com.br' in url_lower:
                fonte_identificada = "UOL"
            elif 'estadao.com.br' in url_lower:
                fonte_identificada = "Estadão"
            elif 'r7.com' in url_lower:
                fonte_identificada = "R7"
                
            prompt += f"""
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    FONTE {idx}: {fonte_identificada}
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    URL: {noticia['url']}
    Título: {noticia['titulo']}
    Conteúdo: {noticia['descricao'][:300]}...
    
"""
    
    prompt += f"""

    ═══════════════════════════════════════════════════════════════════════════
    INSTRUÇÕES OBRIGATÓRIAS PARA ANÁLISE
    ═══════════════════════════════════════════════════════════════════════════
    
    {'[ATENÇÃO CRÍTICA] Você DEVE ler e analisar TODAS AS ' + str(len(noticias_encontradas)) + ' FONTES listadas acima com O MESMO PESO E IMPORTÂNCIA!' if noticias_encontradas else 'ATENÇÃO: Não foram encontradas notícias relacionadas em sites confiáveis. Use apenas seu conhecimento.'}
    
    {'TODAS as fontes têm o mesmo valor! Não priorize G1, CNN ou qualquer outra. Analise TODAS igualmente!' if noticias_encontradas else ''}
    
    PROCESSO DE ANÁLISE - TODAS AS FONTES TÊM O MESMO PESO:
    
    COMO ANALISAR CORRETAMENTE (SEM PRIORIDADE):
    
    ETAPA 1: Leia CADA uma das fontes acima, uma por uma
    ETAPA 2: Para CADA fonte, anote o que ela diz sobre:
       - O evento principal da notícia
       - Detalhes específicos (números, datas, causas, nomes)
       - Qualquer informação adicional ou contraditória
    ETAPA 3: Após ler TODAS as fontes, faça o cruzamento:
       - Quantas fontes confirmam o evento principal? Liste TODAS
       - Quantas fontes confirmam cada detalhe? Liste TODAS
       - Alguma fonte contradiz? Liste qual e o que contradiz
    ETAPA 4: Baseie sua decisão no CONSENSO das fontes:
       - Se MAIORIA das fontes confirma = provavelmente verdadeiro
       - Se fontes DISCORDAM entre si = provavelmente inconclusivo
       - Se NENHUMA fonte confirma = provavelmente falso
    
     REGRA DE OURO: TODAS as fontes contam igualmente!
       Não importa se é G1, CNN, Metrópoles, Band ou qualquer outra.
       O que importa é o CONSENSO entre TODAS as fontes.
    
    REGRAS DE ANÁLISE DETALHADA:
    
    [CORRETO] COMO ANALISAR CORRETAMENTE (TODAS AS FONTES IGUALMENTE):
    1. Leia o conteúdo de CADA UMA das fontes listadas acima
    2. Não dê mais importância para G1, CNN ou qualquer outra específica
    3. Para CADA fonte, anote mentalmente:
       - Ela confirma o evento principal da notícia?
       - Ela confirma os detalhes específicos (números, datas, causas)?
       - Ela menciona algo que contradiz a notícia?
    4. Depois de ler TODAS as fontes, identifique QUAIS SITES confirmam:
       - Extraia o NOME DO SITE de cada fonte (G1, CNN, Metrópoles, O Globo, etc.)
       - Agrupe por site: se há 3 artigos do G1, conte como "G1"
       - Liste apenas os NOMES dos sites, não os números das fontes
    5. SEMPRE mencione na justificativa:
       - "Confirmado por: [NOMES dos sites - G1, CNN, Metrópoles]" (sem números!)
       - "Não confirmado por: [NOMES dos sites]" (sem números!)
       - Não use "FONTE 1, FONTE 2" - use apenas nomes dos sites
       
    [ERRADO] NÃO FAÇA ISSO:
    - [X] Não use números de fonte na justificativa (ex: "fontes 1,2,3")
    - [X] Não leia apenas a primeira fonte e pare
    - [X] Não dê mais peso para G1 ou CNN
    - [X] Não ignore fontes como Band, R7, Metrópoles, etc.
    - [X] Não repita o mesmo site várias vezes (se há 3 artigos do G1, mencione "G1" uma vez)
    
    EXEMPLO DE ANÁLISE CORRETA:
    [OK] CERTO: "Confirmado por G1, CNN, Metrópoles e O Globo" (Confiança: 85%, 4 portais = Verdadeira)
    [OK] CERTO: "Confirmado por G1 e CNN" (Confiança: 70%, 2 portais = Verdadeira)
    [DUVIDOSO] CERTO: "Evento confirmado por G1 e CNN. Causa não mencionada" (Confiança: 60%, 2 portais = Duvidosa)
    [INCONCLUSIVO] CERTO: "Encontrado apenas no Metrópoles. Sem confirmação de outras fontes" (1 portal = Inconclusiva)
    [FALSO] CERTO: "Não confirmado por G1, CNN e Folha" (Confiança: 20%, 3 portais = Falsa)
    [X] ERRADO: "Confirmado por fontes 1,2,4,6,8" (NÃO use números!)
    [X] ERRADO: "Confirmado por G1, G1, G1, CNN" (NÃO repita o mesmo site!)
     
    SISTEMA DE CONFIANÇA OBRIGATÓRIO:
    - CONFIANÇA ≥ 70% E em 2+ portais → Classificação OBRIGATÓRIA: "Verdadeira"
    - CONFIANÇA 50-69% → Classificação OBRIGATÓRIA: "Duvidosa"  
    - CONFIANÇA < 50% → Classificação OBRIGATÓRIA: "Falsa"
    - Notícia em APENAS 1 PORTAL → Classificação OBRIGATÓRIA: "Inconclusiva"

    CRITÉRIOS PARA CLASSIFICAÇÃO (BASEADO NA CONFIANÇA PERCENTUAL):

    [VERDADEIRA] "Verdadeira" - CONFIANÇA IGUAL OU ACIMA DE 70% E EM 2+ PORTAIS: 
       - A MAIORIA dos sites confirma os fatos principais
       - Consenso forte entre as fontes (70% ou mais concordam)
       - Confirmado por PELO MENOS 2 portais diferentes
       - Mencione os NOMES dos sites que confirmaram (sem números!)
       - Exemplo: "Confirmado por G1, CNN, Metrópoles e O Globo"
       - Não há distorções ou exageros significativos
    
    [FALSA] "Falsa" - CONFIANÇA ABAIXO DE 50%: 
       - A MAIORIA dos sites contradiz ou não menciona os fatos
       - Consenso fraco ou inexistente (menos de 50% confirmam)
       - Mencione os NOMES dos sites (sem números!)
       - Exemplo: "Não confirmado por G1, CNN e Folha"
       - Informações completamente inventadas ou sem base na maioria das buscas
    
    [DUVIDOSA] "Duvidosa" - CONFIANÇA ENTRE 50% E 69%: 
       - A notícia MISTURA fatos verdadeiros e falsos
       - Os sites DISCORDAM entre si (cerca de metade confirma, metade não)
       - Consenso moderado mas não conclusivo (entre 50% e 69%)
       - Exemplo: "Confirmado por G1 e CNN. Porém, causa específica não mencionada por nenhum site"
       - Mencione os NOMES de todos os sites (sem números!)
       - Não há consenso claro entre os sites
    
    [INCONCLUSIVA] "Inconclusiva" - NOTÍCIA EM APENAS 1 PORTAL:
       - A notícia foi encontrada em APENAS UM portal de notícias
       - Não há confirmação de outros veículos
       - Exemplo: "Encontrado apenas no Metrópoles. Sem confirmação de outras fontes"
       - SEMPRE classifique como "Inconclusiva" se houver apenas 1 portal
       - Mencione qual portal único publicou
       
    REGRA CRÍTICA DE CLASSIFICAÇÃO:
    → Notícia em APENAS 1 PORTAL = SEMPRE classifique como "Inconclusiva" (independente da confiança)
    → Confiança ≥ 70% E em 2+ portais = SEMPRE classifique como "Verdadeira"
    → Confiança entre 50% e 69% = SEMPRE classifique como "Duvidosa"
    → Confiança < 50% = SEMPRE classifique como "Falsa"
       
    IMPORTANTE: Se a notícia tem PONTOS VERDADEIROS E PONTOS FALSOS, classifique como "Duvidosa" 
    e na justificativa SEPARE claramente:
    - [OK] Pontos verdadeiros: [liste os NOMES dos sites que confirmaram - sem números]
    - [X] Pontos falsos/não confirmados: [liste os NOMES dos sites ou diga "nenhum site menciona"]
    
    IMPORTANTE: Se a notícia aparece em APENAS 1 PORTAL, classifique como "Inconclusiva":
    - Exemplo: "Encontrado apenas no Metrópoles. Sem confirmação de G1, CNN ou outras fontes"

    Retorne um JSON válido:
    {{
      "classificacao": "Verdadeira", "Falsa", "Duvidosa" ou "Inconclusiva",
      "confianca_percentual": número de 0 a 100 baseado no CONSENSO entre sites,
      "justificativa": "Explicação objetiva de até 300 caracteres. Liste apenas NOMES DOS SITES (G1, CNN, Metrópoles, etc.) SEM NÚMEROS. Se apenas 1 portal, mencione 'Encontrado apenas em [NOME]'. Exemplo: 'Confirmado por G1, CNN e Metrópoles' ou 'Encontrado apenas no Metrópoles'",
      "fontes_consultadas": {fontes if fontes else '["Conhecimento de treinamento"]'}
    }}

    REGRAS FINAIS OBRIGATÓRIAS:
    - JSON válido e bem formatado
    - Justificativa máximo 300 caracteres
    - Liste apenas NOMES dos sites (G1, CNN, Metrópoles, O Globo, Folha, UOL, etc.)
    - NÃO use números de fonte (ex: "fonte 1, 2, 3")
    - NÃO repita o mesmo site várias vezes
    - ANALISE TODAS as fontes com O MESMO PESO - não priorize nenhuma
    - Seja claro e objetivo: "Confirmado por G1, CNN e Folha" em vez de contagens numéricas
    
    [REGRA CRÍTICA] CLASSIFICAÇÃO AUTOMÁTICA:
    • PASSO 1: Conte quantos PORTAIS DIFERENTES mencionam a notícia
    • Se APENAS 1 PORTAL → classificacao DEVE SER "Inconclusiva" (SEMPRE!)
    • Se 2+ PORTAIS e confiança ≥ 70% → classificacao DEVE SER "Verdadeira"
    • Se 2+ PORTAIS e confiança 50-69% → classificacao DEVE SER "Duvidosa"
    • Se 2+ PORTAIS e confiança < 50% → classificacao DEVE SER "Falsa"
    
    Não adicione texto antes ou depois do JSON
    """
    return prompt


def verificar_noticias_pendentes():
    noticias_pendentes = list(noticias_collection.find({"status_verificacao": "pendente"}))

    if not noticias_pendentes:
        print("Nenhuma notícia pendente encontrada. Tudo em dia!")
        return  

    print("=" * 80)
    print(f"Encontradas {len(noticias_pendentes)} notícia(s) pendente(s) para verificação")
    print("=" * 80)

    verificadas_com_sucesso = 0
    verificadas_com_erro = 0  

    for i, noticia_para_verificar in enumerate(noticias_pendentes, 1):
        print(f"\n[{i}/{len(noticias_pendentes)}] Verificando: '{noticia_para_verificar['titulo']}'")
        print("-" * 80)

        try:  
            noticias_encontradas, fontes = buscar_noticias_relacionadas(
                noticia_para_verificar['titulo'],
                noticia_para_verificar['texto']
            )
            
            prompt = criar_prompt_verificacao(
                noticia_para_verificar['titulo'],
                noticia_para_verificar['texto'],
                noticias_encontradas,
                fontes
            )
            response = model.generate_content(prompt)
            
            resposta_texto = response.text.strip().replace("```json", "").replace("```", "").strip()
            
            try:
                resultado_json = json.loads(resposta_texto)
            except json.JSONDecodeError as json_error:
                print(f"   [AVISO] Resposta com JSON inválido, tentando novamente...")
                response = model.generate_content(prompt)
                resposta_texto = response.text.strip().replace("```json", "").replace("```", "").strip()
                resultado_json = json.loads(resposta_texto)
            
            noticias_collection.update_one(
                {"_id": noticia_para_verificar["_id"]},
                {
                    "$set": {  
                        "status_verificacao": "verificado", 
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
            
            print(f"[OK] Classificação: {resultado_json.get('classificacao')}")
            print(f"   Confiança: {resultado_json.get('confianca_percentual')}%")
            print(f"   Justificativa: {resultado_json.get('justificativa')}")
             
            fontes_resultado = resultado_json.get('fontes_consultadas', [])
            if fontes_resultado:
                print(f"   Fontes consultadas:")
                for fonte in fontes_resultado:
                    print(f"      - {fonte}")
            else:
                print(f"   Fontes consultadas: Nenhuma fonte específica mencionada")
            
            verificadas_com_sucesso += 1

        except Exception as e:
            print(f"[ERRO] ERRO ao verificar esta notícia: {e}")
            
            if 'response' in locals():
                print(f"   Resposta recebida do Gemini:")
                print(f"   {response.text[:500]}")
                print(f"\n   Tentando salvar resposta completa para análise...")
                noticias_collection.update_one(
                    {"_id": noticia_para_verificar["_id"]},
                    {"$set": {
                        "status_verificacao": "erro",
                        "erro_detalhes": {
                            "mensagem": str(e),
                            "resposta_gemini": response.text,
                            "data_erro": datetime.datetime.now(datetime.timezone.utc)
                        }
                    }}
                )
            else:
                print(f"   O erro ocorreu antes mesmo de receber uma resposta do Gemini.")
                noticias_collection.update_one(
                    {"_id": noticia_para_verificar["_id"]},
                    {"$set": {"status_verificacao": "erro"}}
                )
            
            verificadas_com_erro += 1

    print("\n" + "=" * 80)
    print("RESUMO DA VERIFICAÇÃO")
    print("=" * 80)
    print(f"[OK] Verificadas com sucesso: {verificadas_com_sucesso}")
    print(f"[ERRO] Verificadas com erro: {verificadas_com_erro}")
    print(f"Total processado: {len(noticias_pendentes)}")
    print("=" * 80)


if __name__ == "__main__":

    verificar_noticias_pendentes()  
