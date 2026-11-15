I've written two acceptance tests for #93. Both fail for the reason the ticket gives, and they're committed and pushed. Merging `origin/main` brought in nothing new, and the branch is level with its upstream.

**Strategy: `direct`.** `createChatOrchestrator(...).processMessage`, given a scripted provider, already runs a turn with several tool rounds through to `afterModelResponse`, so the tests call it directly.

**The ticket's open choice.** I chose to add up usage across rounds and keep the single `usage` argument. I rejected passing a per-round breakdown as well: nothing in the ticket needs that detail, and it would widen the public hook signature. `.lore/dod.md` records this and notes it needs a MINOR version bump and a CHANGELOG line.

**Tests**, in `src/orchestration/turnUsage.acceptance.test.ts`:
1. **Two tool rounds:** three provider calls report 110, 220 and 330 total tokens, and the hook should receive their sum.
2. **Rounds with no usage:** a middle round that reports nothing still leaves the sum of the other two. A turn where no round reports anything still passes `undefined`.

The existing test `receives collected response text and usage` in `chatOrchestrator.test.ts` covers "a turn with no tools reports what it does today". `.lore/dod.md` lists it as a test that must stay unedited and green.

The red bar, from `node --experimental-vm-modules node_modules/jest/bin/jest.js --coverage=false src/orchestration/turnUsage.acceptance.test.ts`:
```
  ● ... › reports usage covering every provider call of a turn driven through two tool rounds
    -   "inputTokens": 600,
    -   "outputTokens": 60,
    -   "totalTokens": 660,
    +   "inputTokens": 300,
    +   "outputTokens": 30,
    +   "totalTokens": 330,

  ● ... › counts the rounds that reported usage when others did not, and reports nothing when none did
        "none": undefined,
        "partial": Object {
    -     "inputTokens": 400,
    -     "outputTokens": 40,
    -     "totalTokens": 440,
    +     "inputTokens": 300,
    +     "outputTokens": 30,
    +     "totalTokens": 330,
Tests:       2 failed, 2 total
```
In both tests the hook receives only the final round's usage (330 total tokens), which is the under-count the ticket reports.

**Spec links not added yet.** The only related line in `specs/hal-engine-config-hooks/spec.md` describes the current under-counting. Marking it "validated by" these tests would claim the opposite of what it says. The ticket already requires that line to be replaced, so `.lore/dod.md` lists rewriting it with the `([validated by ...])` links to these tests as a remaining step. The tests' `describe` title includes the spec path. The repo has no `scripts/spec-links/reanchor.mjs`, so those links will need their line numbers set by hand.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}