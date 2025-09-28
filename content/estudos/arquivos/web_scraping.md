---
title: "Web Scraping"
draft: false
url: "/estudos/arquivos/web_scraping"
---

---

## O que é Web Scraping?
`Web scraping` refere-se ao processo de extração(mineração) de conteúdo e dados de sites usando software. Nós devemos usar esta ferramenta para minerar as notícias dos jornais, para assim podermos usá-las. Por meio de scripts e robôs, essa metodologia permite a coleta, estruturação e análise de dados que não estão disponíveis via `APIs`.

No nosso caso, não precisamos tomar o cuidado com o uso "mal-intencionado" para dados sigilosos, pois nosso foco é o uso de dados públicos fornecidos pelos jornais. Mas devemos tomar o cuidado para não causarmos outro tipo de `web scraping` "mal-intencionado", que é o `"over-scraping"`, onde os scrapers enviam muitas solicitações em um determinado período. Muitas solicitações podem sobrecarregar os provedores de serviços de internet.

Nos casos mais simples, `web scraping` pode ser feita através de uma `API` de um site ou interface de programação de aplicativos. Quando um site disponibiliza sua `API`, os desenvolvedores web podem usá-la para extrair automaticamente dados e outras informações úteis em um formato conveniente.
É claro que nem sempre é assim, e muitos sites que se quer extrair não terão uma `API` que você possa usar. Além disso, mesmo os sites que têm uma `API` nem sempre fornecem dados no formato correto.
Como resultado, o `web scraping` é necessário apenas quando os dados da web que você quer não estão disponíveis na(s) forma(s) que você precisa. Seja porque os formatos que você quer não estão disponíveis, ou o site simplesmente não está fornecendo o escopo completo de dados, o `web scraping` torna possível obter o que você quer.
	
# Como funciona o Web Scraping?
Embora os métodos e ferramentas possam variar, tudo o que você precisa fazer é encontrar uma maneira de `(1)` navegar automaticamente no(s) site(s) de destino e `(2)` extrair os dados uma vez que estiver lá. Geralmente, essas etapas são realizadas com o uso de `scrapers` e `crawlers`.

## Scrapers e Crawlers
Podemos usar uma analogia para entender como funciona. Por exemplo, um cavalo e um arado: 

Assim como o cavalo guia o arado, o arado revira e fragmenta a terra, ajudando a abrir caminho para novas sementes enquanto reintegra plantas daninhas indesejadas e resíduos de culturas ao solo.
O `web scraping` não é muito diferente. Aqui, um `crawler` desempenha o papel do cavalo, guiando o `scraper` por nossos campos digitais. Logo, nosso scraper é nosso arado. 

* `Crawler` (às vezes conhecidos como `spiders`): Navega sistematicamente pela internet para indexar e descobrir páginas. Ele segue os hiperlinks de uma página para outra, mapeando a estrutura do site.
* `Scraper`: É a ferramenta que, uma vez em uma página específica, extrai os dados desejados do seu conteúdo `HTML`.


### Ferramentas Ideais para Minerar Conteúdo de Jornais
Para este projeto, a combinação de ferramentas precisa lidar com a complexidade dos portais de notícias modernos.
* `Scrapy`: É a ferramenta mais indicada para este cenário. Sua capacidade de gerenciar múltiplos crawlers de forma assíncrona é perfeita para monitorar dezenas de jornais simultaneamente. Ele pode ser configurado para revisitar sites periodicamente em busca de novos artigos.

* `Selenium ou Playwright`: Muitos portais de notícias carregam artigos dinamicamente ou possuem `"paywalls"` parciais que aparecem após a rolagem. O Selenium é essencial para simular o comportamento humano, rolar a página e garantir que todo o conteúdo do artigo seja carregado antes da extração.

* `Beautiful Soup` *(em conjunto com `Requests`)*: Para portais de notícias mais simples e com estrutura `HTML estática`, esta combinação é suficiente e mais rápida de implementar para extrair os dados de um único artigo.

* `Newspaper3k` *(Biblioteca Python)*: Uma biblioteca de alto nível construída especificamente para extração e curadoria de artigos de notícias. Com um simples `URL`, ela pode extrair automaticamente o título, autores, data de publicação e o texto principal, economizando muito tempo na fase de desenvolvimento do `scraper`.
	
---

