The ticket is expressed as two red acceptance tests. They're committed and pushed to `loop-bench/93`, and the branch is level with its upstream and already contains `origin/main`.

**Strategy: `direct`.** `createChatOrchestrator` already takes a provider and hooks, so a scripted provider drives the real `afterModelResponse` call site.

**Failing output**, from `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/afterModelResponseUsage.acceptance.test.ts`:

```
● ... reports the sum of the usage of every provider call across two tool rounds
    expect(received).toEqual(expected)
    - Expected  - 3
    + Received  + 3
      Object {
    -   "inputTokens": 900,
    -   "outputTokens": 100,
    -   "totalTokens": 1000,
    +   "inputTokens": 500,
    +   "outputTokens": 30,
    +   "totalTokens": 530,
      }
    > 67 |     expect(usage).toEqual({inputTokens: 900, outputTokens: 100, totalTokens: 1000});

● ... adds up the rounds that reported and leaves out a round that reported none
    - Expected  - 3
    + Received  + 3
    -   "inputTokens": 600, "outputTokens": 50, "totalTokens": 650
    +   "inputTokens": 500, "outputTokens": 30, "totalTokens": 530
    > 80 |     expect(usage).toEqual({inputTokens: 600, outputTokens: 50, totalTokens: 650});

Tests: 2 failed, 2 total
```

Both fail on the ticket's claim: the hook gets only the final round's usage. I ran them with the repo's own ESM flags, which is how `npm test` runs them.

**What's in the commit**
- `src/orchestration/afterModelResponseUsage.acceptance.test.ts`: the two tests. The first covers the ticket's two-tool-round criterion. The second covers the case where a round reports nothing.
- `.lore/dod.md`: the DoD, quoting the ticket's central claim. It lists the existing tests that must stay green: the no-tool usage test and the earlier-round-usage test in `chatOrchestrator.test.ts`, plus the tool-budget usage test in `toolBudget.test.ts`.
- `specs/hal-engine-config-hooks/spec.md`: a trailing `validated by` link on the under-counting bullet, pointing at the first test. The bullet still describes today's behaviour, and the ticket's implementation is meant to replace it. The spec's "out of scope" wording now sits next to a link to a red test, so the implementer should reword it along with the replacement.

**Choices I made**
- I wrote the tests against a single summed `usage` argument, the simpler shape. The ticket leaves the choice open. If the implementer picks "sum plus per-round breakdown", the first test still holds as long as `usage` stays the total.
- The ticket's type-clarity criterion and its CHANGELOG criterion have no runtime test, so they're facets in the DoD.
- The "nothing reported stays `undefined`" case already passes today, so it can't be a red test. It's a facet to keep true.

**Not run here:** the full `npm test`, lint, typecheck and build. I ran only the new test file, as instructed.

**Lore:** no `lore_*` tools were available in this pod, so I couldn't query the lore context or write memory.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}