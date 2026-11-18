# Contributing

## Workflow
1. Pick a task card on the board (it must have an owner and acceptance criteria).
2. Make sure a GitHub issue exists and is linked to the card.
3. Branch from `main`.
4. Commit small, open a pull request, get at least one peer review, then merge.
5. Move the card to Done only after review and verification evidence.

## Branches
- `main` - stable code only; protected, no direct pushes.
- `feature/<issue>-<short-name>` e.g. `feature/12-user-login`
- `fix/<issue>-<short-name>` e.g. `fix/15-split-total-check`

## Commits
Format: `type(scope): description`
Examples: `feat(auth): implement login form`, `fix(expenses): block splits that do not sum to total`, `docs(readme): add setup steps`
Types: feat, fix, docs, test, refactor, chore.

## Pull requests
- Title describes the change; body references the issue (`Closes #12`).
- At least one reviewer who is not the author.
- Reviewer checks the acceptance criteria and leaves findings in the PR.

## Secrets
Never commit passwords, keys or `.env`. Use `.env.example` for variable names only.
