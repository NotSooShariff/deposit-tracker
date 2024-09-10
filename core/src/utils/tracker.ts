import { AlchemyProvider, Contract, ContractEventPayload } from 'ethers';
import { ALCHEMY_API_KEY, BEACON_DEPOSIT_CONTRACT_ADDRESS } from '../config/configuration';
import { Logger } from './log';
import { db } from '../database/database';
import { deposits } from '../database/schema';

const logger = new Logger();


const provider = new AlchemyProvider('homestead', ALCHEMY_API_KEY);

const depositEventAbi = [
  'event DepositEvent(bytes pubkey, bytes withdrawal_credentials, bytes amount, bytes signature, bytes index)',
];

const contract = new Contract(BEACON_DEPOSIT_CONTRACT_ADDRESS, depositEventAbi, { provider });


interface DepositEventPayload {
  pubkey: string;
  withdrawal_credentials: string;
  amount: string;
  signature: string;
  index: string;
  event: ContractEventPayload;
}

const fetchTransactionData = async (transactionHash: string, blockNumber: number) => {
  const block = await provider.getBlock(blockNumber);
  if (!block) throw new Error('Block not found');

  const transaction = await provider.getTransaction(transactionHash);
  if (!transaction) throw new Error('Transaction not found');

  const transactionReceipt = await provider.getTransactionReceipt(transactionHash);
  if (!transactionReceipt) throw new Error('Transaction receipt not found');

  return { block, transaction, transactionReceipt };
};

const logDepositEvent = (
  blockNumber: number,
  transactionHash: string,
  timestamp: Date,
  senderAddress: string,
  pubkey: string,
  withdrawal_credentials: string,
  amount: string,
  signature: string,
  index: string,
  fee: string
) => {
  logger.info(
    JSON.stringify({
      blockNumber,
      transactionHash,
      timestamp,
      senderAddress,
      pubkey,
      withdrawal_credentials,
      amount,
      signature,
      index,
      fee,
    })
  );
  
};

const storeDepositInDatabase = async (
  transactionHash: string,
  blockNumber: number,
  timestamp: Date,
  fee: string,
  pubkey: string
) => {
  await db.insert(deposits).values({
    hash: transactionHash,
    blockNumber: blockNumber.toString(),
    blockTimestamp: timestamp,
    fee,
    pubkey,
  });
};

const handleDepositEvent = async ({
  pubkey,
  withdrawal_credentials,
  amount,
  signature,
  index,
  event,
}: DepositEventPayload): Promise<void> => {
  try {
    const { transactionHash, blockNumber } = event.log;
    const { block, transaction, transactionReceipt } = await fetchTransactionData(transactionHash, blockNumber);

    const fee = transactionReceipt.gasUsed * transaction.gasPrice;
    const senderAddress = transaction.from;
    const timestamp = new Date(block.timestamp * 1000);

    logDepositEvent(blockNumber, transactionHash, timestamp, senderAddress, pubkey, withdrawal_credentials, amount, signature, index, fee.toString());
    await storeDepositInDatabase(transactionHash, blockNumber, timestamp, fee.toString(), pubkey);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error processing deposit event: ${error.message}`);
    } else {
      logger.error(`Error processing deposit event: ${JSON.stringify(error)}`);
    }
  }
  
};

export const startTrackingDeposits = () => {
  contract.on('DepositEvent', (pubkey, withdrawal_credentials, amount, signature, index, event) => {
    handleDepositEvent({ pubkey, withdrawal_credentials, amount, signature, index, event });
  });
};
