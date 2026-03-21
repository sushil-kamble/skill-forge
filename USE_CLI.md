# skillpod CLI Reference

## Setup

```
skillpod init                              Initialize skillpod (interactive wizard)
skillpod init --token <token>              Provide GitHub token directly
skillpod init --repo <url>                 Provide repository URL directly
skillpod init -y                           Auto-confirm reinitialize prompt
skillpod init --token <token> --repo <url> -y   Fully non-interactive init
```

## Skill Authoring

```
skillpod create <name>                     Create a new skill
skillpod create <name> --mode skip         Create and skip editor prompt
skillpod create <name> --mode open-vscode  Create and open in VS Code
skillpod create <name> --mode use-skill-creator  Create and print AI prompt

> <V.IMP This is used to create a skill on the fly, just replace `<input>` of the output of the command with actual input of the skill you want to create.

skillpod edit <name>                       Edit an existing skill (prompts for mode)
skillpod edit <name> --mode skip           Edit without opening anything
skillpod edit <name> --mode open-vscode    Edit in VS Code
skillpod edit <name> --mode use-skill-creator  Edit via AI prompt

> <V.IMP This is used to create a skill on the fly, just replace `<input>` of the output of the command with actual input of the skill you want to create.

skillpod list                              List skills (interactive selection)
skillpod list --json                       List skills as JSON (non-interactive)

skillpod remove <name>                     Remove a skill (prompts for confirmation)
skillpod remove <name> -y                  Remove without confirmation
skillpod remove <name> -y --push           Remove and push to remote
```

## Registry Sync

```
skillpod push                              Push changes (interactive skill selection)
skillpod push --skill <name>               Push a specific skill
skillpod push --all                        Push all changes

skillpod pull                              Pull skills (interactive selection)
skillpod pull --skill <name>               Pull a specific skill
skillpod pull --all                        Pull all skills

skillpod send <path>                       Send a local skill directory to remote (validate, pull, copy, push)
skillpod send <path> --force               Overwrite if skill already exists in registry
```

## Install

```
skillpod install                           Install a skill (interactive selection)
skillpod install <name>                    Install a specific skill (skip interactive selection)

Extra flags are forwarded directly to skills.sh (npx skills add):
skillpod install <name> -g                 Install at user scope
skillpod install <name> -a claude-code     Target a specific agent
skillpod install <name> -a claude-code -a opencode   Target multiple agents
skillpod install <name> -y                 Skip confirmation prompts
skillpod install <name> --copy             Copy files instead of symlinking
skillpod install <name> -g -a claude-code -y   Combine multiple flags
```

## Maintenance

```
skillpod doctor                            Check configuration health
skillpod unload                            Remove all skillpod data (prompts)
skillpod unload -y                         Remove all skillpod data (no prompt)
```
