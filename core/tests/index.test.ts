import { main } from '../src/index';
import { doMigration } from '../src/utils/migrate';
import { startTrackingDeposits } from '../src/utils/tracker';
import { Logger } from '../src/utils/log';

jest.mock('../src/utils/migrate', () => ({
  doMigration: jest.fn()
}));

jest.mock('../src/utils/tracker', () => ({
  startTrackingDeposits: jest.fn()
}));

jest.mock('../src/utils/log', () => {
  return {
    Logger: jest.fn().mockImplementation(() => ({
      info: jest.fn(),
      error: jest.fn()
    }))
  };
});

describe('Index', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should execute migrations and start tracking deposits', async () => {
    await main();
    expect(Logger.prototype.info).toHaveBeenCalledWith('Executing migrations');
    expect(doMigration).toHaveBeenCalled();
    expect(Logger.prototype.info).toHaveBeenCalledWith('Starting tracker...');
    expect(startTrackingDeposits).toHaveBeenCalled();
  });

  it('should handle errors', async () => {
    (doMigration as jest.Mock).mockRejectedValueOnce(new Error('Migration error'));
    await main();
    expect(Logger.prototype.error).toHaveBeenCalledWith('Migration error');
  });
});
