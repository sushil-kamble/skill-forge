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
Delete a skill. Interactive picker if name is omitted.

### `skillpod push [-m <message>]`
Push local skill changes to the remote GitHub registry. Shows push status per skill.
Select individual skills or push all.

### `skillpod pull`
Pull skills from remote. Shows sync status. Select individual skills or pull all.

### `skillpod install [options]`
Install skills into agent environments. Delegates to `npx skills add`.

Options:
- `--list` — list available skills
- `--skill <name>` — install specific skill (repeatable)
- `-g, --global` — install at user scope
- `-a, --agent <agent>` — target agent (repeatable)
- `-y, --yes` — skip confirmation
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
skillpod push
skillpod install --skill my-skill -g -a claude-code
```

**Pull and edit an existing skill:**
```bash
skillpod pull
skillpod edit my-skill
skillpod push -m "improve error handling guidance"
```

**Health check:**
```bash
skillpod doctor
```
