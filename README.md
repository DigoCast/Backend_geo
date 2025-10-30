Guia Completo: Configuração do Banco PostgreSQL e Prisma

Este guia assume que você já clonou o repositório do GitHub e rodou "npm install".

---
### Passo 1: Iniciar o Serviço do PostgreSQL

Garanta que o serviço do seu banco de dados PostgreSQL está rodando na sua máquina.

---
### Passo 2: Criar o Banco de Dados (Vazio)

Abra seu terminal psql ou um cliente gráfico e crie o banco de dados que o projeto usará.

Comando SQL:
```sql
CREATE DATABASE geo_db;
```
---
### Passo 3: Criar e Configurar o Arquivo .env

1. Na raiz do projeto, copie o arquivo ".env.example" e renomeie a cópia para ".env".
2. Abra o arquivo ".env" e edite a linha DATABASE_URL com suas credenciais locais do PostgreSQL.

Formato: postgresql://[USUARIO]:[SENHA]@[HOST]:[PORTA]/[NOME_DO_BANCO]

Exemplo:
```ts
DATABASE_URL="postgresql://postgres:minhasenha123@localhost:5432/geo_db?schema=public"
```
---
### Passo 4: Rodar as Migrações (Sincronizar o Banco)

Este comando irá criar as tabelas (Continente, Pais, Cidade) no seu banco de dados vazio.

1. Abra seu terminal na raiz do projeto.
2. Execute o comando:

```bash
npm run migrate:dev -- --name nome_da_nova_migration
```
---
### Passo 5: (Opcional) Gerar o Prisma Client

Se o seu editor de código (VS Code) mostrar erros de tipo, rode este comando para atualizar as definições do TypeScript:
```bash
npx prisma generate
```
---
### Verificação Final (Recomendado)

Use o Prisma Studio para verificar se tudo funcionou.

1. No terminal, rode:
```bash
npx dotenv-cli -e .env -- npx prisma studio
```
2. Isso abrirá uma página no seu navegador [http://localhost:3000](http://localhost:3000).
3. Você deve ver seus modelos (Continente, Pais, Cidade) no menu.

Seu banco de dados está pronto. Agora você pode rodar "npm run dev" para iniciar o servidor.