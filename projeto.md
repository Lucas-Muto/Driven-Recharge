# Projeto: Driven Recharge 📱⚡

## 🧾 Descrição Geral
Desenvolver uma API RESTful utilizando **TypeScript** que permita que usuários recarreguem créditos de celular. A aplicação simula o serviço de recarga oferecido por farmácias, mercados e lotéricas.

Entrega obrigatória até **01/08 às 23:59** para aprovação no módulo.

---

## 🧰 Tecnologias obrigatórias
- TypeScript
- Node.js
- Express
- PostgreSQL
- Joi (validação de schemas)
- dotenv
- pg (biblioteca para PostgreSQL)
- Git + GitHub (com versionamento e commits por funcionalidade)

---

## 🗂 Estrutura sugerida do projeto
```
src/
├── controllers/
├── services/
├── repositories/
├── routes/
├── middlewares/
├── protocols/         # Para os tipos TypeScript
├── utils/
├── config/
├── database/
│   └── sql/
│       └── schema.sql
├── app.ts
└── server.ts
```

---

## 🔐 Entidades e Funcionalidades

### 📱 Telefones (/phones)
#### POST `/phones`
- Campos obrigatórios:
  - `number` (com DDD, ex: 11999999999)
  - `carrierId`
  - `name`
  - `description`
  - `document` (CPF)
- Regras:
  - Até 3 números por CPF
  - Números duplicados não são permitidos
  - Respostas:
    - 201: criado com sucesso
    - 409: número duplicado ou excedeu o limite

#### GET `/phones/:document`
- Lista todos os telefones cadastrados de um cliente (CPF)
- Retorna array vazio se nenhum encontrado

---

### 💳 Recargas (/recharges)
#### POST `/recharges`
- Campos obrigatórios:
  - `phoneId`
  - `amount` (entre R$10 e R$1000)
- Regras:
  - Telefone deve existir
  - Respostas:
    - 201: criada com sucesso
    - 404: telefone não encontrado

#### GET `/recharges/:number`
- Lista todas as recargas de um número de telefone
- Retorna array vazio se nenhuma encontrada

---

### 📄 Consolidado (/summary/:document)
#### GET `/summary/:document`
- Retorna todos os números e suas recargas vinculadas ao CPF
- Formato:
```json
{
  "document": "string",
  "phones": [
    {
      "id": 1,
      "number": "11999999999",
      "carrier": {
        "id": 1,
        "name": "Vivo",
        "code": 15
      },
      "recharges": [
        {
          "id": 1,
          "amount": 30,
          "timestamp": "2024-01-01T00:00:00Z"
        }
      ]
    }
  ]
}
```

---

## 🧪 Validações e Middlewares
- Middleware de validação genérico usando **Joi**
- Middleware único para tratamento de erros (centralizado)
- Status codes adequados: 201, 409, 422, 404, etc

---

## 🧱 Script SQL obrigatório
Crie um arquivo `sql/schema.sql` com o seguinte conteúdo:
```sql
CREATE TABLE carriers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  code INT NOT NULL
);

INSERT INTO carriers (name, code) VALUES ('Vivo', 15);
INSERT INTO carriers (name, code) VALUES ('Tim', 41);
INSERT INTO carriers (name, code) VALUES ('Oi', 31);
INSERT INTO carriers (name, code) VALUES ('Claro', 21);
```

---

## 🚀 Instruções para execução
```bash
# Instale as dependências
npm install

# Configure o arquivo .env
DATABASE_URL=postgresql://usuario:senha@host:porta/database

# Rode as queries manuais no banco (via DBeaver, psql, etc)

# Inicie a aplicação
npm run dev
```

---

## ✅ Critérios de Aceitação
- API funcional com os endpoints obrigatórios
- Estrutura de pastas em camadas (router, controller, service, repository)
- Sem uso de `any`, com tipos em `/protocols`
- Uso correto de Joi, pg e dotenv
- Script SQL incluído no projeto
- Projeto versionado com commits frequentes
- Deploy realizado no Render (ou similar) com link no README

---

## 📤 Entrega
- Projeto hospedado no GitHub (repositório público)
- Link do deploy e instruções no README.md
- Entrega via plataforma Driven até a data limite

Boa sorte! 🚀
