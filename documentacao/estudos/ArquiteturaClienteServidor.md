# Arquitetura Cliente-servidor

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
- 
- **Exemplos**:  
  - Navegadores de internet (Chrome, Firefox).  
  - Aplicações de terminal em nuvem (Citrix, Remote Desktop).  

### Cliente Gordo (Thick Client)
- É um cliente “pesado”, que faz grande parte do processamento localmente.  
- Armazena parte dos dados e da lógica no próprio dispositivo do usuário.  
- **Processamento**: dividido entre cliente e servidor.
- 
- **Exemplos**:  
  - Programas como **Microsoft Word, Photoshop, jogos no PC** → funcionam mesmo sem internet e só usam servidor em alguns momentos.  
  - Apps de banco no celular que já fazem cálculos antes de enviar a requisição ao servidor.  
