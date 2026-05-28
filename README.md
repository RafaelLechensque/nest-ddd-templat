<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# 🚀 NestJS DDD Template - TypeORM Senior Setup

> A progressive Node.js framework template with professional TypeORM database connection setup, following Domain-Driven Design (DDD) principles and enterprise best practices.

[![NestJS](https://img.shields.io/badge/NestJS-11.0-red?style=flat-square)](https://nestjs.com)
[![TypeORM](https://img.shields.io/badge/TypeORM-1.0-orange?style=flat-square)](https://typeorm.io)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?style=flat-square)](https://postgresql.org)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?style=flat-square)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square)](https://www.typescriptlang.org)

---

## 📋 About This Project

This is a **production-ready NestJS starter** with a **senior-level TypeORM database configuration** including:

✅ Multi-environment configuration (dev/test/prod)  
✅ Automated database migrations  
✅ Health checks and connection validation  
✅ Professional logging and monitoring  
✅ Security best practices  
✅ Docker Compose setup with PostgreSQL + PgAdmin  
✅ Complete documentation  
✅ DDD-ready architecture

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (or npm)
- Docker & Docker Compose

### 1️⃣ Start Database

```bash
docker-compose up -d
```

### 2️⃣ Install Dependencies

```bash
pnpm install
```

### 3️⃣ Run Application

```bash
pnpm run start:dev
```

### 4️⃣ Verify Setup

```bash
curl http://localhost:3000/health
```

Expected response:

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

---

## 📚 Documentation

| Document                                     | Purpose                    | Read Time |
| -------------------------------------------- | -------------------------- | --------- |
| **[QUICK-START.md](./QUICK-START.md)**       | Get started in 5 minutes   | 5 min     |
| **[TYPEORM-SETUP.md](./TYPEORM-SETUP.md)**   | Setup reference            | 10 min    |
| **[DATABASE-SETUP.md](./DATABASE-SETUP.md)** | Complete guide             | 20 min    |
| **[SETUP-SUMMARY.md](./SETUP-SUMMARY.md)**   | Executive summary          | 10 min    |
| **[FILES-INDEX.md](./FILES-INDEX.md)**       | All files created/modified | 15 min    |

---

## 🛠️ Available Scripts

```bash
# Development
pnpm run start                # Start application
pnpm run start:dev           # Start with watch mode
pnpm run start:debug         # Start with debugger
pnpm run start:prod          # Start production build

# Database Migrations
pnpm run db:migration:create -- -n MigrationName
pnpm run db:migration:generate -- -n MigrationName
pnpm run db:migration:run
pnpm run db:migration:revert
pnpm run db:migration:show

# Database Seeding
pnpm run db:seed

# Code Quality
pnpm run lint                # Run ESLint
pnpm run format              # Format code with Prettier

# Testing
pnpm run test                # Run unit tests
pnpm run test:watch          # Run tests in watch mode
pnpm run test:cov            # Run tests with coverage
pnpm run test:e2e            # Run E2E tests

# Build
pnpm run build               # Compile TypeScript
```

---

## 📦 Project Structure

```
src/
├── app.module.ts               # Main application module
├── main.ts                     # Application bootstrap
├── database.config.ts          # TypeORM configuration
├── data-source.ts              # CLI data source
├── database-connection.service.ts # Connection manager
├── health.controller.ts        # Health check endpoints
├── users/                      # Users module (example)
│   ├── entities/
│   ├── dtos/
│   ├── users.module.ts
│   ├── users.service.ts
│   └── users.controller.ts
└── database/
    ├── migrations/             # Database migrations
    └── seeds/                  # Seed scripts
```

---

## 🗄️ Database Setup

### PostgreSQL Configuration

**Development** (`.env.development`):

```env
NODE_ENV=development
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres123
POSTGRES_DB=nest_ddd_dev
```

**Test** (`.env.test`):

```env
NODE_ENV=test
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres123
POSTGRES_DB=nest_ddd_test
```

**Production** (`.env.production`):
Set these as environment variables in your deployment platform.

### Docker Services

```bash
# PostgreSQL (Port: 5432)
docker-compose up db

# PgAdmin (Port: 5050)
# Access: http://localhost:5050
# Email: admin@example.com
# Password: admin
```

---

## 🔄 Database Migrations

### Generate a Migration

```bash
pnpm run db:migration:generate -- -n CreateUsersTable
```

### Run Migrations

```bash
pnpm run db:migration:run
```

### Revert Last Migration

```bash
pnpm run db:migration:revert
```

### View Migration Status

```bash
pnpm run db:migration:show
```

---

## 🏥 Health Checks

### API Endpoints

**General Health**:

```bash
GET /health
```

**Database Health**:

```bash
GET /health/db
```

### Automatic Validation

The application validates database connection on startup and fails fast if unavailable:

```
✓ Database connected successfully
Database: nest_ddd_dev | Host: localhost:5432
✓ Database connection validated
✓ Application listening on port 3000
```

---

## 🎓 Usage Examples

### Creating an Entity

```typescript
// src/products/entities/product.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
```

### Using Repository Pattern

```typescript
// src/products/products.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findById(id: string): Promise<Product> {
    return this.productRepository.findOne({ where: { id } });
  }

  async create(data: Partial<Product>): Promise<Product> {
    const product = this.productRepository.create(data);
    return this.productRepository.save(product);
  }
}
```

---

## 🔒 Security Features

✅ Environment-based configuration  
✅ SSL/TLS for production databases  
✅ Connection timeout protection  
✅ Sensitive data excluded from logs  
✅ Password fields marked as `select: false`  
✅ Migration version control  
✅ Secure dependency management

---

## 🌍 Environment Variables

### Development

```bash
NODE_ENV=development
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres123
POSTGRES_DB=nest_ddd_dev
PORT=3000
```

### Production

Set these via your deployment platform:

- `NODE_ENV=production`
- `POSTGRES_HOST`
- `POSTGRES_PORT`
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DB`

---

## 📊 Logging

### Development

- Query logging enabled
- All SQL statements logged
- Full stack traces

### Production

- Only errors and warnings logged
- Query logging disabled
- Performance optimized

---

## 🐛 Troubleshooting

| Issue              | Solution                                         |
| ------------------ | ------------------------------------------------ |
| Connection refused | Run `docker-compose restart db`                  |
| Port 5432 in use   | `docker-compose down -v && docker-compose up -d` |
| Migrations fail    | Run `pnpm run build` first                       |
| .env not loading   | Check file exists and path is correct            |

---

## 📖 Learn More

- [NestJS Documentation](https://docs.nestjs.com)
- [TypeORM Documentation](https://typeorm.io)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)
- [Domain-Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design)

---

## 📝 License

This project is MIT licensed - see [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Please follow the existing code style and conventions.

---

## 📞 Support

For issues and questions:

1. Check the [documentation](./DATABASE-SETUP.md)
2. Review [troubleshooting guide](./QUICK-START.md#-troubleshooting)
3. Open an issue on GitHub

---

## 🎉 Next Steps

1. Create your entities in `src/{domain}/entities/`
2. Generate migrations: `pnpm run db:migration:generate`
3. Run migrations: `pnpm run db:migration:run`
4. Implement services and controllers
5. Write tests
6. Deploy to production

---

**Built with ❤️ following enterprise best practices**

Happy coding! 🚀
