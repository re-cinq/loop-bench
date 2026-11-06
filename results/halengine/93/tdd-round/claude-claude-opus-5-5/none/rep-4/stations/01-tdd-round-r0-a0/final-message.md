This round closed the summing facet: `afterModelResponse` now gets the total usage of every provider call in a turn, not just the last one. It's committed and pushed, and the branch is level with `origin/main` and its upstream.

**Red → green:** I added one test, `addUsage › sums each token field across rounds and skips rounds that reported no usage`, in `src/orchestration/orchestratorHelpers.test.ts`. It failed first because the helper didn't exist, then passed: 5/5 in that file. It was the only test I ran here. I didn't run the acceptance tests, the full suite, the linter or the typechecker; CI judges those next. Red tests: 1, mine, now green. No regression can be measured yet, because CI hasn't run on this push.

**What changed:**
- **The helper:** `addUsage(total, round)` in `src/orchestration/orchestratorHelpers.ts` adds each token field. A round that reported no usage leaves the total alone, and a turn where nothing reported stays `undefined`.
- **The call site:** in `chatOrchestrator.ts`, the `lastUsage` variable became `turnUsage`, built up with `addUsage` on every round. That's the behaviour both acceptance tests check.
- **The spec:** in `specs/hal-engine-config-hooks/spec.md`, the usage line now also says a round with no usage adds nothing, with a link to the new test. The extra import moved the `onError` check down a line, so I re-pointed that link from `#L150` to `#L151`.
- **`.lore/dod.md`:** the facet is ticked.

**Things to know:**
- This repo has no way to attach a spec anchor to a test so that it shows up in the test list (`scripts/lore-list-tests.mjs` only outputs id, name and file). I put the anchor in a comment above the test instead.
- There's no `scripts/spec-links/reanchor.mjs` here, so I checked the line links by hand.
- No unrelated problems noticed.

**Next round:** the hook's public type still reads as plain `usage?: UsageMetadata`, so nothing tells a reader it's a sum. After that comes the CHANGELOG entry. The spec line itself is already updated.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Sum each token field only for provider rounds that report usage, preserving undefined when none do","tdd_next":"Replace final-round retention with a deliberately named total-usage contract whose public type makes aggregation explicit"}}