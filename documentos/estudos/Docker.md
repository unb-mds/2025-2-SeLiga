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
