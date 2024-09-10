import * as dotenv from 'dotenv';
import { Logger } from '../utils/log';

const logger = new Logger();
dotenv.config();

// Load ALCHEMY_API_KEY from env, throw error if not found
export const ALCHEMY_API_KEY = (() => {
  const key = process.env.ALCHEMY_API_KEY;
  if (!key) {
    logger.error('ALCHEMY_API_KEY is missing from environment variables');
    throw new Error('Missing ALCHEMY_API_KEY');
  }
  logger.info('ALCHEMY_API_KEY loaded successfully');
  return key;
})();

// Load BEACON_DEPOSIT_CONTRACT_ADDRESS from env, throw error if not found
export const BEACON_DEPOSIT_CONTRACT_ADDRESS = (() => {
  const address = process.env.BEACON_DEPOSIT_CONTRACT_ADDRESS;
  if (!address) {
    logger.error('BEACON_DEPOSIT_CONTRACT_ADDRESS is missing from environment variables');
    throw new Error('Missing BEACON_DEPOSIT_CONTRACT_ADDRESS');
  }
  logger.info('BEACON_DEPOSIT_CONTRACT_ADDRESS loaded successfully');
  return address;
})();
