# 📱 Driven Recharge API

API RESTful para sistema de recarga de celular desenvolvida em TypeScript.

## 🚀 Como executar

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações

# Executar em modo desenvolvimento
npm run dev
```

## 📋 Endpoints da API

### 📱 Telefones

#### `POST /phones`
Cadastra um novo telefone.

**Body:**
```json
{
  "number": "11999999999",
  "carrierId": 1,
  "name": "João Silva",
  "description": "Celular pessoal",
  "document": "12345678901"
}
```

**Responses:**
- `201`: Telefone criado com sucesso
- `409`: Número duplicado ou limite de 3 telefones por CPF excedido
- `422`: Dados inválidos

#### `GET /phones/:document`
Lista todos os telefones de um CPF.

**Response:**
```json
[
  {
    "id": 1,
    "number": "11999999999",
    "name": "João Silva",
    "description": "Celular pessoal",
    "document": "12345678901",
    "carrier": {
      "id": 1,
      "name": "Vivo",
      "code": 15
    }
  }
]
```

### 💳 Recargas

#### `POST /recharges`
Cria uma nova recarga.

**Body:**
```json
{
  "phoneId": 1,
  "amount": 30.00
}
```

**Responses:**
- `201`: Recarga criada com sucesso
- `404`: Telefone não encontrado
- `422`: Dados inválidos (valor deve estar entre R$10 e R$1000)

#### `GET /recharges/:number`
Lista todas as recargas de um número de telefone.

**Response:**
```json
[
  {
    "id": 1,
    "phoneId": 1,
    "amount": 30.00,
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
]
```

### 📄 Consolidado

#### `GET /summary/:document`
Retorna consolidado com todos os telefones e recargas de um CPF.

**Response:**
```json
{
  "document": "12345678901",
  "phones": [
    {
      "id": 1,
      "number": "11999999999",
      "name": "João Silva",
      "description": "Celular pessoal",
      "document": "12345678901",
      "carrier": {
        "id": 1,
        "name": "Vivo",
        "code": 15
      },
      "recharges": [
        {
          "id": 1,
          "phoneId": 1,
          "amount": 30.00,
          "timestamp": "2024-01-01T00:00:00.000Z"
        }
      ]
    }
  ]
}
```

## 🗄️ Banco de Dados

O projeto utiliza PostgreSQL. Execute o script SQL em `src/database/sql/schema.sql` para criar as tabelas necessárias.

## 🛠️ Tecnologias

- TypeScript
- Node.js
- Express
- PostgreSQL
- Joi
- dotenv
- pg

## 📝 Regras de Negócio

- Máximo de 3 telefones por CPF
- Números de telefone únicos no sistema
- Valores de recarga entre R$10 e R$1000
- CPF deve conter exatamente 11 dígitos
- Número de telefone deve conter exatamente 11 dígitos (com DDD) 