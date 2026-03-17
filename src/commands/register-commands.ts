import { Command } from 'commander';

import { createCommand } from './create.js';
import { editCommand } from './edit.js';
import { initCommand } from './init.js';
import { installCommand } from './install.js';
import { listCommand } from './list.js';
import { pushCommand } from './push.js';
import { removeCommand } from './remove.js';
import { syncCommand } from './sync.js';

export function registerCommands(program: Command): void {
  [
    initCommand,
    createCommand,
    listCommand,
    editCommand,
    removeCommand,
    pushCommand,
    syncCommand,
    installCommand,
  ].forEach((command) => {
    program.addCommand(command);
  });
}
