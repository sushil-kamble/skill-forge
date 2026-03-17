import { Command } from 'commander';

import { initializeSkillForge } from '../core/init.js';

export const initCommand = new Command('init')
  .description('Initialize skill-forge')
  .action(async () => {
    await initializeSkillForge();
  });
