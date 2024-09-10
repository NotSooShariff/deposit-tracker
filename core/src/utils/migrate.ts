import 'dotenv/config';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db, connection } from './database/database';

export const doMigration = async () => {
  await migrate(db, { migrationsFolder: './drizzle' });
};
