Branch is pushed and up to date. This round fixed all 3 CI failures:

1. **spec-names**: Architecture spec cited `orchestratorHelpers.test.ts` at L11/L15/L19/L23 (the shouldContinueToolLoop tests), but the previous round added `accumulateUsage` tests above them, shifting lines to L32/L36/L40/L44. Fixed by running `spec:names --fix`.

2. **eslint** (two issues):
   - `orchestratorHelpers.test.ts` tests L14/L18/L22/L26 (accumulateUsage unit tests) had no spec links. Fixed by adding 3 statements with `[validated by]` links in `specs/hal-engine-architecture/spec.md` under "Across rounds".
   - `specs/hal-engine-config-hooks/spec.md` had status "Shipped" but 8/10 testable statements were linked (the previous round changed the heading from "Measured semantics — out of scope" to "Measured semantics", making its statements testable). Fixed by removing the redundant preamble sentence and changing status to "In Progress".

3. **changelog**: No CHANGELOG.md entry for `src/orchestration/` changes. Fixed by adding a "Changed" entry describing the `afterModelResponse` usage accumulation behavior.

Unrelated smell noticed: `specs/hal-engine-config-hooks/spec.md` line 27 ("The `catch` gates `onError` on `error instanceof Error`") still has no test link; this pre-existing gap is what keeps the spec at "In Progress" rather than "Shipped".

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Fix CI failures: spec-names drift, missing spec links for accumulateUsage tests, changelog entry","tdd_next":"Name the hook's usage type as a turn total in the public signature without any; keep same UsageMetadata fields"}}