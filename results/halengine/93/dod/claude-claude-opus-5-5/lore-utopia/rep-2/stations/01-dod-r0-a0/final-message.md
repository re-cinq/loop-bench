I've written two acceptance tests for #93. Both fail for the reason the ticket gives: `afterModelResponse` gets only the last round's usage. They're committed and pushed to `loop-bench/93`, the branch is up to date with `origin/main`, and nothing is left unpushed.

**Strategy: `direct`.** The tests call `createChatOrchestrator` with a scripted provider and a real tool registry, then read the `usage` the hook receives. No mocks and no production code.

**Test file:** `src/orchestration/turnUsage.acceptance.test.ts`
1. **Two tool rounds:** three provider calls report different token counts, and the hook must get their sum.
2. **Rounds that report nothing:** if a middle round reports no usage, the other rounds are still added up (no `NaN` or `undefined`). If no round reports, the hook still gets `undefined`.

The existing test `chatOrchestrator.test.ts › receives collected response text and usage` covers the turn with no tool calls. It must stay green and unedited, and it passes today (`Tests: 23 skipped, 1 passed`).

Failure output:
```
FAIL src/orchestration/turnUsage.acceptance.test.ts
  ● afterModelResponse turn usage (#93) › reports usage summed over every provider call of a turn that ran two tool rounds
    -   "inputTokens": 735,
    -   "outputTokens": 60,
    -   "totalTokens": 795,
    +   "inputTokens": 405,
    +   "outputTokens": 42,
    +   "totalTokens": 447,

  ● afterModelResponse turn usage (#93) › counts the rounds that reported usage when another round reported none, and reports nothing when none did
        "withGap": Object {
    -     "inputTokens": 505,
    -     "outputTokens": 49,
    -     "totalTokens": 554,
    +     "inputTokens": 405,
    +     "outputTokens": 42,
    +     "totalTokens": 447,
        },
        "withNone": undefined,

Tests:       2 failed, 2 total
```
In both cases the hook received only round 3's usage.

**Left for the implementing round** (listed under Facets in `.lore/dod.md`):
- **Make the type say it's a sum.** No runtime test can check a type, so the review judges this one. The tests only check the third hook argument. That fits either design the ticket offers, as long as a per-round breakdown, if added, goes in a separate argument.
- **Rewrite the spec line and add the CHANGELOG entry.** I didn't add a "validated by" link to `specs/hal-engine-config-hooks/spec.md`. The only matching line there describes the old under-counting, and the tests contradict it. The implementer replaces that line and links the new statement to these tests.
- **Record why the other design was rejected.** The ticket asks for this.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}