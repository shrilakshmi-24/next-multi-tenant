import { drizzle } from 'drizzle-orm/node-postgres';

export const db = drizzle({
  connection: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "multi_tenant_next",
    ssl: false,
  },
});
