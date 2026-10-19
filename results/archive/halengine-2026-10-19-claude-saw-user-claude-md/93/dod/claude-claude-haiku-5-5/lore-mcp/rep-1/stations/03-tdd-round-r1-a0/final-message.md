Branch is up to date and clean. The push landed.

**What this round fixed:** All 5 eslint failures from the CI report:
1. `specs/hal-engine-config-hooks/spec.md` — moved the L68 link to the first sentence of the afterModelResponse paragraph (fixing the 8/9 coverage mismatch), added L78 link to the second sentence, and added three new sentences linking the `accumulateUsage` unit tests at L29, L35, and L40 (13/13 now, "Shipped" is valid)
2. `orchestratorHelpers.test.ts:35` — combined the two `expect` calls into one `toEqual` (fixes `re-lint/max-expects`)
3. Tests at L29, L35, L40, L78 all now have `([validated by...])` citations in the spec (fixes `re-lint/require-spec-link`)

Zero regressions introduced. The local test run confirmed all 7 tests in `orchestratorHelpers.test.ts` pass.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"spec-link coverage + max-expects fix for all 5 CI eslint failures","tdd_next":"acceptance green"}}