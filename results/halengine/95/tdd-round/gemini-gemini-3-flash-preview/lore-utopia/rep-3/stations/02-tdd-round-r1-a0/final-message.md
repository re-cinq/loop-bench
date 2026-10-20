I have completed the round by addressing the ESLint failures in the test files and ensuring full behavioral verification for the `onError` hook's non-Error rejection handling.

### Changes Summary:
- **Test Refactoring**: Created `src/orchestration/onErrorNonError.testSupport.ts` to house shared helpers (`sessionWith`, `rejectingWith`) and a `FIXED_DATE`, resolving duplication and non-determinism issues reported by ESLint.
- **ESLint Compliance**: Refactored `src/orchestration/onErrorNonError.acceptance.test.ts` and `src/orchestration/onErrorNonError.facet.test.ts` to use a single expectation per test (`toMatchObject`), satisfying the `max-expects` rule.
- **Traceability**: Added inline spec links to all test declarations and updated `specs/hal-engine-config-hooks/spec.md` with verified line numbers for 5 distinct test validations.
- **Verification**: Verified behavioral correctness using `jest` and confirmed that `repoint-spec-anchors.mjs` no longer reports any "rotten" or misplaced anchors.
- **Documentation**: Confirmed that the `CHANGELOG.md` entry for the behavior change was already present from the previous round.

I have pushed the changes and verified the branch is up to date with `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"acceptance green","tdd_next":"acceptance green"}}