Done. Branch `loop-bench/93` is pushed and even with its upstream; `origin/main` is already an ancestor (no drift, no conflicts).

## Triage: `direct`

The seam already exists — `createChatOrchestrator` is the real entry point and the suite already drives it with a scripted multi-round provider and recording hooks. The acceptance test calls it today and fails on exactly the reported under-count.

**Shape decided** (the ticket asks for a decision): accumulate across rounds and pass the sum, keeping one `usage` argument. The ticket's own criterion 2 selects it — "pinned by the existing test remaining unedited" only holds if the hook still receives a bare `UsageMetadata`; the per-round-breakdown shape would move both, and that rejection is recorded in `.lore/dod.md`.

## Red bar (run, not guessed)

`node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/chatOrchestrator.usage.acceptance.test.ts` → `Tests: 2 failed, 1 passed, 3 total`:

```
● ChatOrchestrator afterModelResponse usage › reports usage summed across every provider call of a two-round turn
    - Expected  - 3
    + Received  + 3
      Object {
    -   "inputTokens": 150,
    -   "outputTokens": 30,
    -   "totalTokens": 180,
    +   "inputTokens": 50,
    +   "outputTokens": 10,
    +   "totalTokens": 60,
      }
● ChatOrchestrator afterModelResponse usage › counts the rounds that reported when a middle round reports none
    +   "inputTokens": 50,  "outputTokens": 10,  "totalTokens": 60,   // the last round's alone
```

Both fail because the hook receives the final provider call's usage alone — the ticket's claim verbatim. The third test, **reports nothing when no round reported usage**, is green today by design: criterion 3's second half ("a turn where nothing reported still reports nothing") already holds, so it is committed as a guard the change must not break, not as a red bar.

## Committed (`62e118e`)

- `src/orchestration/chatOrchestrator.usage.acceptance.test.ts` — new file, prettier-formatted, one expect per test, no mocks: scripted provider with known, different token counts per round.
- `specs/hal-engine-config-hooks/spec.md` — the recorded under-counting line is replaced by a "Usage reported to afterModelResponse" section citing the new tests (plus the unedited existing pin). `check-spec-anchor-names`, `check-spec-links` and `check-spec-status` all pass (11 citations, 0 findings). This was forced by the repo: `re-lint/require-spec-link` makes an uncited new test a build failure.
- `.lore/dod.md` — claim, strategy, acceptance set, facets, out-of-scope.

**Findings for the implementing round** (facets, not tests): the signature must say the answer (criterion 4 is review/CI-judged, not runtime-testable — a one-line JSDoc on the `afterModelResponse` member stating it is the turn's total); the CHANGELOG `### Changed` entry with migration note and MINOR bump; and note the existing test *'keeps the usage an earlier round reported when a later round reports none'* also stays green unedited under the sum, since only one round reported. I ran only my test file — lint, typecheck and build are CI's to judge per the pod's constraints.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}