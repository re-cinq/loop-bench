All four ESLint issues and the changelog are fixed and pushed. The branch is up to date.

**Summary of fixes this round:**
- `registry.test.ts`: Merged 3 `expect` calls into one `toEqual` (violated `re-lint/max-expects`)  
- `registry.acceptance.test.ts` line ~141: Flipped `if (round === 2)` to `if (round !== 2)` early-return guard (`re-lint/prefer-early-return`)
- `registry.acceptance.test.ts` line ~143: Extracted `lastMessage.content[0]` to `firstContent` variable to reduce chain depth to max 2 (`re-lint/max-member-chain`)
- `registry.ts` line 69: Added `{cause: err}` to the thrown Error (`preserve-caught-error`)
- `CHANGELOG.md`: Added `[Unreleased]` entry describing the inputSchema validation feature
- 0 regressions introduced; 0 new tests written (this round was pure CI-failure repair)

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix all 4 eslint errors and missing changelog from previous push","tdd_next":"add remaining unit tests in registry.test.ts and chatOrchestrator.test.ts, link spec statements, update docs (facet 4)"}}