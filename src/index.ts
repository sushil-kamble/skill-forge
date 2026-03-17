#!/usr/bin/env node

import { Command } from 'commander';

import { registerCommands } from './commands/register-commands.js';
import { getErrorMessage } from './utils/errors.js';
import { logger, setDebugMode } from './utils/logger.js';
import { getPackageVersion } from './utils/version.js';

async function main(): Promise<void> {
  const version = await getPackageVersion();
  const program = new Command();

  program
    .name('skill-forge')
    .description('Author and manage a personal agent skills registry.')
    .version(version)
    .option('--debug', 'Enable verbose logging');

  program.hook('preAction', (command) => {
    const options = command.optsWithGlobals<{ debug?: boolean }>();
    setDebugMode(Boolean(options.debug));
    logger.debug('Debug logging enabled');
  });

  registerCommands(program);

  if (process.argv.length <= 2) {
    program.outputHelp();
    return;
  }

  await program.parseAsync(process.argv);
}

main().catch((error: unknown) => {
  logger.error(getErrorMessage(error));
  process.exitCode = 1;
});
