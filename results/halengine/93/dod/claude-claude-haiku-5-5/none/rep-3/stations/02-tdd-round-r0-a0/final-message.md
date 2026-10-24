Branch is clean and pushed. Summary:

- **RED**: Added `accumulateUsage` import and a test `adds tokens from both rounds when both report` to `orchestratorHelpers.test.ts` — failed because the function didn't exist.
- **GREEN**: Added `accumulateUsage(current, next)` to `orchestratorHelpers.ts` (returns `current` when `next` is undefined, `next` when `current` is undefined, otherwise their sum). Updated `chatOrchestrator.ts` to use it in place of `lastUsage = outcome.usage ?? lastUsage`. All 5 orchestratorHelpers tests and all 24 chatOrchestrator tests pass.
- **REFACTOR + remaining facets**: Added one-line doc comment to `afterModelResponse`, updated `specs/hal-engine-config-hooks/spec.md` line 28 with the new summed-usage statement linked to the acceptance test, added CHANGELOG MINOR-bump entry. Ticked 6 of 7 facets in dod.md (the last is CI's typecheck/lint/build verdict).
- **0 regressions** — the two tests that previously validated the no-tool path and the "keep earlier usage when later has none" case both still pass.

No smells noticed that were left unacted upon.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"accumulateUsage helper + orchestrator wiring + doc/spec/changelog","tdd_next":"acceptance green"}}