The round ran no locally-executed tests (the guard prevented running any test files listed in dod.md). The changes fix all 6 eslint errors and the spec-names failure from the CI report:

1. **Duplicate `scriptedProvider`** — extracted to `chatOrchestrator.testHelpers.ts`, imported in both test files
2. **Duplicate hook-capture pattern** within `chatOrchestrator.test.ts` — refactored into `runWithUsageCapture` helper
3. **`callee-below-caller` in acceptance test** — `createSession` moved below `usageReportedBy`
4. **Missing spec link for "resolves processMessage..."** — spec link updated from wrong `#L550` to `#L549`
5. **spec-names** — 16 citations shifted by the +1 import line, all re-anchored by the `--fix` script; spec links for acceptance test tests updated from #L66/#L78 to #L53/#L65; spec statement added for "sums usage when both rounds report"

Smells noticed but not acted on: the `usageReportedBy` in the acceptance test and `runWithUsageCapture` in the unit test share structural similarity (~40 tokens) — below the flagged threshold but worth watching.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair eslint/spec-names CI failures","tdd_next":"acceptance green"}}