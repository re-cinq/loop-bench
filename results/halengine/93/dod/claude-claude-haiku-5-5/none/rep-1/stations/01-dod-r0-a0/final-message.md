The branch is committed, pushed, and in sync with its upstream, and the merge with `origin/main` needed nothing.

Acceptance tests for #93 are committed and pushed. The branch is `loop-bench/93`, at `dc42377`, and it is not ahead of its upstream.

**Triage: `direct`.** The seam exists: `createChatOrchestrator` takes a real `AIProvider` and `OrchestratorHooks`, so a scripted provider can drive a two-round turn and the `afterModelResponse` hook can observe the usage it receives.

**Tests** (`src/orchestration/chatOrchestrator.usage.acceptance.test.ts`, the one new file):
- **Sums every provider call in a two-round turn.** Three calls report 100/20, 300/40 and 500/60; the hook must receive 900/120/1020.
- **Skips silent rounds, and reports nothing when nothing reported.** A middle round with no usage is left out of the total (10/5 + 1/2 gives 11/7), and a turn where no round reported still hands the hook `undefined`.

I also listed the existing single-round test in `chatOrchestrator.test.ts` as a must-stay-green, unedited regression guard for the no-tool path. It is not a new test.

I ran the new file with Jest and both tests fail for the reason the ticket states:

```
● afterModelResponse usage across tool rounds › reports the sum of every provider call in a turn that ran two tool rounds
    - Expected  - 3
    + Received  + 3
    -   "inputTokens": 900,
    +   "inputTokens": 500,
    -   "outputTokens": 120,
    +   "outputTokens": 60,
    -   "totalTokens": 1020,
    +   "totalTokens": 560,

● afterModelResponse usage across tool rounds › leaves out a round that reported nothing, and reports nothing when no round did
    - "inputTokens": 11,
    + "inputTokens": 1,
    - "outputTokens": 7,
    + "outputTokens": 2,
    - "totalTokens": 18,
    + "totalTokens": 3,
```

Each failure shows only the last round's usage reaching the hook, which is the reported defect.

**Choices I made:**
- The tests pin the summed total in the existing `usage` argument position. Both shapes in the ticket satisfy that, so the single-argument vs. total-plus-breakdown decision is left to the implementer and recorded in `.lore/dod.md`.
- The "nothing reported stays undefined" clause is folded into the partial-usage test. Alone it would already pass today, and every acceptance test has to be red.
- I did not add a `validated by` link on the spec's under-counting bullet in `specs/hal-engine-config-hooks/spec.md`. That statement describes the behaviour this ticket replaces, so the link belongs on its rewritten form. This is a facet in `.lore/dod.md`.
- The type-clarity criterion and the CHANGELOG line are facets, not tests. A runtime test cannot observe a type, and the changelog is prose.

**Not run here:** I did not run lint, typecheck, prettier:check or the full suite. The only formatter I ran was prettier on the new test file.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}