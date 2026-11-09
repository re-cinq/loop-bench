The spec's links anchor to `#L55`, `#L63`, `#L72` and the test titles still sit on exactly those lines — the helper moved below the `describe` block, so nothing shifted and no reanchoring is needed.

**Round summary:**

- The round brief's CI verdict named exactly one finding: `re-lint/callee-below-caller` — `createMockProvider` declared above its caller `createThrowingOrchestrator` in `src/orchestration/chatOrchestrator.beforeSession.acceptance.test.ts`. I moved the helper below its caller; no assertion, test title, or spec anchor changed (prettier reports the file unchanged, and the three `it` lines keep their `#L55/#L63/#L72` anchors).
- Committed as `dcc585e` and pushed; branch is in sync with `origin/loop-bench/94` and already up to date with `origin/main`, so no merge was needed.
- **No tests ran in this pod this round**: this is a repair round with no new test written, and the ticket's only test is the acceptance test `.lore/dod.md` names, which CI judges on the push. The red item on the last push was the eslint check, not a test — so 0 red tests were mine and 0 were regressions.
- `.lore/dod.md` needed no tick: all four facets were already ticked, and this round closed the lint remainder of the already-ticked "repair the red build" facet. No new facet was discovered; the top-level "Done when these pass" box is CI's to close on this push.
- Nothing unrelated was touched. No other smells noticed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair the red build from 86a447f — re-lint/callee-below-caller finding on the beforeSession acceptance test","tdd_next":"acceptance green"}}