import { Command } from 'commander';

import { logger } from '../utils/logger.js';

export function createStubCommand(name: string, description: string): Command {
  return new Command(name)
    .description(description)
    .action(() => {
      logger.debug(`Executing "${name}" command`);
      logger.info(`[${name}]: not yet implemented`);
    });
}
