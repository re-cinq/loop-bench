Pushed and up to date. Summary:

- Added `accumulateUsage` to `orchestratorHelpers.ts` — sums all three token fields, ignores `undefined` rounds, returns `undefined` when nothing reported.
- Added 3 unit tests for `accumulateUsage` in `orchestratorHelpers.test.ts` (7 tests total, all green).
- Updated `chatOrchestrator.ts`: replaced `lastUsage = outcome.usage ?? lastUsage` with `lastUsage = accumulateUsage(lastUsage, outcome.usage)`, and renamed the `afterModelResponse` hook parameter from `usage` to `totalUsage`.
- Bumped version to `0.4.0` in `package.json` and added CHANGELOG entry under `[Unreleased] ### Changed`.
- All 24 existing unit tests remain green. No regressions.
- Unrelated smell noticed: the existing test title "keeps the usage an earlier round reported when a later round reports none" is now slightly imprecise (it's really "preserves accumulated usage"), but the behavior it asserts is still correct and I left it unedited per the DoD.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Accumulate all three token fields across provider calls; rename totalUsage parameter; MINOR version bump + CHANGELOG","tdd_next":"acceptance green"}}