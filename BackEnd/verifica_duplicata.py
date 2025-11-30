import pymongo
import os
import json
import time
from dotenv import load_dotenv
import google.generativeai as genai
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# embeddings usa vetor numerico
# usa filtro rapido primeiro com embeddings e depois confirma com LLM Gemini
# compara os pares usando similaridade coseno e os que parecem mais de 75 % vao para o llm do gemini
# Gemini compara se o mesmo evento ou assunto e retorna se sao duplicadas ou nao


load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

mongo_client = pymongo.MongoClient(os.getenv("MONGO_URI"))
db = mongo_client["DadosSeLIga"]
noticias_collection = db["Dados"]

model = genai.GenerativeModel('gemini-2.0-flash-lite')


def gerar_embedding(texto):
    try:
        time.sleep(1) 
        result = genai.embed_content(
            model="models/text-embedding-004",
            content=texto,
            task_type="retrieval_document"
        )
        return result['embedding']
    except Exception as e:
        print(f"   [ERRO] Falha ao gerar embedding: {e}")
        return None


def comparar_noticias_com_llm(noticia1, noticia2):
    try:
        time.sleep(2) 
        texto1_resumido = noticia1['texto'][:800] if len(noticia1['texto']) > 800 else noticia1['texto']
        texto2_resumido = noticia2['texto'][:800] if len(noticia2['texto']) > 800 else noticia2['texto']
        
        prompt = f"""
        Você é um especialista em identificar notícias duplicadas.
        
        Notícia 1:
        Título: {noticia1['titulo']}
        Fonte: {noticia1.get('fonte', 'Desconhecida')}
        Texto: {texto1_resumido}
        
        Notícia 2:
        Título: {noticia2['titulo']}
        Fonte: {noticia2.get('fonte', 'Desconhecida')}
        Texto: {texto2_resumido}
        
        IMPORTANTE: Duas notícias são DUPLICADAS se:
        - Falam sobre o MESMO EVENTO específico
        - Têm o MESMO ASSUNTO principal e detalhes similares
        - Uma é republicação ou cópia da outra
        
        NÃO são duplicadas se:
        - São sobre temas similares mas eventos diferentes
        - São da mesma categoria mas com fatos distintos
        
        Analise se essas duas notícias são DUPLICADAS.
        
        Retorne APENAS um JSON válido (sem ```json):
        {{
            "sao_duplicadas": true ou false,
            "confianca": número de 0 a 100,
            "razao": "breve explicação em até 100 caracteres"
        }}
        """
        
        response = model.generate_content(prompt)
        resposta_texto = response.text.strip().replace("```json", "").replace("```", "").strip()
        resultado = json.loads(resposta_texto)
        
        return resultado
        
    except Exception as e:
        print(f"   [ERRO] Falha na análise LLM: {e}")
        return {"sao_duplicadas": False, "confianca": 0, "razao": "Erro na análise"}


def detectar_duplicadas_em_lote(noticias, limiar_embedding=0.75, limiar_confianca=75):
    """
    Detecta duplicatas em um lote específico de notícias.
    """
    total_noticias = len(noticias)
    
    if total_noticias < 2:
        return []
    
    embeddings = []
    noticias_validas = []
    
    print(f" Processando {total_noticias} notícias...")
    
    for idx, noticia in enumerate(noticias, 1):
        print(f"   [{idx}/{total_noticias}] Gerando embedding...")
        texto_completo = f"{noticia['titulo']} {noticia['texto']}"
        embedding = gerar_embedding(texto_completo)
        
        if embedding:
            embeddings.append(embedding)
            noticias_validas.append(noticia)
    
    candidatos = []
    
    for i in range(len(noticias_validas)):
        for j in range(i + 1, len(noticias_validas)):
            similaridade = cosine_similarity([embeddings[i]], [embeddings[j]])[0][0]
            
            if similaridade >= limiar_embedding:
                candidatos.append({
                    "noticia1": noticias_validas[i],
                    "noticia2": noticias_validas[j],
                    "similaridade_embedding": float(similaridade)
                })
    
    if len(candidatos) == 0:
        print("\n Nenhum candidato a duplicata encontrado (similaridade < 75%)")
        return []
    
    print(f"\n🔍 Analisando {len(candidatos)} pares candidatos com LLM...")
    duplicatas_confirmadas = []
    
    for idx, candidato in enumerate(candidatos, 1):
        print(f"   [{idx}/{len(candidatos)}] Comparando com LLM...")
        noticia1 = candidato['noticia1']
        noticia2 = candidato['noticia2']
        
        resultado_llm = comparar_noticias_com_llm(noticia1, noticia2)
        
        if resultado_llm['sao_duplicadas'] and resultado_llm['confianca'] >= limiar_confianca:
            duplicatas_confirmadas.append({
                "noticia1_id": str(noticia1['_id']),
                "noticia2_id": str(noticia2['_id']),
                "noticia1_titulo": noticia1['titulo'],
                "noticia2_titulo": noticia2['titulo'],
                "noticia1_fonte": noticia1.get('fonte', 'Desconhecida'),
                "noticia2_fonte": noticia2.get('fonte', 'Desconhecida'),
                "similaridade_embedding": candidato['similaridade_embedding'],
                "confianca_llm": resultado_llm['confianca'],
                "razao": resultado_llm['razao']
            })
    
    return duplicatas_confirmadas


