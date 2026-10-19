I committed and pushed two acceptance tests in `src/orchestration/afterModelResponseUsage.acceptance.test.ts`. Both fail today for the reason the ticket gives, and the branch is up to date with `origin/main` and not ahead of its upstream.

The strategy is `direct`, since `createChatOrchestrator` with a scripted provider and an `afterModelResponse` hook is already a usable seam. The ticket leaves the shape open, so the tests assume its first option: one `usage` argument, summed across rounds. If you'd rather have the per-round breakdown, the tests need rewriting.

Failure output, run with `node --experimental-vm-modules node_modules/jest/bin/jest.js --silent --runTestsByPath src/orchestration/afterModelResponseUsage.acceptance.test.ts`:

```
● reports the sum of every provider call in a two-tool-round turn
  - "inputTokens": 600, "outputTokens": 60, "totalTokens": 660   (expected)
  + "inputTokens": 300, "outputTokens": 30, "totalTokens": 330   (received: last round only)
● still counts the rounds that reported when others did not
  - 400 / 40 / 440 expected
  + 300 / 30 / 330 received
Tests: 2 failed, 2 total
```

- **Two-tool-round test:** the scripted rounds report 100, 200 and 300 input tokens, and the hook receives only the last round's 300.
- **Silent-round test:** one round reports no usage, and the hook still gets only the last round's usage instead of the sum of the rounds that reported.

I left out a test for "nothing reported, so nothing is reported". It already passes today, so it couldn't be a red test. Three of the ticket's acceptance criteria also have no test:
- **No-tool turn:** the existing unedited test covers it.
- **Type clarity:** it isn't observable behaviour.
- **Changelog and build checks:** they belong to the implementing round.

I rewrote the under-counting line in `specs/hal-engine-config-hooks/spec.md` to describe the summed behaviour and linked it to the new test. `.lore/dod.md` holds the claim, strategy, tests and facets. The repo has no `reanchor.mjs` or spec-anchor stamping, so the test's `#L51` link is hand-set.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}