Fixed the CI `eslint` failure reported in `round-brief.md` on `9229aaf2f4be6a895b52f1099b789d248b1a2e89`:

- Replaced `new Date().toISOString()` at `src/orchestration/onErrorNonError.acceptance.test.ts:12` with the fixed ISO timestamp `'2026-01-01T00:00:00.000Z'` to satisfy `re-lint/no-nondeterministic-tests` without shifting any test line numbers cited by `specs/hal-engine-config-hooks/spec.md`.
- Formatted `src/orchestration/onErrorNonError.acceptance.test.ts` with `npx prettier --write` (unchanged).
- Committed (`f6cef1f`), pushed to `origin/loop-bench/95`, and checked `origin/main` (`Already up to date.`); `git status` is clean and up to date with `origin/loop-bench/95`.

This round ran no tests here (the only file modified is an acceptance test in `.lore/dod.md`, and CI runs the suite, linter, typechecker, and build on push). Red tests attributable to this round: 0; regressions: 0 (the prior CI failure was the single `eslint` error at `src/orchestration/onErrorNonError.acceptance.test.ts:12:48`).

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix re-lint/no-nondeterministic-tests ESLint failure in src/orchestration/onErrorNonError.acceptance.test.ts","tdd_next":"acceptance green"}}