def remover_duplicatas_do_banco(duplicatas):
    """
    Remove as notícias duplicadas do banco de dados.
    Mantém a primeira notícia e remove a segunda.
    """
    if not duplicatas:
        return 0
    
    ids_para_remover = []
    for dup in duplicatas:
        # Remove a noticia2 (mantém a noticia1)
        ids_para_remover.append(dup['noticia2_id'])
    
    try:
        from bson.objectid import ObjectId
        ids_obj = [ObjectId(id_str) for id_str in ids_para_remover]
        resultado = noticias_collection.delete_many({"_id": {"$in": ids_obj}})
        print(f"\n  {resultado.deleted_count} notícias duplicadas removidas do banco de dados")
        return resultado.deleted_count
    except Exception as e:
        print(f"\n Erro ao remover duplicatas: {e}")
        return 0


def salvar_resultado(duplicatas, arquivo_saida="duplicatas_encontradas.json"):
    try:
        with open(arquivo_saida, 'w', encoding='utf-8') as f:
            json.dump(duplicatas, f, ensure_ascii=False, indent=2)
        print(f"\n Resultados salvos em: {arquivo_saida}")
    except Exception as e:
        print(f"\n Erro ao salvar arquivo: {e}")


if __name__ == "__main__":
    print("\n Iniciando verificação de duplicatas em lote...")
    print("  Configurações: lote=50 notícias, similaridade>=75%, confiança>=75%\n")
    
    # Contar total de notícias no banco
    total_banco = noticias_collection.count_documents({})
    print(f"📚 Total de notícias no banco: {total_banco}\n")
    
    lote_tamanho = 50
    offset = 0
    lote_numero = 1
    total_duplicatas_encontradas = 0
    todas_duplicatas = []
    
    while offset < total_banco:
        print(f"\n{'='*60}")
        print(f" Processando LOTE {lote_numero} (notícias {offset+1} a {min(offset+lote_tamanho, total_banco)})")
        print(f"{'='*60}\n")
        
        # Buscar lote de notícias
        noticias_lote = list(noticias_collection.find({}).skip(offset).limit(lote_tamanho))
        
        if len(noticias_lote) < 2:
            print("  Lote com menos de 2 notícias, pulando...")
            break
        
        # Processar lote (passando as notícias diretamente)
        duplicatas = detectar_duplicadas_em_lote(noticias_lote, limiar_embedding=0.75, limiar_confianca=75)
        
        if duplicatas:
            print(f"\n Lote {lote_numero}: {len(duplicatas)} duplicatas encontradas")
            for idx, dup in enumerate(duplicatas, 1):
                print(f"  {idx}. {dup['noticia1_titulo'][:60]}... ({dup['noticia1_fonte']})")
                print(f"     {dup['noticia2_titulo'][:60]}... ({dup['noticia2_fonte']})")
            
            todas_duplicatas.extend(duplicatas)
            total_duplicatas_encontradas += len(duplicatas)
            
            # Remover duplicatas do banco
            remover_duplicatas_do_banco(duplicatas)
        else:
            print(f"\n Lote {lote_numero}: Nenhuma duplicata encontrada")
        
        offset += lote_tamanho
        lote_numero += 1
        
        # Pequena pausa entre lotes
        if offset < total_banco:
            print("\n⏸  Aguardando 3 segundos antes do próximo lote...")
            time.sleep(3)
    
    # Resumo final
    print(f"\n\n{'='*60}")
    print(" RESUMO FINAL")
    print(f"{'='*60}")
    print(f"Total de duplicatas encontradas: {total_duplicatas_encontradas}")
    print(f"Total de lotes processados: {lote_numero - 1}")
    
    if todas_duplicatas:
        salvar_resultado(todas_duplicatas, "todas_duplicatas_encontradas.json")
    
    print("\n Processamento concluído!\n")