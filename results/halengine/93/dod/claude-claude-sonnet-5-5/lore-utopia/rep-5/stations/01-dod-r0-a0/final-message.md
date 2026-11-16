I wrote two acceptance tests for #93 and both fail today. They're committed and pushed, and the branch is level with its upstream.

**Strategy: `direct`.** `createChatOrchestrator(...).processMessage` with a scripted provider and an `afterModelResponse` hook is a real entry point, so no new seam is needed.

The tests are in `src/orchestration/usageAcrossRounds.acceptance.test.ts`. I ran only that file, with `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath … --coverage=false --silent`:

- **Sum across rounds:** three provider calls (100/10, 250/20, 400/30 input/output tokens) should give 750/60. The hook receives 400/30, which is `lastUsage`, the final call alone.
  ```
  - "inputTokens": 750,   + "inputTokens": 400,
  - "outputTokens": 60,  + "outputTokens": 30,
  - "totalTokens": 810,   + "totalTokens": 430,
  ```
- **Missing usage:** the middle round reports nothing, and the hook should receive 500/40 from the other two. It receives 400/30. The same test also asserts that a turn where no round reported gives `undefined`.

Both failures come from the claim in the ticket: the hook gets the usage of the final provider call alone.

- **Sum shape assumed:** I assumed the "sum, one `usage` argument" shape. The third hook argument stays `UsageMetadata`. If you choose the per-round breakdown instead, the summed total has to remain that third argument. This is recorded in `.lore/dod.md`.
- **No-tool turns:** I did not write a test for the no-tool-turn criterion. It would pass today, and the ticket names the existing tests as the pin.
- **Spec:** I added a new bullet to `specs/hal-engine-config-hooks/spec.md` that cites both tests. I left the old under-counting line, because replacing it is the implementer's job. The repo has no `scripts/spec-links/reanchor.mjs`, so I set the `#L` anchors by hand.
- **Not run:** I did not run prettier-check, lint, typecheck or build, as instructed.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}