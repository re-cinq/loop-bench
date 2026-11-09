Done. Here is where the ticket stands.

## What I did

**Triage: `direct`** — the seam already exists: `createChatOrchestrator` + a scripted provider drives a real multi-round turn through `afterModelResponse` today, and the hook's third argument is observable (it arrives as the final provider call's usage alone — exactly the ticket's claim). No new module, no characterization needed.

**Two red acceptance tests** in a new file, `src/orchestration/chatOrchestrator.usage.acceptance.test.ts` (run via `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/chatOrchestrator.usage.acceptance.test.ts`):

1. **hands the hook the usage of every provider call in the turn, summed across tool rounds** — a turn driven through two tool rounds (three provider calls reporting 110/45/70 total tokens) must deliver the per-field sum in one firing. Fails today on the ticket's exact claim:
   ```
   - Expected  - 3   + Received  + 3
     "usage": Object {
   -   "inputTokens": 190,
   -   "outputTokens": 35,
   -   "totalTokens": 225,
   +   "inputTokens": 50,          ← the last round alone
   +   "outputTokens": 20,
   +   "totalTokens": 70,
     }
   ```
2. **skips rounds that report no usage, and still reports nothing when no round reports** — a silent middle round must contribute nothing (no `undefined`/`NaN`) while the rounds that reported are still summed. Fails today because only the last reporting round is counted:
   ```
   "partial": Object {
   -  "inputTokens": 140,  -  "outputTokens": 15,  -  "totalTokens": 155,
   +  "inputTokens": 40,   +  "outputTokens": 5,   +  "totalTokens": 45,
   ```
   (its `silent: undefined` half already holds and stays pinned — the "nothing reported still reports nothing" guard).

The ticket's third pin — a no-tool turn reports exactly today's value — stays with the **existing, unedited** test `receives collected response text and usage` (`src/orchestration/chatOrchestrator.test.ts`), which survives both signature shapes the ticket weighs.

**Spec**: `specs/hal-engine-config-hooks/spec.md` — the "Measured semantics — out of scope" under-counting line is replaced by a cited "Turn usage reported to afterModelResponse" section (the sum, the skip/no-report rule, the unchanged no-tool path). `check-spec-anchor-names`, `check-spec-links`, `repoint-spec-anchors --check` and `check-spec-status` (--coverage: 0 unlinked statements, so the `Shipped` row stays consistent) all pass. `.lore/dod.md` records the strategy, the red tests, and the facets the implementing round owes: the accumulation itself, the signature/type saying "sum" plus the recorded rejection of the breakdown shape (criterion 4 is review-judged — both shapes produce the same observable sum, so a test would pre-empt the decision the ticket leaves open), the CHANGELOG `Changed` entry, and the `npm run verify` checklist CI judges.

## Findings for the implementing round

- `keeps the usage an earlier round reported when a later round reports none` (`chatOrchestrator.test.ts`) stays green **unedited** under sum semantics (sum of `[U1, none]` is `U1`) — don't touch it.
- `repoint-spec-anchors.mjs` now skips this spec whole (its citation set differs from `origin/main`), so the `chatOrchestrator.ts#L150` anchor will not be auto-repointed when you edit the orchestrator — hand-check it.
- If you change the hook's signature, CLAUDE.md's `OrchestratorHooks` block mirrors the declaration and `check-doc-blocks` gates CLAUDE.md in CI.

Committed (`4ac5cd5`) and pushed; `git status` reports the branch up to date with `origin/loop-bench/93`, merged with current `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}