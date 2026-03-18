import { Command } from 'commander';

import { unloadSkillPod } from '../core/unload.js';

export const unloadCommand = new Command('unload')
  .description('Remove skillpod configuration, local registry, and stored credentials')
  .action(async () => {
    await unloadSkillPod();
  });
