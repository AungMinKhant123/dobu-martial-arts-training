# How To Run Backend

1. Clone the repository:

```bash
git clone <repository-url>
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=dobu_db

PORT=5001

DATABASE_URL="mysql://root:password@localhost:3306/dobu_db"
```

> Replace the database credentials with your local MySQL configuration.

4. Create the database:

```sql
CREATE DATABASE dobu_db;
```

5. Run Prisma migrations:

```bash
npx prisma migrate dev
```

6. Generate the Prisma Client:

```bash
npx prisma generate
```

7. Seed the database (optional but recommended):

```bash
npx prisma db seed
```

> This command inserts the initial development data, such as the default admin account and other sample data required for the application.

8. Start the development server:

```bash
npm run dev
```

9. The backend server will be available at:

```text
http://localhost:5001
```
