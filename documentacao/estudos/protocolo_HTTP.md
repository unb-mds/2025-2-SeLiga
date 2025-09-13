# Protocolo HTTP (Hypertext Transfer Protocol)

O **HTTP (Hypertext Transfer Protocol)** é um protocolo de comunicação utilizado para a transferência de informações na Web. Ele define como as mensagens são formatadas e transmitidas entre **clientes** (navegadores, apps) e **servidores** (sites, APIs).

---

## Conceitos Fundamentais

- Segue o modelo **cliente-servidor**, em que um cliente abre a conexão com um **request** e aguarda até que receba uma **response** do servidor.
- É um protocolo **stateless**, ou seja, o servidor não guarda nenhum dado de sessão entre requests (**cookies** podem sim adicionar estado em algumas interaçãoes cliente-servidor). 

---

## Componentes de um sistema HTTP

### Cliente
- Atua através de um **user-agent**, que geralmente é um web browser, que é quem realiza os requests formalmente.
- O browser é **sempre** quem **inicia** o request.

### Servidor
- É quem recebe os requests, gerenciando cada um deles e providenciando uma **response** para cada um.

## Fluxo do protocolo
- A comunicação entre cliente e servidor acontece através dos seguintes passos:

1. **Conexão TCP é aberta:** utilizada para enviar requests e receber responses

2. **Envio de mensagem HTTP:**
```bash
GET: /somedir/page.html HTTP/1.1    // Método e versão
Host: www.xxx.com                   // URL
Connection: close                   // Tipo de conexão
User-agent: Mozilla/5.0             // User-agent (geralmente um browser)
Accept-language: fr                 // idiomas que o cliente consegue entender
```

3. **Response enviada pelo servidor:**
```bash
HTTP/1.1 200 OK
Date: Sun, 01 Sep 2025 12:06:01 GMT
Server: Apache
Last-Modified: Sun, 01 Sep 2025 12:08:20 GMT
ETag: 51142vc1-7449-479b2891b
Accept-Ranges: bytes
Content-length: 29769
Content-Type: text/html

<Documento html> ...
```

4. **Conexão é fechada.**

---

## Principais Métodos HTTP

- **GET** → solicitar dados (não altera o servidor).  
- **POST** → enviar dados para criação de um recurso.  
- **PUT** → atualizar/alterar completamente um recurso.  
- **PATCH** → atualizar parcialmente um recurso.  
- **DELETE** → excluir um recurso.
- **CONNECT** → estabelece uma conexão ao servidor pelo recurso-alvo. 
- **HEAD** → igual ao GET, mas sem corpo na resposta.  
- **OPTIONS** → retorna métodos suportados pelo servidor.

---

## Códigos de Status HTTP
- Indicam o resultado de um request e são divididos em 5 famílias principais:
    - **1xx – Informacional** → requisição recebida, processo continua.  
    - **2xx – Sucesso**  
        → 200: OK  
        → 201: Created  
    - **3xx – Redirecionamento**  
        → 301: Moved Permanently  
        → 302: Found  
    - **4xx – Erro do Cliente**  
        → 400: Bad Request  
        → 401: Unauthorized  
        → 403: Forbidden  
        → 404: Not Found  
    - **5xx – Erro do Servidor**  
        → 500: Internal Server Error  
        → 502: Bad Gateway  
        → 503: Service Unavailable  

---

## Diferença entre HTTP e HTTPS

- **HTTP** → não criptografado.  
- **HTTPS** → utiliza **TLS/SSL** para criptografia, garantindo segurança na comunicação.

---

## Ferramentas 

- **cURL** → testar requisições via terminal.  
- **Postman / Insomnia** → testar APIs com interface.  
- **Browser DevTools (F12 → Network)** → inspecionar requisições e respostas.

## Referências
- [MDN Web Docs - HTTP](https://developer.mozilla.org/pt-BR/docs/Web/HTTP)
- [RFC 9110 - HTTP](https://www.rfc-editor.org/rfc/rfc9110.html)