Completed and pushed commit `f4f95ad`:

- Added value-safe logging for rejected tool inputs.
- Fixed AJV validator/error typing.
- Removed CI-reported duplicate-code and member-chain lint issues.
- Added and linked a focused wrong-type validation test.
- Updated `.lore/dod.md`.
- Merged `origin/main` (already current); branch matches upstream.

Test run: `registry.test.ts` — 3 passed. Red tests this round: 1 new test, 0 regressions. Acceptance tests were not run locally as instructed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"log rejected input with its field path and constraint without leaking values","tdd_next":"cache function-valued ToolDefinitionSource validators by schema object reference"}}