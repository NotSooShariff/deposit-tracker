import { connection, db } from '../src/database/database';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';

jest.mock('postgres', () => jest.fn());
jest.mock('drizzle-orm/postgres-js', () => ({
  drizzle: jest.fn()
}));

describe('Database', () => {
  it('should initialize the database connection', () => {
    expect(postgres).toHaveBeenCalledWith(process.env.DATABASE_URL);
    expect(drizzle).toHaveBeenCalledWith(connection);
  });
});