# Processo de extração de dados Geral
Após a inicialização e preparação do ambiente de `Banco de Dados` deve-se:
1. Coletar `URLs` de artigos de notícias das páginas iniciais dos portais. Cada portal possui uma "aranha" implementada usando a `biblioteca Scrapy`, localizada no `spiders/diretório`.
2. Rastreamento (`Crawling`): O `crawler` navegará pelas seções principais dos jornais (ex: "Política", "Economia", "Mundo") para encontrar links para novos artigos. O objetivo é descobrir e listar os `URLs` das notícias publicadas.
3. Requisição e Parsing: Para cada `URL` de notícia, o scraper fará uma requisição `HTTP` para obter o conteúdo `HTML` da página.
4. Extração de Elementos-Chave: Esta é a etapa mais crítica. O scraper é programado para "ler" o `HTML` e extrair:
* *O Título da Notícia:* Geralmente encontrado em tags `<h1>` ou `<h2>`.
* *O Corpo do Texto:* O conteúdo principal do artigo, normalmente dentro de uma série de parágrafos `<p>`.
* *O Autor e a Data de Publicação:* Metadados essenciais para análise de credibilidade e contexto.
* *Links e Fontes Citadas:* Identificar links externos no corpo do texto pode ajudar a verificar as fontes da matéria.
* *Imagens e Legendas:* Podem ser usadas para busca reversa de imagens, uma técnica comum na checagem de fatos.
5. Armazenamento para Análise: Os dados extraídos (título, texto, autor, data, fonte) são salvos de forma estruturada (ex: em um `banco de dados` ou `JSON`), prontos para serem processados pelo seu sistema de classificação.

---

# Bibliotecas úteis para implementação

## requests
Essa é uma biblioteca `Python` para fazer requisições `HTTP` de forma simples e elegante. Ela não interpreta ou renderiza o `HTML`, apenas o busca no servidor e o entrega como texto puro.
		
Ela é o ponto de partida de quase todo projeto de `web scraping`. Sua função é "pedir" a uma página da web o seu conteúdo, exatamente como um navegador faz quando você digita um endereço. 
Deve ser usada o para obter o código-fonte `(HTML)` de qualquer página da web que seja estática (ou seja, que não precise de interações ou JavaScript para carregar seu conteúdo principal).

### Exemplo:
```Python
import requests

# URL do site que queremos acessar
url = "http://exemplo.com"

# Faz a requisição GET para a URL
response = requests.get(url)

# Verifica se a requisição foi bem-sucedida (código 200)
if response.status_code == 200:
    # Imprime o conteúdo HTML da página
    print(response.text)
else:
    print(f"Falha na requisição. Código: {response.status_code}")
```

## BeautifulSoup
É uma biblioteca para `parsing` de documentos `HTML` e `XML`. Ela pega o texto `HTML` bruto (obtido com o `requests`, por exemplo) e o transforma em uma estrutura de objetos `Python` navegável, como uma árvore.

Serve para encontrar, navegar e extrair informações de dentro do `HTML`. Com ela, você pode facilmente selecionar elementos por suas tags (ex: `<p>`, `<h1>`, `<a>`), classes `CSS` ou `IDs`.

Devemos usar logo após usar o `requests`. É a ferramenta perfeita para extrair dados de `HTML estático`. É extremamente popular por ser muito intuitiva e flexível.

```Python
import requests
from bs4 import BeautifulSoup

url = "http://exemplo.com"
response = requests.get(url)

# Cria um objeto BeautifulSoup para "parsear" o HTML
soup = BeautifulSoup(response.text, 'html.parser')

# Encontra o elemento <h1> e extrai o texto dele
titulo = soup.find('h1').text
print(f"Título da página: {titulo}")

# Encontra o primeiro parágrafo <p>
paragrafo = soup.find('p').text
print(f"Parágrafo: {paragrafo}")
```

## lxml
Esta é outra biblioteca de parsing para `HTML` e `XML`, assim como o `BeautifulSoup`. A grande diferença é que ela é um wrapper sobre bibliotecas escritas em `C`, o que a torna extremamente rápida e eficiente no processamento de documentos, mesmo os muito grandes ou malformados.

Serve para a mesma finalidade do `BeautifulSoup` (navegar e extrair dados), mas com um desempenho muito superior. Ela oferece suporte nativo a `XPath`, uma linguagem poderosa para selecionar nós em documentos `XML/HTML`, algo que o `BeautifulSoup` só faz com a ajuda de bibliotecas adicionais. O `BeautifulSoup` pode usar o lxml como seu "motor" de `parsing`, combinando a sintaxe amigável do `BeautifulSoup` com a velocidade do `lxml`.

