import type { Command } from 'commander';

import { createCommand } from './create.js';
import { doctorCommand } from './doctor.js';
import { editCommand } from './edit.js';
import { initCommand } from './init.js';
import { installCommand } from './install.js';
import { listCommand } from './list.js';
import { pullCommand } from './pull.js';
import { pushCommand } from './push.js';
import { removeCommand } from './remove.js';
import { unloadCommand } from './unload.js';

export function registerCommands(program: Command): void {
  [
    initCommand,
    doctorCommand,
    createCommand,
    listCommand,
    editCommand,
    removeCommand,
    pushCommand,
    pullCommand,
    installCommand,
    unloadCommand,
  ].forEach((command) => {
    program.addCommand(command);
  });
}
