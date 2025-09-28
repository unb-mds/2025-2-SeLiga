---
title: "Arquitetura Cliente-servidor"
draft: false
url: "/estudos/arquivos/ArquiteturaClienteServidor"
---

---

É um modelo de arquitetura de software em que o sistema é dividido em duas partes:

## Cliente
- Quem faz as solicitações.  
- Interface usada pelo usuário (navegador, app, programa).  
- Envia pedidos ao servidor (ex.: abrir uma página da web).  

## Servidor
- Quem processa e responde às solicitações.  
- Recebe os pedidos do cliente.  
- Processa a requisição (consulta banco de dados, aplica regras de negócio).  
- Retorna a resposta (ex.: HTML, JSON, arquivo).  

---

## Exemplo
1. Você digita **www.google.com** no navegador (cliente).  
2. O navegador envia um pedido HTTP ao servidor do Google.  
3. O servidor processa e devolve a página com os resultados.  
4. O navegador exibe para você.  

---

## Vantagens
- Separação entre interface e processamento.  
- Centralização de dados no servidor (gera mais controle e segurança).  
- Facilidade de manutenção (alterações no servidor se refletem para todos os clientes).  

## Desvantagens
- Dependência da conexão com o servidor.  
- Se o servidor cair, todos os clientes são afetados.  
- Pode gerar sobrecarga no servidor se muitos clientes acessarem ao mesmo tempo.  

---

## Tipos de Cliente-servidor

### Cliente Fino (Thin Client)
- É um cliente “leve”, que faz pouca coisa localmente.  
- Apenas envia requisições para o servidor e exibe a resposta.  
- **Processamento**: quase todo fica no servidor (banco de dados, cálculos, lógica de negócio).
  
- **Exemplos**:  
  - Navegadores de internet (Chrome, Firefox).  
  - Aplicações de terminal em nuvem (Citrix, Remote Desktop).  

### Cliente Gordo (Thick Client)
- É um cliente “pesado”, que faz grande parte do processamento localmente.  
- Armazena parte dos dados e da lógica no próprio dispositivo do usuário.  
- **Processamento**: dividido entre cliente e servidor.
  
- **Exemplos**:  
  - Programas como **Microsoft Word, Photoshop, jogos no PC** → funcionam mesmo sem internet e só usam servidor em alguns momentos.  
  - Apps de banco no celular que já fazem cálculos antes de enviar a requisição ao servidor.


# Comunicação via Protocolos

Para que a comunicação entre cliente e servidor seja bem-sucedida, eles precisam seguir um conjunto de regras ou uma "linguagem" comum. Essa linguagem é chamada de **protocolo de rede**.  
Existem vários protocolos, cada um com uma finalidade específica. Eles trabalham juntos em diferentes camadas para garantir que a comunicação seja completa e confiável.

---

## Protocolos chave na comunicação web

### 1. TCP/IP
O **TCP/IP (Transmission Control Protocol/Internet Protocol)** é a espinha dorsal de toda a internet. Ele é, na verdade, um conjunto de protocolos que funciona em duas camadas principais:

- **IP (Internet Protocol):**  
  É como o serviço de correios. Ele se preocupa em endereçar e encaminhar os "pacotes de dados" (pequenos pedaços de informação) do ponto A ao ponto B.  
  ⚠️ O IP **não garante** que todos os pacotes cheguem na ordem correta, ele apenas os envia.

- **TCP (Transmission Control Protocol):**  
  Funciona como um serviço de entrega com confirmação. Ele garante que os pacotes de dados cheguem ao destino na ordem certa, sem perdas e sem duplicatas.  
  Se um pacote se perde no caminho, o TCP pede que ele seja reenviado. Isso torna a comunicação muito mais confiável.

👉 **Em resumo:**  
O IP cuida do **roteamento**, e o TCP cuida da **confiabilidade e organização da entrega**.

---

### 2. HTTP e HTTPS
O **HTTP (Hypertext Transfer Protocol)** é o protocolo usado para a comunicação na web.  
É a linguagem que seu navegador usa para solicitar uma página da internet a um servidor, e que o servidor usa para enviar essa página de volta.

- **Como funciona o HTTP:**  
  Quando você digita um endereço em seu navegador (cliente), ele envia uma requisição HTTP para o servidor.  
  Essa requisição diz algo como:  
  > "Olá, servidor! Por favor, me envie a página inicial do seu site."  

  O servidor processa o pedido e envia uma resposta HTTP com o conteúdo da página.

- **HTTPS (Hypertext Transfer Protocol Secure):**  
  É a versão **segura** do HTTP.  
  Ele adiciona uma camada de criptografia (SSL/TLS) para proteger a comunicação entre cliente e servidor.  
  Isso é essencial para **transações financeiras, logins e troca de dados sensíveis**.  
  A criptografia embaralha os dados, tornando-os ilegíveis para qualquer pessoa que possa interceptá-los.

👉 **Em resumo:**  
- **HTTP:** troca de informações na web.  
- **HTTPS:** versão **segura** do HTTP, com criptografia.  

---

# Como a Arquitetura Cliente-Servidor se aplica ao projeto

### O Cliente (usuário)
Pense no cliente como a pessoa que está usando o projeto. Ela pode estar em seu **celular ou computador**, usando um **aplicativo ou site**.

A função do cliente é:
- **Enviar a notícia:** A pessoa copia e cola um link ou trecho da notícia.  
- **Fazer a requisição:** O aplicativo ou site (cliente) envia essa informação para o "cérebro" do projeto.  
- **Receber a resposta:** O cliente espera e recebe a resposta do servidor, que dirá se a notícia é fake ou não.  

---

### O Servidor (o cérebro do projeto)
Pense no servidor como o **"cérebro"** que faz todo o trabalho pesado.

A função do servidor é:
- **Receber a requisição:** O servidor recebe a notícia enviada pelo cliente.  
- **Processar a informação:** Usa algoritmos, bancos de dados e inteligência artificial para analisar a notícia.  
  Ele pode comparar com outras fontes, verificar fatos e analisar a linguagem.  
- **Gerar a resposta:** Após a análise, o servidor decide se a notícia é fake ou não.  
- **Enviar a resposta:** O servidor envia a resposta de volta para o cliente, que a exibe na tela para o usuário do projeto.  

## Referências
https://www.eposaudio.com/en/us/insights/articles/thin-client-or-thick-client-whats-the-difference
https://www.fortinet.com/resources/cyberglossary/thin-client
