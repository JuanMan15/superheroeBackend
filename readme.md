# Superheroe Back (PostgreSQL)

## Estado actual

Este backend ya incluye:

- Auth con JWT (`register`, `login`)
- CRUD de heroes
- Endpoint de perfil protegido
- Knex configurado para PostgreSQL
- Migracion de tablas: `users`, `cat_superheroes`, `favorites`
- Seed inicial de heroes

## 1) Instalar dependencias

```bash
npm install
```

## 2) Configurar variables de entorno

Copia `.env.example` a `.env` y actualiza credenciales:

```env
PORT=3000
DATABASE_URL=postgresql://postgres:tu_password@localhost:5432/superheroedb
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=superheroedb
JWT_SECRET=super_secret_cambia_esto
```

## 3) Crear la base en PostgreSQL

```sql
CREATE DATABASE superheroedb;
```

## 4) Ejecutar migraciones y seed

```bash
npm run migrate
npm run seed
```

## 5) Levantar API

```bash
npm run dev
```

## Endpoints

- `GET /home`
- `GET /saludo?nombre=Juan&edad=25`
- `POST /auth/register`
- `POST /auth/login`
- `GET /heroes`
- `GET /heroes/:id`
- `POST /heroes` (Bearer token)
- `PUT /heroes/:id` (Bearer token)
- `DELETE /heroes/:id` (Bearer token)
- `GET /favorites/my` (Bearer token)
- `POST /favorites/:heroId` (Bearer token)
- `DELETE /favorites/:heroId` (Bearer token)
- `GET /users/profile` (Bearer token)

## Nota importante

Si ya corriste migraciones anteriores en MySQL o con otra estructura, en PostgreSQL ejecuta primero:

```bash
npx knex migrate:rollback --all --knexfile knexfile.ts --env development
npm run migrate
npm run seed
```
