# Agent guide

Read [README.md](./README.md) first for setup and how to run the app. This file only adds the rules for working on this repo.

## Setup

Node >= 22 and pnpm (see `.nvmrc` and `packageManager`). Run `nvm use` and `pnpm install`.

## Checks

- `pnpm check:fast` (typecheck, lint, format) after editing. Run it before you consider a task done.
- `pnpm test:e2e` (Playwright) needs the app's env vars and a backend; see the Playwright workflow.
- Never weaken a check to make a change pass: no new `@ts-ignore`/`eslint-disable`, no skipped tests, no lowered thresholds.

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/): `<type>: <subject>`, subject in lowercase and imperative mood.

Allowed types: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test`.

A `commit-msg` hook (husky + commitlint) rejects anything else. The hook needs Node >= 22.
A `pre-push` hook runs `pnpm check:fast`. `git push --no-verify` skips it; CI does not.

## Pull requests

Work on a branch, never push directly to `main`. Open a PR with `gh pr create`; the title follows the same Conventional Commits format.

## Auto-format

Claude Code runs Prettier and ESLint `--fix` on every file it edits (`.claude/hooks/format-on-edit.sh`). Do not fight the formatter.

## Specs

For a new feature, write the spec before the code. Keep specs and plans organized by feature, not in one big file at the repo root:

| Path | Holds |
| --- | --- |
| `specs/<feature>.md` | What we're building: objective, acceptance criteria, boundaries. |
| `tasks/<feature>/plan.md` | Phases, decisions, risks. |
| `tasks/<feature>/todo.md` | The executable checklist. |
| `docs/` | Reference: research, ADRs, operational notes. |

Number acceptance criteria (`AC-1`, `AC-2`) so commits and PRs can cite them.

## Language

Code identifiers and comments are in English. UI copy and user-facing messages are in Spanish.
