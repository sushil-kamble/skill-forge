import { Command } from 'commander';

import { createSkill } from '../core/skills.js';

export const createCommand = new Command('create')
  .description('Create a new skill')
  .argument('[name]', 'Skill name')
  .action(async (name?: string) => {
    await createSkill(name ? { name } : {});
  });
