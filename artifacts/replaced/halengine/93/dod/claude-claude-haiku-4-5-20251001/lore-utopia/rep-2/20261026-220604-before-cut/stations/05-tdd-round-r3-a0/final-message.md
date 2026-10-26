Branch is pushed and up to date with main. The commit fixes:
- **Duplicate code** in `chatOrchestrator.acceptance.test.ts` by extracting a `runRounds` helper that removes the repeated `captureUsage()` + `makeToolOrchestrator()` + `processMessage()` setup pattern
- **`spec-names` and `require-spec-link` failures** by running `check-spec-anchor-names.mjs --fix`, which repointed 33 stale citations across three spec files (`hal-engine-architecture`, `hal-engine-config-hooks`, `hal-engine-tool-input-validation`) to the tests' actual current line numbers

The `.lore/dod.md` facets were all already ticked by prior rounds; the remaining failures were lint/spec-consistency issues from line drift.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix duplicate-code lint and reanchor 33 stale spec citations","tdd_next":"acceptance green"}}