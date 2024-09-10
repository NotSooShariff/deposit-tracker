import { doMigration } from '../src/utils/migrate';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from '../src/database/database';

jest.mock('drizzle-orm/postgres-js/migrator', () => ({
  migrate: jest.fn()
}));

describe('Migrate', () => {
  it('should call migrate function', async () => {
    await doMigration();
    expect(migrate).toHaveBeenCalledWith(db, { migrationsFolder: './drizzle' });
  });
});
