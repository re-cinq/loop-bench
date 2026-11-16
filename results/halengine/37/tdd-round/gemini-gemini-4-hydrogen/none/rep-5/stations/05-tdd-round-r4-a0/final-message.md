Fixed the ESLint `re-lint/declare-near-use` failure reported in `round-brief.md` (`src/orchestration/tools/registry.test.ts:95:5`):

- Moved `const logEntries = captureLogEntries();` immediately before the `registry.execute` calls in `src/orchestration/tools/registry.test.ts` so it is declared within 5 statements of its first use in `expect(...)`.
- Ran `npx prettier --write src/orchestration/tools/registry.test.ts` and `node scripts/check-spec-anchor-names.mjs --fix` (which repointed the shifted anchor `#L158` -> `#L157` in `specs/hal-engine-tool-input-validation/spec.md`), and verified `node scripts/repoint-spec-anchors.mjs origin/main` and `node scripts/check-spec-anchor-names.mjs` pass.
- Ran `src/orchestration/tools/registry.test.ts` with Jest: 5 passed, 0 failed (0 red tests authored, 0 regressions). ESLint, typecheck, full build, and acceptance tests were not run locally per pod constraints.
- Committed (`970b675`), checked `origin/main` (already up to date), and pushed to `origin/loop-bench/37`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix re-lint/declare-near-use CI failure in src/orchestration/tools/registry.test.ts and update spec anchor","tdd_next":"acceptance green"}}