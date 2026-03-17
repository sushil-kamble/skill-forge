import { Command } from 'commander';

import { listSkills } from '../core/skills.js';

export const listCommand = new Command('list')
  .description('List available skills')
  .action(async () => {
    await listSkills();
  });
