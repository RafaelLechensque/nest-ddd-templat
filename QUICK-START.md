# 🧪 Quick Start - Teste Rápido do TypeORM

## ✨ Resumo Executivo

Sua configuração TypeORM está **100% pronta** para uso em nível profissional.

## 🚀 Start em 5 Minutos

### Passo 1: Inicie o Docker

```bash
docker-compose up -d
```

✅ Aguarde ~10 segundos para o PostgreSQL estar pronto
✅ PgAdmin estará disponível em: http://localhost:5050

### Passo 2: Inicie a Aplicação

```bash
npm run start:dev
```

Você verá:

```
✓ Database connected successfully
Database: nest_ddd_dev | Host: localhost:5432
✓ Database connection validated
✓ Application listening on port 3000
```

### Passo 3: Verifique o Health Check

```bash
curl http://localhost:3000/health
```

Resposta esperada:

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

## 📊 Estrutura Implementada

```
✅ database.config.ts          → Configuração centralizada
✅ data-source.ts              → CLI migrations
✅ database-connection.service → Gerenciamento
✅ health.controller.ts        → API health checks
✅ .env.development            → Variáveis dev
✅ .env.test                   → Variáveis test
✅ .env.production             → Variáveis prod
✅ docker-compose.yml          → PostgreSQL + PgAdmin
✅ ormconfig.json              → Config TypeORM
✅ DATABASE-SETUP.md           → Guia completo
✅ TYPEORM-SETUP.md            → Quick reference
```

## 🎯 Recuros Prontos para Usar

### ✅ Health Checks

```bash
# Status geral
curl http://localhost:3000/health

# Status do banco apenas
curl http://localhost:3000/health/db
```

### ✅ Migrações

```bash
# Criar nova migração
npm run db:migration:create -- -n NovaTabela

# Gerar automaticamente da entity
npm run db:migration:generate -- -n CreateNovaTabela

# Executar migrações
npm run db:migration:run

# Reverter última
npm run db:migration:revert

# Ver status
npm run db:migration:show
```

### ✅ Seed de Dados

```bash
# Executar seed
npm run db:seed
```

### ✅ Users Module (já funcionando)

```bash
# Criar usuário
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"João","email":"joao@example.com","password":"123456"}'

# Listar usuários
curl http://localhost:3000/users

# Detalhes de um usuário
curl http://localhost:3000/users/{id}

# Atualizar usuário
curl -X PATCH http://localhost:3000/users/{id} \
  -H "Content-Type: application/json" \
  -d '{"name":"João Silva"}'

# Deletar usuário
curl -X DELETE http://localhost:3000/users/{id}
```

## 📚 Padrões Usados

```typescript
// ✅ InjectRepository (NestJS + TypeORM)
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}

// ✅ DatabaseConnectionService (para casos avançados)
@Injectable()
export class MyService {
  constructor(private dbService: DatabaseConnectionService) {}

  async getData() {
    const repo = this.dbService.getRepository<User>(User);
    return repo.find();
  }
}
```

## 🔧 Variáveis de Ambiente

### Development (.env.development)

```env
NODE_ENV=development
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres123
POSTGRES_DB=nest_ddd_dev
PORT=3000
```

### Test (.env.test)

```env
NODE_ENV=test
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres123
POSTGRES_DB=nest_ddd_test
PORT=3001
```

## 🐛 Troubleshooting

### ❌ "Connection refused"

```bash
# Verificar se PostgreSQL está rodando
docker-compose ps

# Reiniciar se necessário
docker-compose restart db
```

### ❌ "Database already exists"

```bash
# Limpar volume PostgreSQL
docker-compose down -v
docker-compose up -d
```

### ❌ Migração não funciona

```bash
# Build necessário
npm run build

# Então execute
npm run db:migration:run
```

## 📖 Leia Mais

- **DATABASE-SETUP.md**: Guia completo (5000+ palavras)
- **TYPEORM-SETUP.md**: Quick reference
- [TypeORM Docs](https://typeorm.io)
- [NestJS Database](https://docs.nestjs.com/techniques/database)

## ✅ Checklist de Setup

- [ ] Docker iniciado (`docker-compose up -d`)
- [ ] Aplicação rodando (`npm run start:dev`)
- [ ] Health check OK (`curl http://localhost:3000/health`)
- [ ] PostgreSQL responsivo
- [ ] PgAdmin acessível em http://localhost:5050

## 🎉 Status

✅ **Configuração Concluída**
✅ **Pronto para Desenvolvimento**
✅ **Padrões Enterprise Implementados**
✅ **Documentação Completa**
✅ **Health Checks Funcionando**

---

**Você está pronto para começar a desenvolver! 🚀**

Próximos passos:

1. Crie suas entities em `src/{domain}/entities/`
2. Gere migrações: `npm run db:migration:generate`
3. Execute migrações: `npm run db:migration:run`
4. Implemente seus repositórios e serviços
5. Teste seus endpoints

**Boa sorte! 💪**
