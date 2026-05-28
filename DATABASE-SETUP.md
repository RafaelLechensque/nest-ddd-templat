# TypeORM Database Setup - Guia Senior

## 📋 Overview

Esta é uma configuração profissional de TypeORM com NestJS, seguindo padrões enterprise e best practices de desenvolvimento.

## 🏗️ Arquitetura

### Estrutura de Arquivos

```
src/
├── database.config.ts          # Configuração centralizada TypeORM
├── data-source.ts              # DataSource para migrações CLI
├── database-connection.service.ts # Gerenciador de conexão
├── health.controller.ts         # Health checks
├── database/
│   ├── migrations/              # Migrações do banco
│   └── seeds/                   # Seed de dados
└── **/*.entity.ts               # Entities (padrão: arquivo.entity.ts)
```

## 🚀 Configuração

### Variáveis de Ambiente

#### `.env.development`

```
NODE_ENV=development
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres123
POSTGRES_DB=nest_ddd_dev
PORT=3000
```

#### `.env.test`

```
NODE_ENV=test
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres123
POSTGRES_DB=nest_ddd_test
PORT=3001
```

#### `.env.production`

Use variáveis de ambiente injetadas pelo seu deployment:

```
NODE_ENV=production
POSTGRES_HOST=${DB_HOST}
POSTGRES_PORT=${DB_PORT}
POSTGRES_USER=${DB_USER}
POSTGRES_PASSWORD=${DB_PASSWORD}
POSTGRES_DB=${DB_NAME}
```

## 🐳 Docker Setup

### Iniciar o PostgreSQL

```bash
docker-compose up -d
```

### Acessar PgAdmin

- URL: http://localhost:5050
- Email: admin@example.com
- Senha: admin

## 💾 Migrações

### Gerar Migração

```bash
npm run db:migration:generate -- -n CreateUsersTable
```

### Executar Migrações

```bash
npm run db:migration:run
```

### Reverter Última Migração

```bash
npm run db:migration:revert
```

### Mostrar Status das Migrações

```bash
npm run db:migration:show
```

## 📝 Criar uma Entity

```typescript
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  password?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
```

## 🔄 Repository Pattern

### Usando DatabaseConnectionService

```typescript
import { Injectable } from '@nestjs/common';
import { DatabaseConnectionService } from './database-connection.service';
import { User } from './users/entities/user.entity';

@Injectable()
export class UserService {
  constructor(private dbService: DatabaseConnectionService) {}

  async findAll(): Promise<User[]> {
    const userRepository = this.dbService.getRepository<User>(User);
    return userRepository.find();
  }

  async findById(id: string): Promise<User> {
    const userRepository = this.dbService.getRepository<User>(User);
    return userRepository.findOne({ where: { id } });
  }
}
```

## 🏥 Health Checks

### Verificar Saúde do Banco

```bash
curl http://localhost:3000/health
curl http://localhost:3000/health/db
```

### Resposta

```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "database": {
    "status": "healthy",
    "database": "nest_ddd_dev"
  }
}
```

## 🔧 Configurações Avançadas

### Database Config (src/database.config.ts)

| Opção                   | Desenvolvimento       | Produção       |
| ----------------------- | --------------------- | -------------- |
| `synchronize`           | ✅ true               | ❌ false       |
| `logging`               | ✅ query, error, warn | ❌ error, warn |
| `poolSize`              | 5                     | 20             |
| `SSL`                   | ❌ false              | ✅ true        |
| `maxQueryExecutionTime` | -                     | 1000ms         |

### Migrations

- **Auto-run em Produção**: Ativado por padrão
- **TypeORM CLI**: Suporta criar, gerar e reverter migrações
- **Versionamento**: Automático com timestamp

## 📊 Monitoramento

### Logs Estruturados

```
✓ Database connected successfully
Database: nest_ddd_dev | Host: localhost:5432
✓ Database connection validated
✓ Application listening on port 3000
```

### Query Logging

Em desenvolvimento, todas as queries SQL são logadas:

```
query: SELECT ... FROM "users" WHERE ...
```

## ⚠️ Tratamento de Erros

### Validação de Conexão no Bootstrap

Se a conexão falhar no startup:

```
Failed to connect to database: Connection refused
Application startup failed: Connection refused
```

### Health Check Automático

O serviço `DatabaseConnectionService` executa um health check ao inicializar.

## 🎯 Best Practices Implementadas

✅ **Configuração por Ambiente**: Diferentes configs para dev/test/prod  
✅ **Type Safety**: Repositórios tipados com genéricos  
✅ **Connection Pooling**: Otimizado por ambiente  
✅ **Logging Estruturado**: Query logging em dev, apenas erros em prod  
✅ **Health Checks**: Validação automática na startup  
✅ **Migrations Versionadas**: Controle de versão do schema  
✅ **SSL em Produção**: Segurança em ambiente produtivo  
✅ **Timezone UTC**: Consistência em múltiplas regiões

## 🔐 Segurança

- ❌ `.env*` files no .gitignore
- ✅ Variáveis sensíveis via environment
- ✅ SSL obrigatório em produção
- ✅ Connection timeout configurado (10s)

## 📚 Recursos Adicionais

- [TypeORM Docs](https://typeorm.io)
- [NestJS TypeORM](https://docs.nestjs.com/techniques/database)
- [PostgreSQL Best Practices](https://wiki.postgresql.org/wiki/Performance_Optimization)

## 🤝 Próximos Passos

1. Criar entities para suas domains
2. Gerar migrações: `npm run db:migration:generate`
3. Executar migrações: `npm run db:migration:run`
4. Implementar repositories para cada domain
5. Criar seeds para dados de teste

---

**Desenvolvido com ❤️ em padrões Enterprise**
