Perfect! I've completed this round. Here's what I fixed:

## Changes Made

1. **Fixed eslint error**: Split the acceptance test `chatOrchestrator.beforeSession.acceptance.test.ts` into two separate tests to comply with the max-1-expect-per-test rule. The tests now validate error propagation separately from hook execution.

2. **Fixed spec-names errors**: Updated 16+ spec anchor links across two spec files that were pointing to incorrect line numbers after new tests shifted all subsequent line numbers:
   - `specs/hal-engine-config-hooks/spec.md`: Updated link from L40 → L48
   - `specs/hal-engine-architecture/spec.md`: Fixed all misaligned links (tests were at L359→L385, L286→L312, L326→L352, and many others)

3. **Added CHANGELOG entry**: Documented the breaking behavior change for existing consumers — `beforeSession` hooks now fire inside the error boundary, ensuring `onError` and `afterSession` run even if `beforeSession` throws. This prevents resource leaks in cleanup hooks.

4. **Marked facets complete**: Updated `.lore/dod.md` to check off all three facets as complete.

All CI failures from the previous round have been resolved and the changes are pushed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"document CHANGELOG entry for beforeSession change","tdd_next":"acceptance green"}}