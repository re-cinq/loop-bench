I wrote two acceptance tests for #93, ran them, and both fail because the hook still gets only the last round's usage. They're committed and pushed to `loop-bench/93`. `origin/main` had nothing new to merge, and `git status` shows the branch is level with its upstream.

**Strategy: `direct`.** I tested through `createChatOrchestrator`: a scripted provider reports different usage on each round, and the tests read what `afterModelResponse` receives. No mocks were needed.

**Design decision (recorded in `.lore/dod.md`):** `afterModelResponse` keeps a single `usage` argument, which becomes the sum of every round in the turn. I rejected also passing a per-round breakdown because it widens the public API for detail nobody has asked for. Summing changes what existing consumers record, so the implementation owes a MINOR version bump and a CHANGELOG line.

**What's in the commit:**
- **`src/orchestration/turnUsage.acceptance.test.ts`**, with two tests:
  1. *reports the sum of every provider call in a turn driven through two tool rounds* — three provider calls reporting 110, 220 and 330 total tokens should give the hook 600/60/660.
  2. *counts the rounds that reported usage when others did not, and reports nothing when none did* — if the middle round reports nothing, the total is 440. If no round reports, the hook gets `undefined`, never zeros or `NaN`.
- **`specs/hal-engine-config-hooks/spec.md`**: a new "Turn usage" section replaces the under-counting line, and each statement links to its test. I left `Status` alone.
- **`.lore/dod.md`**: the plan for the next round.

A turn with no tools stays pinned by the existing `chatOrchestrator.test.ts` test *receives collected response text and usage*, which must stay green and unedited.

**Failure output** (`NODE_OPTIONS=--experimental-vm-modules npx jest src/orchestration/turnUsage.acceptance.test.ts`):
```
● afterModelResponse usage for a turn that ran tools › reports the sum of every provider call in a turn driven through two tool rounds
    -     "inputTokens": 600,
    -     "outputTokens": 60,
    -     "totalTokens": 660,
    +     "inputTokens": 300,
    +     "outputTokens": 30,
    +     "totalTokens": 330,

● afterModelResponse usage for a turn that ran tools › counts the rounds that reported usage when others did not, and reports nothing when none did
        "partly": Object {
    -       "inputTokens": 400,
    -       "outputTokens": 40,
    -       "totalTokens": 440,
    +       "inputTokens": 300,
    +       "outputTokens": 30,
    +       "totalTokens": 330,

Tests:       2 failed, 2 total
```
The hook receives exactly the final round's usage, which is the under-count the ticket describes.

**Left for the review, not the tests:** the ticket also wants the hook's type to make it clear the value is a sum. That's a type-level property a runtime test can't check. The DoD suggests an exported `TurnUsage` type with a one-line doc comment, plus the CHANGELOG entry.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}