### Quando usar?
1. Quando a velocidade de extração é crítica (ex: ao processar milhares de páginas).
2. Ao lidar com `HTML` malformado, pois `lxml` é muito robusto.
3. Você pode instalá-la `(pip install lxml)` e usá-la com o `BeautifulSoup` para obter o melhor dos dois mundos: a simplicidade do `BeautifulSoup` com a velocidade do `lxml`.

### Exemplo:
```Python
# Primeiro, instale o lxml: pip install lxml
import requests
from bs4 import BeautifulSoup

url = "http://exemplo.com"
response = requests.get(url)

# Note que agora usamos 'lxml' como o parser
soup = BeautifulSoup(response.text, 'lxml')

# A sintaxe para encontrar elementos continua a mesma do BeautifulSoup
titulo = soup.find('h1').text
print(f"Título da página (usando lxml): {titulo}")
```

## Selenium
É uma ferramenta de automação de navegador. O Selenium não lê apenas o `HTML`; ele controla um navegador web real (como `Chrome` ou `Firefox`), que pode executar `JavaScript`, clicar em botões, preencher formulários e rolar a página.

*Serve para extrair dados de sites dinâmicos.* Muitos sites modernos (redes sociais, portais de notícias, e-commerces) carregam seu conteúdo principal usando `JavaScript` depois que a página inicial é carregada. O requests não consegue ver esse conteúdo, mas o `Selenium` sim, pois ele espera o navegador renderizar tudo.

### Quando usar?
1. Quando o conteúdo que você quer extrair não aparece no `HTML` inicial (o que você obtém com `requests`).
2. Quando você precisa interagir com a página: clicar em um botão "Ver mais", fazer `login`, selecionar uma opção em um menu, etc.
3. Para sites que usam "rolagem infinita" para carregar mais conteúdo.

### Exemplo:
```Python
# Primeiro, instale o selenium e o driver do navegador (ex: chromedriver)
# pip install selenium
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

# Inicializa o navegador (neste caso, Chrome)
driver = webdriver.Chrome()

# Abre uma página que usa JavaScript
driver.get("https://www.exemplo-dinamico.com")

# Espera 5 segundos para o JavaScript carregar o conteúdo
time.sleep(5)

# Encontra um elemento pelo seu ID (que pode ter sido criado por JS)
# A sintaxe para encontrar elementos é diferente do BeautifulSoup
elemento_dinamico = driver.find_element(By.ID, "conteudo-gerado-por-js")
print(elemento_dinamico.text)

# Fecha o navegador
driver.quit()
```

## Scrapy
É um framework completo de `Web Scraping` e `Crawling`. Ele não é apenas uma biblioteca, mas um ambiente de desenvolvimento inteiro para criar `"spiders"` (aranhas), que são robôs que podem navegar por um site, seguir links e extrair dados de forma estruturada.

Para construir projetos de `scraping` grandes, complexos e escaláveis. O `Scrapy` gerencia todo o fluxo de trabalho para você: faz as requisições (de forma assíncrona, ou seja, várias ao mesmo tempo), processa as respostas, extrai os dados através de seletores (`XPath` e `CSS`) e os salva no formato que você desejar (`JSON`, `CSV`, etc.).

### Quando usar?
1. Para projetos de larga escala: quando você precisa extrair dados de um site inteiro, ou de múltiplos sites.

2. Quando você precisa de desempenho: sua arquitetura assíncrona o torna muito mais rápido que a combinação `requests + BeautifulSoup` para múltiplas páginas.

3. Quando você precisa de um *pipeline de dados*: o `Scrapy` permite que você processe os itens extraídos, limpe os dados e os salve em um banco de dados, tudo dentro do mesmo projeto.

### Como funciona (conceitualmente):
Diferente das outras, você não escreve um script simples. Você cria um projeto `Scrapy` com uma estrutura de arquivos definida:
* `spiders/`: Onde você define sua "aranha", dizendo qual `URL` começar, como seguir os links e como extrair os dados de cada página.

* `items.py`: Onde você define a estrutura dos dados que quer extrair (ex: um produto com nome, preco, descricao).

* `pipelines.py`: Onde você define o que fazer com os dados extraídos (ex: limpar, validar, salvar no banco de dados).

* `settings.py`: Onde você configura o comportamento do seu robô (ex: a velocidade das requisições, headers, etc.).

