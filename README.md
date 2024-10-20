# Desenvolvendo APIs com TypeScript e Fastify: Do Código ao Deploy na Vercel

Este guia fornece um passo a passo para configurar um servidor Node.js com TypeScript e Fastify. A configuração inclui o uso de `tsx` para rodar o projeto em ambiente de desenvolvimento.

## 1. Configuração do Servidor

### **Inicializando o projeto**

Primeiro, inicie um novo projeto Node.js com o seguinte comando:

```bash
npm init -y
```

### **Instalando Dependências**

Em seguida, instale as dependências de desenvolvimento essenciais:

```bash
npm install typescript @types/node -D
```

### **Configurando o TypeScript**

Inicie a configuração do TypeScript:

```bash
npx tsc --init
```

Atualize o arquivo `tsconfig.json` conforme sua versão do Node.js. Você pode usar as configurações baseadas no repositório [tsconfig bases](https://github.com/tsconfig/bases). Aqui está um exemplo:

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "_version": "20.1.0",

  "compilerOptions": {
    "lib": ["es2023"],
    "module": "node16",
    "target": "es2022",

    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "node16"
  }
}
```

### **Instalando `tsx` para Rodar o Projeto**

Instale o `tsx` como uma dependência de desenvolvimento. Ele permite que você rode arquivos TypeScript diretamente sem compilar:

```bash
npm install tsx -D
```

### **Instalando Fastify**

Agora, instale o Fastify, um framework web rápido e eficiente para construir APIs:

```bash
npm install fastify
```

### **Criando o Servidor**

Dentro da pasta `src`, crie o arquivo `server.ts`, que servirá como base para sua API:

```ts
import { fastify } from "fastify";

const app = fastify();

app.get("/", (request, reply) => {
  reply.send({ message: "Hello World" });
});

const PORT = 3333;
app.listen({ port: PORT, host: "0.0.0.0" }).then(() => {
  console.log(`Server running on port ${PORT}`);
});
```

### **Adicionando Scripts ao `package.json`**

Adicione o seguinte script ao seu `package.json` para facilitar o desenvolvimento, permitindo que você rode e monitore o projeto com o comando `npm run dev`:

```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts"
  }
}
```

### **Rodando o Projeto**

Com tudo configurado, inicie o servidor com:

```bash
npm run dev
```

O servidor estará rodando em http://localhost:3333 e exibirá a mensagem "Hello World" ao acessar a rota raiz (`/`).

Aqui está a seção de configuração do Prisma com MongoDB no mesmo estilo:

## 2. Configurando o Prisma com MongoDB

### Instalando o Prisma

Primeiro, instale o Prisma e o cliente do Prisma como dependências do seu projeto:

```bash
npm install prisma -D
npm install @prisma/client
```

### Inicializando o Prisma

Após a instalação, inicialize o Prisma com o seguinte comando:

```bash
npx prisma init
```

Isso criará uma pasta chamada `prisma` contendo um arquivo `schema.prisma`, além de um arquivo `.env` na raiz do seu projeto.

### Configurando o Banco de Dados

No arquivo `.env`, configure a string de conexão do MongoDB. A string de conexão geralmente tem o seguinte formato:

```env
DATABASE_URL="mongodb://<usuario>:<senha>@<host>:<porta>/<nome_do_banco>?retryWrites=true&w=majority"
```

Substitua `<usuario>`, `<senha>`, `<host>`, `<porta>` e `<nome_do_banco>` pelas informações do seu banco de dados MongoDB.

### Definindo o Schema do Prisma

No arquivo `schema.prisma`, configure o provedor como `mongodb` e defina os modelos que você deseja usar. Aqui está um exemplo básico de como poderia ser:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model users {
  id       String @id @default(auto()) @map("_id") @db.ObjectId
  email    String @unique
  username String @unique
}

```

### Executando Migrations (para MongoDB)

Diferente de bancos de dados relacionais, o MongoDB não utiliza migrations da mesma forma. No entanto, você pode gerar o cliente do Prisma para que suas definições de modelo sejam aplicadas. Para isso, execute:

```bash
npx prisma generate
```

Isso criará o cliente Prisma com base no seu modelo definido.

### Usando o Prisma Client

Agora que o Prisma está configurado, você pode usá-lo em seu projeto. No arquivo `server.ts`, importe o cliente Prisma e inicie-o:

```ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

app.get("/users", async (request, reply) => {
  const users = await prisma.user.findMany();
  reply.send(users);
});
```

### Rodando o Projeto com Prisma

Depois de adicionar a configuração do Prisma, rode o servidor novamente:

```bash
npm run dev
```

Aqui está a seção sobre como fazer o deploy da sua API na Vercel, seguindo o mesmo estilo:

## 3. Deploy na Vercel

### Instalando o Vercel CLI

Para facilitar o processo de deploy, instale o Vercel CLI globalmente. Isso permitirá que você faça o deploy diretamente do seu terminal:

```bash
npm install -g vercel
```

### Preparando o Projeto para o Deploy

**Configurando o `package.json`**: Adicione os seguintes scripts ao seu `package.json` para que a Vercel saiba como iniciar o servidor:

```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "start": "node dist/server.js",
    "build": "tsc --project tsconfig.build.json && npx prisma generate",
    "vercel-build": "npx prisma db push"
  }
}
```

Obs: Não se esqueça de adicionar as variáveis de ambiente na plataforma da Vercel.

### Realizando o Deploy

Com o Vercel CLI instalado e o projeto preparado, você pode fazer o deploy do seu projeto com o seguinte comando:

```bash
vercel
```

O Vercel irá guiá-lo pelo processo de deploy. Você será solicitado a fornecer informações como o diretório do projeto e o nome do projeto. Se for a primeira vez que você está usando o Vercel, ele criará um novo projeto.

### Atualizando o Deploy

Se você fizer alterações no seu código e quiser atualizar o deploy, execute novamente o comando:

```bash
vercel
```

Para enviar as atualizações diretamente para o ambiente de produção, utilize a flag `--prod`, isso publicará as alterações em produção.
