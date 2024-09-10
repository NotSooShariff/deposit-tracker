import { Logger } from './utils/log';
import { doMigration } from './utils/migrate';
import { startTrackingDeposits } from './utils/tracker';

const logger = new Logger();

async function main() {
  try {
    logger.info('Executing migrations');
    await doMigration();

    logger.info('Starting tracker...');
    startTrackingDeposits();
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message); 
    } else {
      logger.error(JSON.stringify(error));
    }
  }
  
}

main();
