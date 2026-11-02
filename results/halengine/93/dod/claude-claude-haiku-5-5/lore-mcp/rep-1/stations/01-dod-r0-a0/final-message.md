Two acceptance tests are committed and pushed to `loop-bench/93` (commit `6b2d8d1`). Both fail, for the reason the ticket states. The branch is up to date with its upstream and `origin/main` needed no merge.

**Triage: `direct`.** `createChatOrchestrator` with a scripted `AIProvider` and the `afterModelResponse` hook is already a real seam, so no refactor is needed first.

**Tests** (`src/orchestration/chatOrchestratorUsage.acceptance.test.ts`):
1. Reports the sum of usage over every provider call in a turn that ran two tool rounds. Three provider calls report 14, 26 and 38 total tokens; the hook must receive 60/18/78.
2. Counts the rounds that reported usage when an intermediate round reports none, and reports `undefined` when nothing reported. The partial case expects 40/12/52.

I ran only that file, with `node --experimental-vm-modules node_modules/jest/bin/jest.js src/orchestration/chatOrchestratorUsage.acceptance.test.ts`. The failure output:

```
FAIL src/orchestration/chatOrchestratorUsage.acceptance.test.ts
  ● afterModelResponse usage across tool rounds › reports the sum of usage over every provider call in a turn that ran two tool rounds
    - Expected  - 3
    + Received  + 3
    - "inputTokens": 60,  - "outputTokens": 18,  - "totalTokens": 78,
    + "inputTokens": 30,  + "outputTokens": 8,   + "totalTokens": 38,
  ● afterModelResponse usage across tool rounds › counts the rounds that reported usage when an intermediate round reports none, and reports nothing when none reported
    - "inputTokens": 40, - "outputTokens": 12, - "totalTokens": 52,
    + "inputTokens": 30, + "outputTokens": 8,  + "totalTokens": 38,
Tests: 2 failed, 2 total
```

Both failures show the hook receiving only the final round's 30/8/38, which is the ticket's claim. The silent-turn assertion passes today, as it should, since it pins existing behaviour.

**`.lore/dod.md`** quotes the central claim, records the `direct` triage, and lists the facets. The DoD file's CI job is `Verify` (`.github/workflows/ci.yml`), step "Test (with coverage floor)", which runs `npm run test:coverage`.

**Things to know:**
- The repo runs **Jest**, not Vitest, so the file follows the Jest suite's conventions.
- The tests assert on the `usage` argument only, so either design the ticket allows (sum, or sum plus a per-round breakdown) passes them. The shape decision is left to the implementation round.
- I did not add a traceability parenthetical to `specs/hal-engine-config-hooks/spec.md`. The statement the tests validate is the replacement line, which does not exist yet. The implementation round should replace the under-counting line and link these tests.
- The ticket's remaining criteria (the `any`-free type, the CHANGELOG entry, the spec edit, and CI's build, lint and format gates) are facets for the implementation, not acceptance tests here.
- I ran Prettier on the two files I touched, skipped lint and typecheck as instructed, and did not run a workspace build.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}