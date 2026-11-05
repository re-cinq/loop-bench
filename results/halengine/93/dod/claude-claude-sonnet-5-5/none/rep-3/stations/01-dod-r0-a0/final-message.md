Two of the three acceptance tests fail on the current code. The third passes today and is there to guard the case where no round reports usage. The tests and `.lore/dod.md` are committed and pushed, the merge with `origin/main` was already up to date, and the branch is not ahead of its upstream.

**Strategy: `direct`.** The tests call `createChatOrchestrator` with a scripted provider and a registered tool, and read what `afterModelResponse` receives. The tests are in `src/orchestration/turnUsage.acceptance.test.ts`.

I picked the first shape the ticket weighs: the hook keeps one `usage` argument, now the sum for the whole turn. The tests pin that shape, so if you prefer the sum-plus-breakdown shape they would need rewriting. The per-round breakdown is recorded in `.lore/dod.md` as rejected for its wider surface.

Run with `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/turnUsage.acceptance.test.ts --silent`: 2 failed, 1 passed.

- **Sums every provider call:** this test fails. Rounds report 100/10, 250/20 and 400/30 input/output tokens, and the hook gets only the last round's usage.
  ```
  - "inputTokens": 750,   + "inputTokens": 400,
  - "outputTokens": 60,   + "outputTokens": 30,
  - "totalTokens": 810,   + "totalTokens": 430,
  ```
- **Counts the rounds that reported:** this test fails. The middle round reports nothing, and the hook gets 400/30/430 instead of 500/40/540.
- **Reports nothing when no round reported usage:** this test passes today.

The "no tool calls" criterion is already pinned by the existing `chatOrchestrator.test.ts` and `toolBudget.test.ts`, which must stay unedited. The type-clarity, spec/CHANGELOG and build-gate criteria are not behaviour tests. They are listed as facets in `.lore/dod.md`.

I did not add a `validated by` link to `specs/hal-engine-config-hooks/spec.md` line 28. That line records the old under-counting, and the ticket asks for it to be replaced. The implementing round should write the new statement and link it to these tests.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}