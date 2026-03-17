import assert from 'node:assert/strict';
import test from 'node:test';

import {
  SKILL_CREATOR_SOURCE,
  SUPPORTED_SKILL_CREATOR_AGENTS,
  createSkillCreatorService,
  skillCreatorInternals,
} from './skill-creator.js';

test('detectAvailability reports installed and missing agents from skills ls output', async () => {
  const service = createSkillCreatorService({
    async run(_command, args) {
      const agent = args[args.length - 1];

      if (agent === 'claude-code' || agent === 'codex') {
        return { stdout: 'skill-creator\nother-skill\n' };
      }

      return { stdout: 'other-skill\n' };
    },
  });

  const availability = await service.detectAvailability();

  assert.deepEqual(availability.availableAgents, ['claude-code', 'codex']);
  assert.deepEqual(availability.missingAgents, ['opencode']);
  assert.deepEqual(availability.unverifiedAgents, []);
});

test('detectAvailability marks agents as unverified when skills ls fails', async () => {
  const service = createSkillCreatorService({
    async run() {
      throw new Error('network');
    },
  });

  const availability = await service.detectAvailability();

  assert.deepEqual(availability.availableAgents, []);
  assert.deepEqual(availability.missingAgents, []);
  assert.deepEqual(availability.unverifiedAgents, [...SUPPORTED_SKILL_CREATOR_AGENTS]);
});

test('install uses the canonical anthropics skills command for all supported agents', async () => {
  const calls: Array<{ command: string; args: string[]; stdio?: string }> = [];
  const service = createSkillCreatorService({
    async run(command, args, options) {
      calls.push({ command, args, stdio: options?.stdio });
      return { stdout: '' };
    },
  });

  await service.install();

  assert.deepEqual(calls, [
    {
      command: 'npx',
      args: [
        'skills',
        'add',
        SKILL_CREATOR_SOURCE,
        '--skill',
        'skill-creator',
        '-g',
        '-a',
        'claude-code',
        '-a',
        'opencode',
        '-a',
        'codex',
      ],
      stdio: 'inherit',
    },
  ]);
  assert.equal(
    service.getInstallCommand(),
    'npx skills add https://github.com/anthropics/skills --skill skill-creator -g -a claude-code -a opencode -a codex',
  );
});

test('build prompts include the skill name and target directory', () => {
  const service = createSkillCreatorService({
    async run() {
      return { stdout: '' };
    },
  });

  const createPrompt = service.buildCreatePrompt('fastapi-best-practices', '/tmp/skills/fastapi-best-practices');
  const editPrompt = service.buildEditPrompt('fastapi-best-practices', '/tmp/skills/fastapi-best-practices');

  assert.match(createPrompt, /fastapi-best-practices/);
  assert.match(createPrompt, /Work only inside this directory: \/tmp\/skills\/fastapi-best-practices/);
  assert.match(editPrompt, /Review and improve the existing `fastapi-best-practices` skill package/);
});

test('doctor detail includes the recommended install command when setup is incomplete', () => {
  const service = createSkillCreatorService({
    async run() {
      return { stdout: '' };
    },
  });

  const detail = service.buildDoctorDetail({
    availableAgents: ['claude-code'],
    missingAgents: ['opencode'],
    unverifiedAgents: ['codex'],
  });

  assert.match(detail, /installed for claude-code/);
  assert.match(detail, /missing for opencode/);
  assert.match(detail, /unverified for codex/);
  assert.match(detail, new RegExp(skillCreatorInternals.getInstallCommand().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
});
