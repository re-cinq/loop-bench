I've written two acceptance tests for #93. Both fail for the reason the ticket gives, and they're committed and pushed to `loop-bench/93`. The branch is already up to date with `origin/main` and not ahead of its upstream.

**Strategy: `direct`.** The tests call `createChatOrchestrator` directly, with a scripted provider and a real tool registry, and check the `usage` that `afterModelResponse` receives. There are no mocks.

**Design decision (written up in `.lore/dod.md`):** the hook keeps its single `usage` argument, and that argument becomes the sum across all rounds in the turn. I rejected the "sum plus per-round breakdown" shape because nothing in the epic needs per-call detail yet, and it can be added later without breaking the sum.

**Files:**
- `src/orchestration/turnUsage.acceptance.test.ts` — the two new tests.
- `specs/hal-engine-config-hooks/spec.md` — the line recording the under-count is removed, and a new "Usage across tool rounds" section links to the tests. I didn't touch the Status row. The spec anchor and link checks both pass.
- `.lore/dod.md` — the strategy, the tests, the remaining steps and what's out of scope.

The no-tools case is covered by the existing test `receives collected response text and usage` in `chatOrchestrator.test.ts`, which must stay green without being edited.

I wanted a third test for "a turn where nothing reported still reports nothing", but it passes today, so on its own it wouldn't be red. I folded it into the second test's assertion instead.

Output of `NODE_OPTIONS=--experimental-vm-modules npx jest --silent src/orchestration/turnUsage.acceptance.test.ts`:
```
  ● afterModelResponse usage across tool rounds › reports the sum of every provider call in a turn that ran two tool rounds
    -   "inputTokens": 600,
    -   "outputTokens": 60,
    -   "totalTokens": 660,
    +   "inputTokens": 300,
    +   "outputTokens": 30,
    +   "totalTokens": 330,

  ● afterModelResponse usage across tool rounds › counts the rounds that reported usage, and reports none when no round reported any
        "never": undefined,
        "partly": Object {
    -     "inputTokens": 400,
    -     "outputTokens": 40,
    -     "totalTokens": 440,
    +     "inputTokens": 300,
    +     "outputTokens": 30,
    +     "totalTokens": 330,

Tests:       2 failed, 2 total
```
In both cases the hook receives only the last provider call's usage, which is the ticket's complaint exactly.

Two acceptance criteria are left to the implementing round as steps in `.lore/dod.md`: making the hook's type say it receives a sum, and the CHANGELOG entry with a MINOR version bump. Neither can be checked by a behaviour test.

The repo's test listing only reports an id, name and file for each test, so I couldn't stamp a spec anchor on the tests. Each test's link to the spec comes from the citation in the spec text.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}