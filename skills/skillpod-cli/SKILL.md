---
name: skillpod-cli
description: >
  Use the skillpod CLI to manage personal agent skills registries backed by GitHub.
  Trigger this skill when the user wants to initialize a skills registry, create/edit/remove
  skills, push or pull skills to/from GitHub, install skills into agent environments, or
  troubleshoot their skillpod setup. Also trigger when the user mentions "skillpod", "skills
  registry", "publish a skill", "install a skill", or wants to manage agent skills via CLI.
---

# Skillpod CLI

CLI for authoring and managing personal agent skills registries, backed by GitHub.

Install: `npm install -g skillpod`

## Commands

### `skillpod init`
Set up your registry. Prompts for a GitHub PAT (reuses saved token), creates or connects
to a GitHub repo, clones locally, and stores config at `~/.skillpod/config.json`.

### `skillpod create [name]`
Create a new skill. Prompts for a name if omitted. After creation, choose an authoring mode:
VS Code, skill-creator (AI-assisted), or skip.

### `skillpod edit [name]`
Edit an existing skill. Interactive picker if name is omitted. Same authoring mode options
as create.

### `skillpod list`
Interactive list of all local skills showing name, description, modification time, and
sync status. Selecting a skill opens the edit menu.

### `skillpod remove [name]`
Delete a skill. Interactive picker if name is omitted. Supports fuzzy name matching.
After deletion, prompts whether to push the removal to remote.

### `skillpod push [-m <message>]`
Push local skill changes to the remote GitHub registry. Always shows an interactive
prompt to select which skills to push (individual, all, or cancel). The `-m` flag
only overrides the commit message — it does not skip the selection prompt.

### `skillpod pull`
Pull skills from remote. Always shows an interactive prompt to select which skills
to pull (individual, all, or cancel).

### `skillpod install [options]`
Install skills into agent environments. Delegates to `npx skills add`.
If no `--skill` or `--list` flag is given, prompts interactively to select a skill.

Options:
- `--list` — list available skills from registry
- `--skill <name>` — install specific skill (repeatable, skips prompt)
- `-g, --global` — install at user scope
- `-a, --agent <agent>` — target agent (repeatable)
- `-y, --yes` — skip confirmation prompts
- `--copy` — copy files instead of symlinking

Example: `skillpod install --skill api-review -g -a claude-code`

### `skillpod doctor`
Health check: validates config, local registry, GitHub token, remote repo, npx availability,
and skill-creator installation status.

### `skillpod unload`
Remove all local skillpod state (`~/.skillpod/` and local clone). Does not affect the
remote GitHub repo. Requires confirmation.

## Global Options
- `--debug` — verbose logging
- `--version` — show version

## Typical Workflows

**First-time setup:**
```bash
skillpod init
skillpod create my-skill
# author the skill
skillpod push                # interactive: select skill(s) to push
skillpod install --skill my-skill -g -a claude-code
```

**Pull and edit an existing skill:**
```bash
skillpod pull                # interactive: select skill(s) to pull
skillpod edit my-skill
skillpod push                # interactive: select skill(s) to push
```

**Health check:**
```bash
skillpod doctor
```

## Important: Interactive Prompts

Most commands use interactive prompts (powered by Inquirer). `push`, `pull`, `remove`,
`list`, and `install` (without `--skill`) always require user selection. These commands
cannot be fully automated in a non-interactive shell.
