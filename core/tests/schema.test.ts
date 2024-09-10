import { deposits } from '../src/database/schema';
import { text, pgTable, timestamp } from 'drizzle-orm/pg-core';

describe('Schema', () => {
  it('should define the deposits table correctly', () => {
    expect(deposits).toEqual(
      pgTable('deposits', {
        hash: text('hash').primaryKey(),
        blockNumber: text('blockNumber').notNull(),
        blockTimestamp: timestamp('blockTimestamp', { withTimezone: true }).notNull(),
        fee: text('fee'),
        pubkey: text('pubkey').notNull()
      })
    );
  });
});
