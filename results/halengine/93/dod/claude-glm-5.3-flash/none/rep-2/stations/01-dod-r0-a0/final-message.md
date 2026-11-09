Done. Ticket #93 is now defined by two red acceptance tests, committed and pushed on `loop-bench/93` (commit `49ce7ee`, branch up to date with `origin/main` and with its upstream).

**Triage: `direct`** — the seam already exists: `createChatOrchestrator` accepts any `AIProvider`, and the suites already drive it with a scripted provider whose rounds are known. The tests call that real entry point and fail on the reported number, so no new module was needed.

**What I wrote** — `src/orchestration/chatOrchestratorUsage.acceptance.test.ts` (new file, beside the code), plus `.lore/dod.md` recording the claim, strategy, guards and owed edits. Two tests, no production code:

1. *reports usage covering every provider call of a two-tool-round turn…* — round 1 reports `{100, 10, 110}`, round 2 `{200, 20, 220}`; the hook must receive `{300, 30, 330}`.
2. *counts the rounds that reported when a round reports no usage, and still reports nothing when none did* — rounds `none / {50,5,55} / {60,6,66}` must report `{110, 11, 121}`, and a turn where nothing reported still reports `undefined`.

**Run** (`node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestratorUsage.acceptance.test.ts`) — both red, each for exactly the ticket's stated reason (the hook gets the final provider call alone, not every call in the turn):

```
● afterModelResponse usage across tool rounds › reports usage covering every provider call of a two-tool-round turn, with rounds reporting known, different counts
    - Expected  - 3
    + Received  + 3
      Object {
    -   "inputTokens": 300,
    -   "outputTokens": 30,
    -   "totalTokens": 330,
    +   "inputTokens": 200,
    +   "outputTokens": 20,
    +   "totalTokens": 220,
    at Object.<anonymous> (src/orchestration/chatOrchestratorUsage.acceptance.test.ts:81:18)

● afterModelResponse usage across tool rounds › counts the rounds that reported when a round reports no usage, and still reports nothing when none did
    - Expected  - 3
    + Received  + 3
      Object {
        "partial": Object {
    -     "inputTokens": 110,
    -     "outputTokens": 11,
    -     "totalTokens": 121,
    +     "inputTokens": 60,
    +     "outputTokens": 6,
    +     "totalTokens": 66,
        },
        "silent": undefined,
      }
    at Object.<anonymous> (src/orchestration/chatOrchestratorUsage.acceptance.test.ts:104:31)

Tests:       2 failed, 2 total
```

The `silent: undefined` half already matches today — it rides in the same test as the red `partial` case so the nothing-reported guarantee stays pinned without a green-only test.

**Guards verified green and required unedited** (criterion 2's "exactly what it reports today"): `src/orchestration/chatOrchestrator.test.ts` — 24 passed (incl. "receives collected response text and usage" and "keeps the usage an earlier round reported when a later round reports none", both of which an accumulate implementation satisfies as written); `src/orchestration/toolBudget.test.ts` — 16 passed.

Two notes for the implementing round, recorded in `.lore/dod.md`: the ticket's criteria jointly force the hook's usage argument to stay a plain `UsageMetadata` that deep-equals today's value on a no-tool turn (the unedited guard test), so shape 2's per-round breakdown can only be an additional argument — the choice between the shapes is left to that round, and criterion 4 (the type says "sum") is review-judged, since a test could only pin an invented type name. Spec/CHANGELOG edits and the build/typecheck/eslint/prettier gates are owed edits and CI's to prove, per the pod's limits.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}