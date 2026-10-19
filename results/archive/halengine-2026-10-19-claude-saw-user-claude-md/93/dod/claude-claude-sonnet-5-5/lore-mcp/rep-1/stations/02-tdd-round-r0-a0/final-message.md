Pushed and up to date.

**Summary of what this round did:**

- **RED**: Added `accumulateUsage` import to `orchestratorHelpers.test.ts` with one failing test (`adds the token counts when both rounds reported`).
- **GREEN**: Exported `accumulateUsage` from `orchestratorHelpers.ts`; changed `chatOrchestrator.ts` line 117 from `lastUsage = outcome.usage ?? lastUsage` to `lastUsage = accumulateUsage(lastUsage, outcome.usage)`. All 5 unit tests and all 24 existing orchestrator tests pass.
- **REFACTOR**: Prettier formatted the two files.
- **Docs**: Removed the under-counting line from `specs/hal-engine-config-hooks/spec.md`; added MINOR CHANGELOG entry explaining the behavior change and why per-round breakdown was rejected. All three facets ticked in `dod.md`.

Unrelated smells noticed but not touched: the coverage thresholds in `jest.config.js` are quite granular and may need updating after this adds code to `orchestratorHelpers.ts`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"accumulate usage across tool rounds via accumulateUsage helper","tdd_next":"acceptance green"}}