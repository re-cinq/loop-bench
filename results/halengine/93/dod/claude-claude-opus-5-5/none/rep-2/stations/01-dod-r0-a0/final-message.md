I've committed and pushed two acceptance tests for #93. Both fail right now, and they fail because of the ticket's claim: `afterModelResponse` receives only the last provider call's usage. The branch `loop-bench/93` is up to date with `origin/main` and not ahead of its upstream.

**Strategy: `direct`.** `createChatOrchestrator`, given a scripted provider and a real `ToolRegistry`, already runs a multi-round turn into the hook, so the tests check the `usage` argument there. The existing no-tool test checks that this third argument equals the single round's `UsageMetadata`, so either shape the ticket weighs has to keep it as a `UsageMetadata`. The tests treat it as the turn's total; a per-round breakdown can be added on top.

Files:
- `src/orchestration/chatOrchestrator.acceptance.test.ts` — the two tests.
- `.lore/dod.md` — the DoD, opening with the ticket's claim quoted.
- `specs/hal-engine-config-hooks/spec.md` — a new "Usage across tool rounds" section with two statements, each linked to its test.

Command run: `NODE_OPTIONS=--experimental-vm-modules npx jest --coverage=false src/orchestration/chatOrchestrator.acceptance.test.ts`

```
● afterModelResponse usage across tool rounds › reports the sum of every provider call in a turn driven through two tool rounds
    -   "inputTokens": 900,  "outputTokens": 120,  "totalTokens": 1020,
    +   "inputTokens": 500,  "outputTokens": 60,   "totalTokens": 560,
    > 75 |     expect(reported).toEqual(usageOf(900, 120));

● afterModelResponse usage across tool rounds › counts the rounds that reported usage when others did not, and reports nothing when none did
        "partial": Object {
    -     "inputTokens": 600,  "outputTokens": 80,  "totalTokens": 680,
    +     "inputTokens": 500,  "outputTokens": 60,  "totalTokens": 560,
        },
        "silent": undefined,
    > 82 |     expect({partial, silent}).toEqual({partial: usageOf(600, 80), silent: undefined});

Tests:       2 failed, 2 total
```

The all-silent half of the second test already passes today; it shares a test with the partial case, which fails.

The DoD lists the rest of the work as unchecked items: a type that says the value is a total, removing the old under-counting line from the spec, and the CHANGELOG entry with a MINOR bump. Two existing tests must also stay green without edits: `receives collected response text and usage` and `keeps the usage an earlier round reported when a later round reports none`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}