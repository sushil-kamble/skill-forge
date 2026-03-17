import { Command } from 'commander';

import { editSkill } from '../core/skills.js';

export const editCommand = new Command('edit')
  .description('Edit an existing skill')
  .argument('[name]', 'Skill name')
  .action(async (name?: string) => {
    await editSkill(name ? { name } : {});
  });