## Resumo 
| Biblioteca      | Cenário Ideal                             | Vantagens                                       | Desvantagens                                        |
| :-------------- | :---------------------------------------- | :---------------------------------------------- | :-------------------------------------------------- |
| **`requests`** | Obter o HTML de páginas estáticas.        | Simples, leve, universal.                       | Não executa JavaScript.                             |
| **`BeautifulSoup`**| Extrair dados de HTML estático.           | Sintaxe muito fácil e amigável.                 | Mais lento que `lxml`.                              |
| **`lxml`** | Extrair dados com alta velocidade.        | Extremamente rápido, robusto, suporta XPath.    | Sintaxe um pouco menos intuitiva que BS.            |
| **`Selenium`** | Sites dinâmicos que exigem interação.     | Executa JS, simula ações humanas.               | Lento, consome mais recursos (abre um navegador). |
| **`Scrapy`** | Projetos grandes, crawling de sites inteiros. | Rápido (assíncrono), escalável, completo.      | Curva de aprendizado maior, mais complexo para tarefas simples. |

---

# Dificuldades que podemos ter
Na prática, minerar sites de forma robusta e em larga escala é um desafio complexo. Os exemplos simples funcionam em ambientes ideais, mas o mundo real da web apresenta muitos obstáculos.

Alguns dos motivos são:
1. `Sites Dinâmicos` e `JavaScript`: Muitos sites modernos carregam seu conteúdo principal usando `JavaScript` após o carregamento inicial da página.
* *O Problema*: A biblioteca `requests` só consegue ver o `HTML` original enviado pelo servidor. Se o preço, o nome do produto ou o texto da notícia só aparece na tela após alguns segundos, o `requests` não o encontrará.
* *A Solução (mais complexa)*: É aqui que entra o `Selenium`. Ele precisa abrir um navegador real, esperar o `JavaScript` ser executado para renderizar a página completa e só então extrair a informação. Isso torna o processo muito mais lento e consome mais recursos.

2. Tecnologias `Anti-Scraping`:
Os sites ativamente tentam impedir a mineração de dados para proteger suas informações, evitar sobrecarga no servidor e manter a vantagem competitiva.
* *Bloqueio por `IP` e Limite de Requisições (Rate Limiting):* Se um site detecta muitas requisições vindas do mesmo endereço de `IP` em um curto período, ele assume que é um robô e bloqueia o acesso temporária ou permanentemente.
* *Verificação de `User-Agent`:* O servidor verifica o `User-Agent` para saber quem está acessando (ex: "`Chrome` no Windows", "`Safari` no iPhone"). Requisições de scripts `Python` têm um User-Agent padrão (ex: `python-requests/2.28.1`) que entrega imediatamente que é um bot. É preciso mascará-lo para se parecer com um navegador real.
* *CAPTCHAs:* O famoso "Não sou um robô". Esses testes são projetados especificamente para serem fáceis para humanos e extremamente difíceis para robôs. Contorná-los é um desafio técnico avançado e eticamente questionável.
* *Honeypots (Potes de Mel):* São armadilhas para bots. Os desenvolvedores do site podem incluir links invisíveis para humanos, mas que um robô (que lê o `HTML` puro) seguiria. Ao acessar esse link, o `IP` do robô é imediatamente identificado e bloqueado.

3. Estrutura do Site e Seletores Frágeis:
Seu código depende de encontrar elementos `HTML` por meio de seletores (ex: `find('div', class_='price')`).
* *O Problema:* Os sites mudam de layout o tempo todo. Uma simples atualização da equipe de desenvolvimento pode alterar o nome da classe de `"price"` para `"product-price"`, e seu scraper quebra instantaneamente.
* *A Solução (mais complexa):* Requer manutenção constante. É preciso criar seletores mais robustos e, às vezes, ter lógicas alternativas para encontrar o mesmo dado se o seletor principal falhar.

4. Autenticação e Gerenciamento de Sessão:
Muitos dados valiosos estão por trás de uma tela de login (redes sociais, fóruns privados, áreas de clientes).
* *O Problema:* Não basta acessar a `URL`. Seu scraper precisa primeiro fazer login (enviando dados de um formulário POST) e depois gerenciar `cookies` e `tokens` de sessão para se manter autenticado nas requisições seguintes.
* *A Solução (mais complexa):* Utilizar objetos de sessão (`requests.Session`) para persistir os `cookies` ou automatizar o processo de login com o `Selenium`.

