# Use a imagem base do Node.js
FROM node:20.11.1-alpine as base

# Crie o diretório de trabalho
WORKDIR /app

# Copie os arquivos de configuração
COPY package.json ./
COPY yarn.lock ./

# Instale as dependências
RUN yarn install

# Remova e adicione dependências necessárias para TypeScript
RUN yarn remove tsc
RUN yarn add -D typescript

# Copie o código-fonte
COPY src ./src
COPY tsconfig.json ./tsconfig.json

# Compile o TypeScript
RUN yarn build

# Verifique se a pasta dist foi criada corretamente
RUN ls -l ./dist

# Start production image build
FROM node:20.11.1-alpine

# Crie o diretório de trabalho
WORKDIR /app

# Copy node modules and build directory
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/dist ./dist

# Exponha a porta que o servidor Fastify vai usar
EXPOSE 3000

# Defina o comando para rodar a aplicação
CMD ["node", "dist/app.js"]
