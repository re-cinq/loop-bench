Branch is up to date. The three ESLint failures are fixed:

1. **`orchestratorHelpers.test.ts:29` — missing spec link**: Added a new bullet to `specs/hal-engine-config-hooks/spec.md` stating the field-by-field summation behaviour, with `([validated by: sums both rounds token counts when both report usage](../../src/orchestration/orchestratorHelpers.test.ts#L29))`.

2. **`usageReporting.acceptance.test.ts` — duplicate code** (lines 54-62 and 75-83): Extracted `round1` and `answerRound` as shared constants inside the `describe` block, replacing the repeated inline arrays in both test cases.

3. **Spec line numbers**: Updated the acceptance test citations in the spec from `#L49`→`#L55` and `#L70`→`#L73` to match the new positions after extracting the constants.

0 regressions — no test logic was changed, only structure.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix eslint: spec link for accumulateUsage unit test and duplicate code in acceptance test","tdd_next":"acceptance green"}}