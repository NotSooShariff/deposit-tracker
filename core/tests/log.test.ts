import { Logger, LogLevel } from '../src/utils/log';

describe('Logger', () => {
  let logger: Logger;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new Logger();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should log info messages correctly', () => {
    logger.info('Info message');
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(LogLevel.INFO), expect.any(String));
  });

  it('should log error messages correctly', () => {
    logger.error('Error message');
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining(LogLevel.ERROR), expect.any(String));
  });
});
