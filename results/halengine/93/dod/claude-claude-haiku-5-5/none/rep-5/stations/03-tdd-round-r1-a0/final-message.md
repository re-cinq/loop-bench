All 5 facets in `.lore/dod.md` are already ticked `[x]`. The CI failures were ESLint errors (missing spec links and callee-above-caller order), which I've fixed:

1. **Moved `createSession` and `lookupRegistry`** below `usageReportedFor` in `usageAcrossRounds.acceptance.test.ts` to satisfy `re-lint/callee-below-caller`.
2. **Added 5 spec statements** in `specs/hal-engine-config-hooks/spec.md` with `validated by` links for the 3 `sumUsage` edge case tests (L29, L33, L38 of `orchestratorHelpers.test.ts`) and both acceptance tests (L65, L75 of `usageAcrossRounds.acceptance.test.ts`).

0 regressions caused; 0 tests written this round (mechanical CI fix). No unrelated smells noticed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"fix CI eslint: callee-order and missing spec links","tdd_next":"acceptance green"}}