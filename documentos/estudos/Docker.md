# **Docker**

**Docker** é um serviço de virtualização que permite **criar, empacotar e executar aplicações em ambientes isolados** chamados **containers**.  
Esses ambientes contêm todas as dependências necessárias (bibliotecas, pacotes, versões específicas de linguagens, etc.) para que a aplicação funcione corretamente.  
O Docker garante que a aplicação rode em **qualquer máquina, servidor ou nuvem**.

---

## 🧩 **Conceitos básicos do Docker**

### **Dockerfiles**
São arquivos que funcionam como um **projeto da arquitetura da aplicação**, descrevendo tudo o que é necessário para que ela funcione corretamente.  
Dentro do **Dockerfile** estão todas as instruções para **gerar a imagem Docker**.

---

### **Imagem**
Uma **imagem** é um modelo do ambiente necessário para rodar a aplicação.  
Ela contém todas as dependências e configurações que permitem que o container seja criado e executado.

---

### **Containers**
Os **containers** são **instâncias de uma imagem**, ou seja, o ambiente descrito na imagem sendo executado.  
Quando um container é criado, inicia-se um processo na máquina hospedeira (física ou virtual).  
É possível ter **vários containers rodando na mesma máquina**, inclusive **várias instâncias da mesma imagem**.

---

### **Docker Hub ou Registros**
O **Docker Hub** (ou outros registros) são **repositórios de imagens Docker**, onde imagens podem ser **armazenadas e compartilhadas**.  
Assim, outras pessoas podem reutilizar imagens já prontas.

---

## ⚙️ **Diferença entre Docker e Máquina Virtual**

Diferente das **máquinas virtuais**, o **Docker não precisa de um sistema operacional próprio**.  
Ele **utiliza o sistema operacional do computador hospedeiro**, fazendo apenas uma **divisão de recursos entre os containers**.  
Cada container roda de forma **independente e isolada**, mas compartilha o mesmo kernel do sistema operacional.

---

# Principais comandos do Docker:

**docker ps:**  serve para saber quantos e quais containers estão sendo executados na máquina. Mostrando:  
uma tabela que terá o ID do container (CONTAINER ID)  
a imagem de que ele foi criado  (IMAGE)  
o comando ultilizado para a inicialização do container (COMMAND)  
a data de criação (CREATED)  
o status, se está pausado ou ativo (STATUS)  
quais portas e como elas estão mapeadas (PORTS)  
e o nome do container (NAME)  

**docker run imagem:** serve para rodar o container  

**docker ps -a:** mostra todos os containers que já foram executados na máquina  

**docker run -iti imagem bash:** executa um novo container e abre um terminal interativo dentro dele, executando o bash (shell de linha de comando do linux, permite usar o container como se fosse um pequeno sistema Linux isolado)  

**docker stop ID_do_container:** pausa todos os processos que estão sendo executados dentro daquele container  

**docker start ID_do_container:** inicializa todos os processos do container que estava pausado  

**docker exec comando:** executa um comando dentro de um container já existente  

**docker rm ID_do_container:** remove containers que já foram criados  

**docker build -t nome_da_imagem caminho_do_dockerfile:** lê o dockerfile, executa cada instrução nele e gera uma imagem pronta para ser executado com docker run  

**docker logs ID_do_container:** é usado para ler os registros (logs) gerados por um container em execução ou já encerrado, ele mostra tudo que o container escreveu no terminal, como as mensagens de inicialização, erros e saídas do programa  

**docker pull imagem:** baixa uma imagem do Docker Hub  

**docker images:** lista todas as imagens locais  

**docker rmi imagem:** remove uma imagem  

**docker push imagem:** envia uma imagem para o Docker Hub  
