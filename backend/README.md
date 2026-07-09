# How To Run Backend

1. Go to backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=dobu_db
PORT=5001
DATABASE_URL="mysql://root:password@localhost:3306/dobu_db"
```

4. Create database:

```sql
CREATE DATABASE dobu_db;
```

5. Run migrations:

```bash
npx prisma migrate dev
```

6. Generate Prisma client:

```bash
npx prisma generate
```

7. Start backend:

```bash
npm run dev
```

8. Open API:

```text
http://localhost:5001
```