5. Limpeza e Formatação dos Dados:
Os dados extraídos raramente vêm em um formato limpo e pronto para uso.
* *O Problema:* Você extrai um preço como `"R$ 1.999,90\n "`. Para poder usá-lo em cálculos, você precisa remover o `"R$"`, os espaços em branco, o caractere de nova linha `(\n)`, o ponto dos milhares e trocar a vírgula por um ponto para convertê-lo no número `1999.90`. Isso se aplica a datas, números de telefone, etc.
* *A Solução (mais complexa):* Requer uma etapa robusta de processamento e limpeza de dados (geralmente usando bibliotecas como `Pandas`) após a extração.

---

# Boas práticas
Para garantir que a coleta de dados tenha uma boa qualidade, algumas práticas podem ser consideradas benéficas. Vamos citar algumas delas e ver seus impactos no desenvolvimento:

## Pausas entre requests
As **pausas entre requests** (ou `request delays`) são uma das práticas mais importantes no web scraping, porque ajudam a manter o bot **eficiente** e menos propenso a ser **bloqueado**. Alguns motivos de se realizar essas pausas são:
1. **Evitar sobrecarregar o servidor:**  
Quando o scraper faz requisições excessivas, é possível que isso cause lentidão no site ou, no pior dos casos, fazer com que o site caia.
2. **Respeitar limites:**  
Certos sites são rígidos com seus limites de acesso no `robots.txt`.
3. **Risco de bloqueio:**  
Sites geralmente têm mecanismos de defesa contra tráfego suspeito (`firewalls`, `rate limiting`, `bloqueio de IP`). Pausas tornam o acesso mais parecido com o de um usuário humano.  

Aqui está um exemplo de como essas pausas são implementadas, sendo, nesse caso, uma pausa fixa de 1 requisição a cada 5 segundos:  

```bash
import time
import requests

urls = ["http://example.com/page1", "http://example.com/page2"]
for url in urls:
    response = requests.get(url)        # resposta do processo
    time.sleep(5)                       # Espera por 5 segundos
```

## Salvar durante execução
Um forte aliado das pausas entre requests é salvar seu progresso durante a execução da coleta, ou seja, **salvar os dados gradualmente enquanto o scraper roda**, em vez de deixar tudo para o final. Isso traz algumas vantagens como a **eficiência** e a **segurança dos dados**. Salvar, mesmo que de pouco em pouco, pode ser importante já que **evita a perda de dados** se erros ocorrerem durante o processo de coleta de dados, não se perderia nada muito impactante para o projeto.  

Para salvar o progresso gradualmente, algumas técnicas podem ser implementadas, como:  
1. **Escrita incremental em arquivos:**  
* Podemos gerar um arquivo `CSV/JSON` em que, a cada item extraido, o mesmo é incrementado no arquivo, por exemplo:  
```bash
import csv

with open("noticias.csv", "a", newline="") as f:
    writer = csv.writer(f)
    for noticia in noticias:
        writer.writerow([noticia["titulo"], noticia["link"], noticia["data"]])
```

* Essa técnica, por mais que seja símples, pode gerar arquivos muito grandes.  

2. **Escrita diretamente no banco de dados:**  
* Inserir dados conforme forem extraidos é bom para scrapers que rodam em um loop contínuo.  
* Utilizando um banco de dados como `MongoDB`, que armazena JSON nativamente é ideal, já que scrapers extraem dados em dicionários, além de ser **flexível** e ter uma ótima **escalabilidade**.  
* Exemplo utilizando MongoDB:

```bash
for n in noticias:
    titulo = n.get_text(strip=True)
    link = n.find_parent("a")["href"] if n.find_parent("a") else None

    noticia = {
        "titulo": titulo,
        "link": link,
        "fonte": "G1",
    }

    # insere imediatamente no banco
    colecao.insert_one(noticia)
    print("Salvo:", titulo)
```
3. **Scrapy pipelines:**  
* O scrapy já implementa essa prática de salvamento do progresso nativamente. Cada item coletado passa automaticamente por uma `pipeline de dados`, onde você decide como salvar (CSV, JSON, banco de dados etc).

# Fontes:
* [Repositorio "check up"](https://github.com/aosfatos/check-up?tab=readme-ov-file#3--collect-ad-information)
* [kinsta - o que é web scraping](https://kinsta.com/pt/base-de-conhecimento/o-que-e-web-scraping/)
