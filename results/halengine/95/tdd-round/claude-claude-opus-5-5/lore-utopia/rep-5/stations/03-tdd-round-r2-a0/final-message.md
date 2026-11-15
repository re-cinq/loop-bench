I fixed all four eslint findings CI reported on 063d36b, then committed and pushed. The branch is already up to date with `origin/main`, and `git status` shows nothing unpushed. CI hasn't judged this push yet. I didn't run eslint here, as instructed.

**Fixes**
- **`src/orchestration/chatOrchestrator.ts:176` (catch used as control flow):** I moved `JSON.stringify` into its own small function, `jsonOf`, which returns `undefined` when it can't render the value. `readableMessage` now uses `jsonOf(value) ?? String(value)`, so the behaviour is the same.
- **`src/orchestration/chatOrchestrator.test.ts:321/354` (duplicated code):** I added an `onErrorOutcome(reason)` helper that both non-Error tests now use, and widened `createErrorProvider` to accept `unknown`. Their assertions are unchanged.
- **`src/orchestration/onErrorNonError.acceptance.test.ts:12` (`new Date()`):** this is an acceptance test file, so I'm flagging it. The only change is in its session fixture: the `new Date()` timestamp became a fixed `'2026-01-01T00:00:00.000Z'`. Nothing asserts on that timestamp, and no assertion changed.
- **Spec links:** inserting the helper moved tests down, so I re-pointed the `[validated by]` links with `scripts/repoint-spec-anchors.mjs` and `spec:names --fix`. Zero links are left broken, and all 605 citations name the test they point at.

**Tests run here:** only `src/orchestration/chatOrchestrator.test.ts`, with Jest (this repo uses Jest, not Vitest). All 28 passed. That includes the three Error-instance tests, which passed without being edited, so I ticked that facet in `.lore/dod.md`. I also added and ticked a facet for this lint repair.

**Red tests:** CI's last verdict listed eslint findings only, no failing tests. So 0 of the red tests were mine and 0 were regressions.

**Not acted on:** none found.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"existing Error-instance onError tests confirmed green unedited; eslint findings on 063d36b cleared","tdd_next":"acceptance green"}}