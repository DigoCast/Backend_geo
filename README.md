# 🌍 GeoSync_Backend

GeoSync_Backend é um serviço de API construído com Node.js, Express e Prisma, projetado para gerenciar dados geográficos (Continentes, Países e Cidades) e integrar informações externas de geolocalização e clima.

## 🚀 Tecnologias Utilizadas

* **Backend:** Node.js, Express
* **Banco de Dados:** PostgreSQL
* **ORM:** Prisma ORM
* **Linguagem:** TypeScript
* **Ambiente:** ts-node-dev

## 🛠️ Guia de Configuração e Execução

Siga os passos abaixo para configurar e rodar o projeto localmente.

### Pré-requisitos

Certifique-se de que você tem instalado em sua máquina:

* **Node.js** (versão recomendada: 18 ou superior)
* **npm** (gerenciador de pacotes)
* **PostgreSQL** (com o serviço do banco de dados rodando)

### Passo 1: Instalação de Dependências

Clone o repositório (se ainda não o fez) e instale as dependências:
```bash
# Navegue até a pasta do projeto
cd GeoSync_Backend
# Instale as dependências
npm install
```

### Passo 2: Configuração do Banco de Dados

Crie um banco de dados vazio no seu PostgreSQL. O nome sugerido pelo projeto é `geosync_bd`
```sql
CREATE DATABASE geosync_bd;
```

Crie o arquivo de variáveis de ambiente na raiz do projeto, copiando o exemplo:
```bash
cp .env.example .env
```
Abra o arquivo `.env` e configure a variável `DATABASE_URL` com suas credenciais locais:
```env
DATABASE_URL="postgresql://[USUARIO]:[SENHA]@[HOST]:[PORTA]/[NOME_DO_BANCO]?schema=public"
```
> **Nota:** O `.env` já contém o `PORT=3000` para a aplicação.

### Passo 3: Configuração das Chaves de API

O projeto depende de APIs externas para enriquecer os dados. Você precisa obter suas próprias chaves e adicioná-las no arquivo `.env`.

| Variável | Uso | Fonte Recomendada |
| :--- | :--- | :--- |
| 'GEOCODING_API_KEY' | Geolocalização (Lat/Lon) | 'https://home.openweathermap.org/api_keys' |
| 'OPENWEATHER_API_KEY' | Dados Climáticos | 'https://www.weatherapi.com/my/' |
| 'PORT' | Porta do servidor | '3000' (Padrão) |

Substitua as chaves no seu '.env':

```env
OPENWEATHER_API_KEY="sua_chave_weatherapi"
GEOCODING_API_KEY="sua_chave_openweathermap_geocoding"
```

### Passo 4: Rodar as Migrações do Prisma

Este comando sincroniza o schema do Prisma com o seu banco de dados, criando as tabelas necessárias (`Continente`, `Pais`, `Cidade`).

```bash
# O argumento '--name' é obrigatório. Use um nome descritivo.
npm run migrate:dev -- --name initial_setup
```

#### 4.1. (Opcional) Gerar o Prisma Client

Se o seu editor de código (como VS Code) estiver exibindo erros de tipo (TypeScript), execute este comando para atualizar as definições do `Prisma Client`:

```bash
npx prisma generate
```

### Passo 5: Iniciar o Servidor de Desenvolvimento

Inicie o servidor de desenvolvimento. O script 'dev' utiliza 'ts-node-dev' para observação de arquivos e reinício automático.

```bash
npm run dev
```

O servidor estará ativo em [http://localhost:3000](http://localhost:3000).

### 🔍 Verificação (Opcional)

#### Usando o Prisma Studio

Para navegar e gerenciar visualmente os dados do seu banco, você pode usar o `Prisma Studio`:

```bash
npx dotenv-cli -e .env -- npx prisma studio
```
Isso abrirá a interface do Studio no seu navegador (geralmente em [http://localhost:5555](http://localhost:5555)).

## 🗺️ Rotas da API

Todas as rotas são prefixadas pelo nome do módulo. O servidor roda na porta '3000' por padrão.

| Módulo | Método | Rota | Descrição |
| :--- | :--- | :--- | :--- |
| **Continente** | 'POST' | '/continente' | Cria um novo continente. |
| | 'GET' | '/continente' | Lista todos os continentes (com filtro por nome). |
| | 'GET' | '/continente/:id' | Busca continente por ID (inclui países). |
| | 'PUT' | '/continente/:id' | Atualiza um continente por ID. |
| | 'DELETE' | '/continente/:id' | Deleta um continente por ID. |
| **País** | 'POST' | '/pais' | Cria um novo país, buscando dados externos (população, moeda, idioma) com base no nome. |
| | 'GET' | '/pais' | Lista todos os países (com filtros por nome, continenteId, e populacaoMin/Max). |
| | 'GET' | '/pais/:id' | Busca país por ID (inclui cidades). |
| | 'PUT' | '/pais/:id' | Atualiza um país por ID. |
| | 'DELETE' | '/pais/:id' | Deleta um país por ID. |
| **Cidade** | 'POST' | '/cidade' | Cria uma nova cidade, buscando coordenadas (Latitude/Longitude) externas. |
| | 'GET' | '/cidade' | Lista todas as cidades (com filtros por nome e paisId). |
| | 'GET' | '/cidade/:id' | Busca cidade por ID. |
| | 'PUT' | '/cidade/:id' | Atualiza uma cidade por ID. |
| | 'DELETE' | '/cidade/:id' | Deleta uma cidade por ID. |
| | 'GET' | '/cidade/:id/clima' | **Busca o clima atual** da cidade por suas coordenadas. |
| **Dashboard** | 'GET' | '/dashboard/stats' | Retorna contagens totais de Continentes, Países e Cidades. |