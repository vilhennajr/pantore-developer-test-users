# Usa a imagem oficial do Node.js
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia os arquivos do projeto para o container
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src

# Instala as dependências
RUN npm install

# Compila os arquivos TypeScript
RUN npm run build

# Executa as migrations antes de iniciar a aplicação
CMD npm run typeorm migration:run -- -d dist/config/typeorm.config.js && npm run start:dev
