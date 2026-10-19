The branch is pushed and up to date. Three CI failures are fixed:

- **eslint `re-lint/no-duplicate-code`** (lines 529+555): Extracted `usageCapture()` helper, refactored both tests to use `const {hooks, ref} = usageCapture()`, eliminating the 8-line duplicate.
- **eslint `re-lint/require-spec-link`** (line 56 of acceptance test): Added a second spec statement to `specs/hal-engine-config-hooks/spec.md` with `([validated by: still counts the rounds that reported when others did not](...#L56))`.
- **eslint `re-lint/require-spec-link`** (lines 554, 577 of chatOrchestrator.test.ts) + **spec-names**: Both stale `#Lnn` citations (architecture spec → L527, tool-input-validation spec → L550) reanchored to their new correct lines via `spec:names --fix`.

All 25 tests in `chatOrchestrator.test.ts` remain green.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix CI: deduplicate usage-capture pattern, add missing spec link, reanchor stale citations","tdd_next":"acceptance green"}}