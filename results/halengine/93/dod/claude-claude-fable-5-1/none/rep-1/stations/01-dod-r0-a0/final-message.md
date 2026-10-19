Pushed and in sync with upstream. The branch is not ahead of `origin/loop-bench/93`, and `origin/main` was already merged in.

**Strategy: `direct`.** The seam exists today. `createChatOrchestrator` accepts a real provider, a real tool registry and an `afterModelResponse` hook, so the tests drive a scripted provider through tool rounds and read the third argument the hook receives. No mocks.

**Two red acceptance tests** in `src/orchestration/chatOrchestrator.acceptance.test.ts`, both failing because the hook gets only the final round's counts:

- Two tool rounds then an answer, each call reporting different counts. Expected the field-by-field sum, received the last call alone.
- A middle round reporting no usage, plus a turn where nothing reported. Expected the two reporting rounds summed and `undefined` for the silent turn. Received only the last reporting round.

Failure output:

```
● reports the usage of every provider call in a turn that ran two tool rounds, not only the last
  - "inputTokens": 600,   - "outputTokens": 60,   - "totalTokens": 660,
  + "inputTokens": 300,   + "outputTokens": 30,   + "totalTokens": 330,

● counts the rounds that reported usage when others reported none, and reports nothing when no round did
    "partlyReported": Object {
  -   "inputTokens": 16,  -   "outputTokens": 5,  -   "totalTokens": 21,
  +   "inputTokens": 5,   +   "outputTokens": 2,  +   "totalTokens": 7,
    },
    "silent": undefined,

Tests:       2 failed, 2 total
```

**Shape decision left to the implementer, with one constraint.** The ticket weighs sum-only against sum plus breakdown. The existing no-tools test uses `toEqual` against a plain usage object and must stay unedited, so the third argument has to be the per-turn total under either shape. A breakdown, if chosen, goes beside it. The DoD says so.

**Also committed.** The spec's under-counting line is replaced by three cited statements, including the existing no-tools test as the "unchanged" pin. `.lore/dod.md` lists the facets still owed: the running total in the orchestrator, a type that says it is a sum, the CHANGELOG entry, and regenerating the hook block in CLAUDE.md and README if the signature changes.

**Finding, not in scope.** The type-level criterion and the CHANGELOG line are not runtime-observable, so they are facets for review rather than tests.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}