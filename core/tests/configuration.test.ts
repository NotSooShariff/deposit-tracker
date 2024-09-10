import { ALCHEMY_API_KEY, BEACON_DEPOSIT_CONTRACT_ADDRESS } from '../src/config/configuration';
import * as dotenv from 'dotenv';
import { Logger } from '../src/utils/log';
 
jest.mock('dotenv', () => ({
  config: jest.fn()
}));

jest.mock('../src/utils/log', () => {
  return {
    Logger: jest.fn().mockImplementation(() => ({
      info: jest.fn(),
      error: jest.fn()
    }))
  };
});

describe('Configuration', () => {
  beforeEach(() => {
    process.env.ALCHEMY_API_KEY = 'test_key';
    process.env.BEACON_DEPOSIT_CONTRACT_ADDRESS = 'test_address';
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('should load ALCHEMY_API_KEY successfully', () => {
    expect(ALCHEMY_API_KEY).toBe('test_key');
  });

  it('should throw an error if ALCHEMY_API_KEY is missing', () => {
    delete process.env.ALCHEMY_API_KEY;
    expect(() => require('../src/config/configuration')).toThrow('Missing ALCHEMY_API_KEY');
  });

  it('should load BEACON_DEPOSIT_CONTRACT_ADDRESS successfully', () => {
    expect(BEACON_DEPOSIT_CONTRACT_ADDRESS).toBe('test_address');
  });

  it('should throw an error if BEACON_DEPOSIT_CONTRACT_ADDRESS is missing', () => {
    delete process.env.BEACON_DEPOSIT_CONTRACT_ADDRESS;
    expect(() => require('../src/config/configuration')).toThrow('Missing BEACON_DEPOSIT_CONTRACT_ADDRESS');
  });
});
