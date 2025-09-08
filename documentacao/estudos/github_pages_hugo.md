# O que é GitHub Pages?

GitHub Pages é um serviço que o Github criou para ajudar os desenvolvedores que queriam armazenar e administrar um código. O GitHub Pages publica qualquer arquivo estático do qual você faz push no repositório.

Isso quer dizer que ele hospeda um site para nós gratuitamente, mas somente de forma estática. Ou seja, é perfeito para exibirmos nossa documentação!

## Como o GitHub Pages funciona?

Basta usar nosso repositório existente e configurar uma "fonte" de publicação. O GitHub então monitora essa fonte (geralmente uma pasta ou um branch específico) e, sempre que atualizamos os arquivo no local, ele automaticamente reconstrói e publica nosso site.

---

# Para que serve o HUGO?

O Hugo é um gerador de site estático (Static Site Generator). Em vez de escrevermos um HTML, nós podemos escrever o conteúdo em um formato simples, chamado Markdown (arquivos .md). O Hugo pega esses arquivos .md e aplica um template (que é de nossa escolha), e gera um site completo em HTML/CSS.

## Como funciona:

| Pasta | Descrição |
| :--- | :--- |
| `archetypes` | Contém "modelos" para novos arquivos de conteúdo. Por exemplo, você pode definir que todo novo post de blog já venha com um cabeçalho pré-definido. |
| `content` | Aqui fica todo o conteúdo do seu site, organizado em pastas que refletem a estrutura das seções do seu site. |
| `data` | Armazena dados estruturados (em formatos como TOML, YAML ou JSON) que podem ser utilizados em suas páginas, como uma lista de membros da equipe. |
| `layouts` | O coração do design do seu site. Contém os templates HTML que o Hugo usará para renderizar seu conteúdo. Modificações aqui alteram a aparência e a estrutura das suas páginas. |
| `static` | Para arquivos que não precisam de processamento, como imagens, CSS e JavaScript. Tudo o que estiver aqui será copiado diretamente para a pasta `public`. |
| `themes` | Onde você pode instalar e gerenciar temas prontos da comunidade Hugo. |
| `config.toml` (ou `hugo.toml`, `config.yaml`) | O arquivo de configuração principal do seu site. Aqui você define o título do site, o tema a ser usado, menus de navegação e outras configurações globais. |

---

# Modificando os Arquivos do Site

Para adicionar ou editar o conteúdo de uma página, navegue até a pasta "content/docs" ou "layout". Por exemplo, para editar uma página, você encontrará um arquivo .md. Abra este arquivo em um editor de texto e faça as alterações usando a sintaxe Markdown.

Para testar na sua máquina antes de dar commit, podemos entrar no diretorio local(do repositório clonado) e usar o comando do hugo: >> hugo server -D << logo aparecerá um link (por exemplo: http://localhost:1313/2025-2-squad-05/), basta abri-lo.
