I wrote two acceptance tests for #93. Both fail because the hook gets only the last round's usage, which is the bug the ticket reports. They're committed and pushed as `8bde9c2`. The branch was already up to date with `origin/main`, and it is not ahead of its upstream.

**Strategy: `direct`.** `createChatOrchestrator` with a scripted provider and a real `ToolRegistry` already runs a multi-round turn through to `afterModelResponse`, so the tests check the `usage` argument that hook receives. They use no mocks.

**Which shape I chose, and why.** The ticket leaves the choice open. The existing test `receives collected response text and usage` must stay unedited, and it checks that the third argument is exactly the single round's `UsageMetadata`. So the third argument has to stay a `UsageMetadata`, and it becomes the sum of the turn's provider calls. A per-round breakdown could still be added later, but only as an extra argument.

**Tests** (in `src/orchestration/turnUsage.acceptance.test.ts`):
1. **reports the sum of every provider call in a turn that ran two tool rounds** — three provider calls with different token counts, and the hook should get their sum.
2. **counts the rounds that reported usage when others report none, and reports nothing when none did** — a round with no usage is skipped without breaking the total, and a turn where no round reported still gives `undefined`.

The run (`NODE_OPTIONS=--experimental-vm-modules npx jest --coverage=false src/orchestration/turnUsage.acceptance.test.ts`):
```
  ● afterModelResponse usage across tool rounds › reports the sum of every provider call in a turn that ran two tool rounds
      Object {
    -   "inputTokens": 4500,
    -   "outputTokens": 400,
    -   "totalTokens": 4900,
    +   "inputTokens": 2000,
    +   "outputTokens": 300,
    +   "totalTokens": 2300,
      }
  ● afterModelResponse usage across tool rounds › counts the rounds that reported usage when others report none, and reports nothing when none did
        "partial": Object {
    -     "inputTokens": 1600,
    -     "outputTokens": 100,
    -     "totalTokens": 1700,
    +     "inputTokens": 900,
    +     "outputTokens": 80,
    +     "totalTokens": 980,
        },
        "silent": undefined,
Tests:       2 failed, 2 total
```
The received values are the final round's usage alone.

**Spec links.** I added a "Usage reported to afterModelResponse" section to `specs/hal-engine-config-hooks/spec.md`, with two statements linked to these tests. `npm run spec:names` passes. I did not change `Status`.

**Left for the implementer (all listed in `.lore/dod.md`):**
- **Old spec line:** the spec still has its "under-counts" bullet, which now contradicts the new section. They need to remove it and fix the "two properties" count in that section.
- **Type and changelog:** the hook's type needs to say the value is a sum. The CHANGELOG needs an entry and a MINOR version bump.

**Not tested:** the ticket's criterion that "the type makes the answer unambiguous" is about naming and documentation, so no test can check it. The review will have to judge it.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}