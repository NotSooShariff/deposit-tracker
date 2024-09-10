import { AlchemyProvider, Contract, ContractEventPayload } from 'ethers';
import { ALCHEMY_API_KEY, BEACON_DEPOSIT_CONTRACT_ADDRESS } from '../src/config/configuration';
import { Logger } from '../src/utils/log';
import { db } from '../src/database/database';
import { deposits } from '../src/database/schema';
import { fetchTransactionData, logDepositEvent, storeDepositInDatabase, handleDepositEvent, startTrackingDeposits } from '../src/utils/tracker';

jest.mock('ethers', () => {
  const mockProvider = {
    getBlock: jest.fn(),
    getTransaction: jest.fn(),
    getTransactionReceipt: jest.fn()
  };
  return {
    AlchemyProvider: jest.fn(() => mockProvider),
    Contract: jest.fn(() => mockProvider),
    ContractEventPayload: jest.fn()
  };
});

jest.mock('../src/config/configuration', () => ({
  ALCHEMY_API_KEY: 'test_key',
  BEACON_DEPOSIT_CONTRACT_ADDRESS: 'test_address'
}));

jest.mock('../src/utils/log', () => {
  return {
    Logger: jest.fn().mockImplementation(() => ({
      info: jest.fn(),
      error: jest.fn()
    }))
  };
});

jest.mock('../src/database/database', () => ({
  db: {
    insert: jest.fn().mockReturnThis(),
    values: jest.fn()
  }
}));

describe('Tracker', () => {
  const mockProvider = (AlchemyProvider as unknown as jest.Mock).mock.instances[0];
  const mockContract = (Contract as jest.Mock).mock.instances[0];
  const mockEvent = {
    log: {
      transactionHash: '0x123',
      blockNumber: 1
    }
  } as ContractEventPayload;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch transaction data', async () => {
    mockProvider.getBlock.mockResolvedValue({ timestamp: 1234567890 } as any);
    mockProvider.getTransaction.mockResolvedValue({ from: '0xabc', gasPrice: 1 } as any);
    mockProvider.getTransactionReceipt.mockResolvedValue({ gasUsed: 21000 } as any);

    const data = await fetchTransactionData('0x123', 1);
    expect(data).toEqual({
      block: { timestamp: 1234567890 },
      transaction: { from: '0xabc', gasPrice: 1 },
      transactionReceipt: { gasUsed: 21000 }
    });
  });

  it('should log deposit event', () => {
    const spy = jest.spyOn(Logger.prototype, 'info');
    logDepositEvent(1, '0x123', new Date(), '0xabc', 'pubkey', 'credentials', 'amount', 'signature', 'index', 'fee');
    expect(spy).toHaveBeenCalledWith(expect.any(String));
  });

  it('should store deposit in database', async () => {
    await storeDepositInDatabase('0x123', 1, new Date(), 'fee', 'pubkey');
    expect(db.insert).toHaveBeenCalledWith(deposits);
    expect(db.values).toHaveBeenCalledWith({
      hash: '0x123',
      blockNumber: '1',
      blockTimestamp: expect.any(Date),
      fee: 'fee',
      pubkey: 'pubkey'
    });
  });

  it('should handle deposit event', async () => {
    mockProvider.getBlock.mockResolvedValue({ timestamp: 1234567890 } as any);
    mockProvider.getTransaction.mockResolvedValue({ from: '0xabc', gasPrice: 1 } as any);
    mockProvider.getTransactionReceipt.mockResolvedValue({ gasUsed: 21000 } as any);

    await handleDepositEvent({
      pubkey: 'pubkey',
      withdrawal_credentials: 'credentials',
      amount: 'amount',
      signature: 'signature',
      index: 'index',
      event: mockEvent
    });

    expect(Logger.prototype.info).toHaveBeenCalled();
    expect(db.insert).toHaveBeenCalled();
  });

  it('should start tracking deposits', () => {
    startTrackingDeposits();
    expect(mockContract.on).toHaveBeenCalledWith('DepositEvent', expect.any(Function));
  });
});
