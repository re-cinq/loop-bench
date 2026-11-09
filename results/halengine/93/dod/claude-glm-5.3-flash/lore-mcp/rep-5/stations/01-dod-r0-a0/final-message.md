Done. Ticket #93 now has a red acceptance suite that pins exactly the reported under-count, committed and pushed on `loop-bench/93` (1142239), up to date with its upstream, and sitting on a merge-base with `origin/main` (867ad52) so CI will run.

**Triage: `direct`** — `createChatOrchestrator` accepts any `AIProvider`, so the tests drive real multi-round turns through a scripted provider and fail on what the hook receives today. No production code written; source is untouched.

**What landed** (`src/orchestration/afterModelResponseUsage.acceptance.test.ts`, 3 tests, 2 red / 1 pin):

1. `reports usage covering every provider call of a turn that ran two tool rounds` — RED. A turn whose three provider calls report 12/24/46 total tokens must deliver 82:
   ```
   - Expected  - 3   + Received  + 3
       Object {
     -   "inputTokens": 70,  - "outputTokens": 12,  - "totalTokens": 82,
     +   "inputTokens": 40,  + "outputTokens": 6,   + "totalTokens": 46,
   ```
2. `counts the rounds that reported when a round in between reports none` — RED. Reported rounds must still count (14+8=22) instead of the silent round erasing or poisoning the sum:
   ```
   - Expected  - 3   + Received  + 3
       Object {
     -   "inputTokens": 18,  - "outputTokens": 4,  - "totalTokens": 22,
     +   "inputTokens": 7,   + "outputTokens": 1,  + "totalTokens": 8,
   ```
   Both fail for precisely the ticket's claim: the hook receives the final provider call's usage alone (`lastUsage`).
3. `still reports no usage when no round of the turn reports any` — a pin, green today by design; it stops an accumulator from inventing a zeroed/`NaN` total.

**Decision the DoD records** (the ticket asks to decide): accumulate across rounds, keep one `usage` argument, rename it `totalUsage` with a one-line JSDoc. The per-round-breakdown shape is rejected because the ticket pins the no-tool path to today's value via an existing unedited test, which a wrapper shape would move. Criterion 4 (signature says "sum") is a signature/JSDoc facet — TypeScript cannot extract tuple labels, so no test can observe a parameter name; it is written into `.lore/dod.md` for the implementing round, along with the CHANGELOG/`check-doc-blocks --fix`/MINOR facets and the named existing pins that must stay unedited.

**Spec updated**: `specs/hal-engine-config-hooks/spec.md` replaces the recorded under-counting line with a new § "Usage reported to `afterModelResponse`" carrying four cited statements (three to my tests, one re-citing the existing no-tool-turn test as the unchanged-common-path pin). `check-spec-anchor-names`, `check-spec-links` and `check-spec-status` all pass (11 citations valid, 0 misplaced, Status `Shipped` still matches coverage), and prettier is clean on the test file.

Run command the next round uses:
```
node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/afterModelResponseUsage.acceptance.test.ts
```

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}