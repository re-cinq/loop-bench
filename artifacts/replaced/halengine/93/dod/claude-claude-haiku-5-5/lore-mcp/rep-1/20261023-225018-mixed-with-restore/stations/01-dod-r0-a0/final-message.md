The red acceptance tests are committed and pushed to `loop-bench/93` (commit `b5e07c2`). The branch was already up to date with `origin/main`, so the merge had nothing to bring in.

**Triage: `direct`.** The seam exists. `createChatOrchestrator(provider, promptBuilder, registry, {hooks})` with a scripted provider drives real tool rounds and fires the real `afterModelResponse` hook.

**Shape chosen:** one `usage` argument carrying the sum across every provider call. The ticket asked me to decide. This keeps the existing `receives collected response text and usage` test unedited, which criterion 2 requires, and the ticket's own criteria speak of "the total". The per-round breakdown alternative is recorded as rejected in `.lore/dod.md`.

**Files:**
- `src/orchestration/chatOrchestrator.acceptance.test.ts` (new, 2 tests)
- `.lore/dod.md` (new)

**Tests:**
1. Two tool rounds, three provider calls with distinct counts: the hook must receive their sum.
2. A silent middle round is skipped without producing `NaN` or `undefined`, and a turn where no round reports still hands the hook `undefined`.

The existing `receives collected response text and usage` and `keeps the usage an earlier round reported…` tests are named in the DoD as must-stay-green.

**Red bar** (`node --experimental-vm-modules node_modules/jest/bin/jest.js --silent src/orchestration/chatOrchestrator.acceptance.test.ts`):

```
● ChatOrchestrator usage across tool rounds › reports the summed usage of every provider call in a turn that ran two tool rounds

    expect(received).toEqual(expected) // deep equality

    - Expected  - 3
    + Received  + 3

      Object {
    -   "inputTokens": 750,
    -   "outputTokens": 60,
    -   "totalTokens": 810,
    +   "inputTokens": 400,
    +   "outputTokens": 30,
    +   "totalTokens": 430,
      }

    > 68 |     expect(reported).toEqual({inputTokens: 750, outputTokens: 60, totalTokens: 810});

● ChatOrchestrator usage across tool rounds › sums only the rounds that reported usage, and reports nothing when no round did

    - Expected  - 3
    + Received  + 3
      Object {
    -   "inputTokens": 500,
    -   "outputTokens": 40,
    -   "totalTokens": 540,
    +   "inputTokens": 400,
    +   "outputTokens": 30,
    +   "totalTokens": 430,
      }

    > 77 |     expect(someSilent).toEqual({inputTokens: 500, outputTokens: 40, totalTokens: 540});

Tests:       2 failed, 2 total
```

Both fail on the ticket's claim: the hook gets only the final call's usage. The repo's `npm test` uses the same ESM flag; the bare `npx jest` in my first attempt failed for that reason.

**Not covered by a test (noted in the DoD facets):**
- The type-level criterion (the signature says the answer is a sum) cannot be expressed as a runtime test without source-text scanning, which the contract forbids.
- The spec edit and the CHANGELOG entry are implementation-round work. I did not add a `validated by` link to `specs/hal-engine-config-hooks/spec.md`, because the statement it would sit on still describes the old behaviour.
- CI's build, typecheck, eslint and prettier:check are not run here, per the pod rules.

**Environment:** the `lore` MCP server failed to connect (`CONNECTION_CLOSED`), so I did not query lore context or write memory. Lore tools may need a retry.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}