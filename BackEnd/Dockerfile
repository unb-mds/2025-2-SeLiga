# Usa uma imagem leve do Python 3.12 como base
FROM python:3.12-slim

# Define a pasta de trabalho dentro do container
WORKDIR /app

# Instala ferramentas de sistema necessárias (como gcc para compilar pacotes)
RUN apt-get update && apt-get install -y gcc && rm -rf /var/lib/apt/lists/*

# Copia o arquivo de requisitos para dentro do container
# (O docker-compose vai garantir que este arquivo chegue aqui corretamente)
COPY requirements.txt .

# Instala as dependências do Python listadas no arquivo
RUN pip install --no-cache-dir -r requirements.txt

# Copia todo o restante do código da pasta BackEnd para o container
COPY . .

# Expõe a porta 8000 (onde o FastAPI roda)
EXPOSE 8000

# Comando para iniciar a API quando o container rodar
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]