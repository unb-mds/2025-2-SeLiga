# Etapa 1: Construção (Build)
# Usamos a imagem do Node 18, conforme definido nos seus workflows do GitHub
FROM node:18-alpine as build

# Define a pasta de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package.json package-lock.json ./

# Instala as dependências de forma limpa e rápida
RUN npm ci

# Copia todo o código do frontend
COPY . .

# Cria a versão otimizada de produção (gera a pasta 'build')
RUN npm run build

# Etapa 2: Servir a aplicação
# Começamos uma nova imagem limpa para rodar o site
FROM node:18-alpine

# Instala um servidor web simples e leve chamado 'serve'
RUN npm install -g serve

# Copia apenas a pasta 'build' gerada na etapa anterior
COPY --from=build /app/build /app/build

# Expõe a porta 3000 (padrão do React)
EXPOSE 3000

# Comando para rodar o servidor na porta 3000 usando a pasta build
CMD ["serve", "-s", "/app/build", "-l", "3000"]