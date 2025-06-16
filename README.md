# 🎬 Golden Raspberry Awards API

Este projeto fornece uma API RESTful para consultar informações sobre produtores premiados com o **Golden Raspberry Award**, incluindo o intervalo entre suas vitórias.

---

# Tabela de Conteúdos
- [🚀 Objetivo](#-objetivo)
- [🏗️ Arquitetura e Tecnologias](#-arquitetura-e-tecnologias)
  - [📁 Estrutura de Diretórios](#-estrutura-de-diretórios)
  - [🏗️ Tecnologias utilizadas](#-tecnologias-utilizadas)
- [📦 Instalação e Deploy](#-instalação-e-deploy)
  - [1. Clone o repositório](#1-clone-o-repositório)
  - [2. Rode as migrations](#2-rode-as-migrations)
  - [3. Rode o servidor](#3-rode-o-servidor)
  - [4. Acesse a documentação da API](#4-acesse-a-documentação-da-api)
  - [5. Testes](#5-testes)
  - [6. Testes E2E](#6-testes-e2e)

---

## 🚀 Objetivo

A proposta do projeto é identificar quais produtores de filmes:

- Ganharam prêmios em **menor intervalo de tempo** (premiações consecutivas).
- Tiveram o **maior intervalo entre duas vitórias**.

A API processa um CSV contendo os vencedores e fornece um endpoint para consulta dessas informações.

---

## 🏗️ Arquitetura e Tecnologias

O projeto segue uma arquitetura modular inspirada em princípios da **Clean Architecture**, promovendo separação de responsabilidades, escalabilidade e facilidade de testes.

### 📁 Estrutura de Diretórios

```bash
src/
├── @types/           # Tipagens globais e utilitárias, usadas em todo o projeto
├── api/              # Controllers HTTP, rotas e decoradores expostos via REST
├── application/      # Casos de uso, lógica de orquestração e serviços de aplicação
├── common/           # Serviços genéricos e reutilizáveis: logger, env, validações, etc.
├── domain/           # Modelos de domínio, entidades, contratos e interfaces
├── infrastructure/   # Implementações externas: banco de dados, arquivos CSV, parsers
├── app.module.ts     # Módulo raiz da aplicação NestJS
├── application.ts    # Classe que inicializa o NestJS (usada em testes e produção)
└── main.ts           # Entrypoint principal da aplicação (usado em produção)
```

## 🏗️ Tecnologias utilizadas

O projeto segue uma arquitetura **modular e escalável**, baseada em:

- **NestJS** Framework escalável baseado em Node.js
- **Knex.js** Query builder SQL para múltiplos bancos relacionais
- **SQLite** Query builder SQL para múltiplos bancos relacionais
- **fast-csv** Leitura e parsing eficiente de arquivos CSV
- **p-limit** Controle de concorrência assíncrona
- **Zod** Validação de dados de ambiente e entrada
- **Clean Architecture-inspired layering** (`application`, `domain`, `infrastructure`)
- **Jest + SuperTest** Testes unitários e E2E
- **dotenv** Carregamento de variáveis de ambiente para ambientes como development, test e production
- **Swagger** Documentação da API com OpenAPI

---

## 📦 Instalação e Deploy

### 1. Clone o repositório

```bash
git clone https://github.com/EduardoDrozda/golden-raspberry-awards
cd golden-raspberry-awards

RUN npm install
```

### 2. Rode as migrations
```bash

# Copie o arquivo .env.example e renomeie para .env
# Se estiver usando Linux rode

cp .env.example .env

# Se estiver usando Windows rode
copy .env.example .env

npx knex migrate:latest
```

### 3. Rode o servidor

```bash
npm run start:dev
```

### 4. Acesse a documentação da API
A documentação Swagger estará disponível em: <a href="http://localhost:8080/api-docs" target="_blank">Link</a>

### 6. Testes E2E
Para rodar os testes E2E, execute:

```bash
npm run test:e2e
```
---
