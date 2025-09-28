---
title: "Guia de Estudo: Git e GitHub"
draft: false
url: "/estudos/arquivos/Git_e_GitHub"
---

---

O **Git** e o **GitHub** são ferramentas essenciais para que várias pessoas possam trabalhar no mesmo código sem que um sobrescreva o trabalho do outro.

---

### O que é Git?

O Git é um **sistema de controle de versão** que fica na sua máquina. Ele permite que você registre todas as alterações feitas no seu projeto, criando um histórico de versões que podem ser acessadas a qualquer momento.

* **Instale o Git:** Vá em `git-scm.com` e baixe para o seu sistema operacional.
* **Configure o Git:** Abra o terminal e use os comandos abaixo para que o Git saiba quem está fazendo os `commits`:
    ```bash
    git config --global user.name "Seu Nome"
    git config --global user.email "seu_email@exemplo.com"
    ```

### O que é GitHub?

O GitHub é uma **plataforma online** que hospeda os projetos Git, permitindo que o time inteiro acesse o mesmo código, veja o histórico e colabore de forma centralizada.

---

### Nomenclaturas e Conceitos Essenciais

* **Repositório:** É a pasta que guarda os arquivos de um projeto, junto com todo o histórico de alterações.
    * **Local:** Fica no seu computador.
    * **Remoto:** Fica em um servidor (como o GitHub), usado para compartilhar e sincronizar.
* **README.md:** A "vitrine" do seu projeto, onde você apresenta o que ele faz, como rodar e como contribuir.
* **Commit:** Uma versão salva do seu código. É como um "ponto de salvamento" na história do projeto, com uma mensagem que explica o que foi feito.
* **Branch:** Um "ramo" de desenvolvimento separado do código principal. Permite que você trabalhe em novas funcionalidades sem afetar o projeto principal.
* **Issue:** Um quadro de tarefas no GitHub para relatar bugs, pedir melhorias e organizar o trabalho da equipe.
* **Pull Request (PR):** É um pedido para que as suas mudanças em uma `branch` sejam revisadas e aprovadas por outros membros da equipe antes de serem unidas ao código principal.

---

### Comandos Git e Fluxo de Trabalho

#### **Saves na sua máquina (Com Git)**

* `git add <nome_do_arquivo>`: Adiciona um arquivo à "área de stage", preparando-o para o `commit`.
* `git commit -m "Uma mensagem explicando o que eu fiz"`: Salva as alterações de forma permanente no seu repositório local.

#### **Colaborando com o Time (Sincronizando com o GitHub)**

* `git clone <link_do_repositorio>`: Baixa uma cópia do projeto do GitHub para a sua máquina (feito apenas uma vez).
* `git pull`: Puxa as últimas alterações que seus colegas enviaram para o GitHub.
* `git push`: Envia os seus `commits` locais para o repositório remoto.

#### **Exemplo de Fluxo de Trabalho Básico na Prática**

1.  **Atualize seu código:** Puxe as últimas mudanças do time com `git pull`.
2.  **Crie uma nova branch:** Para trabalhar em uma nova funcionalidade, crie e mude para sua branch com `git checkout -b nome-da-funcionalidade`.
3.  **Faça suas alterações:** Edite os arquivos.
4.  **Salve e envie:** Use `git add .` e `git commit -m "Adiciona funcionalidade X"`. Depois, envie para o GitHub com `git push`.
5.  **Abra o Pull Request:** No GitHub, crie um PR e peça para a equipe revisar o seu trabalho.

---

### Referências de Estudo

* [Tutorial de Git (YouTube)](https://www.youtube.com/watch?v=_hZf1teRFNg)
* [Documentação Oficial do Git](https://git-scm.com/doc)

* [Guia de Introdução ao GitHub](https://docs.github.com/pt/get-started)
