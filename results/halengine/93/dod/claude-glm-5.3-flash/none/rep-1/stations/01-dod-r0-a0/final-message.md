Done. Branch `loop-bench/93` is pushed (`ec5244d`) and not ahead of its upstream; `origin/main` had nothing new to merge.

## What I did

**Triage: `direct`** — the seam the ticket names already exists: `createChatOrchestrator` + a scripted provider + the `afterModelResponse` hook, driven through `processMessage`. No production code written.

**Acceptance tests** (new file `src/orchestration/chatOrchestrator.usage.acceptance.test.ts`, run with `node --experimental-vm-modules node_modules/jest/bin/jest.js --runTestsByPath src/orchestration/chatOrchestrator.usage.acceptance.test.ts`):

1. **`reports the sum of every provider call in a two-round turn, not the last round alone`** — RED, failing for the ticket's exact stated reason. Rounds report {100,20,120} then {5,40,45}; the hook receives only the last leg:
   ```
   - Expected  - 3        + Received  + 3
   -   "inputTokens": 105,   +   "inputTokens": 5,
   -   "outputTokens": 60,   +   "outputTokens": 40,
   -   "totalTokens": 165,   +   "totalTokens": 45,
   Tests: 2 failed, 1 passed, 3 total
   ```
2. **`counts only the rounds that reported usage when a round between them reports none`** — RED: rounds {10,4,14}, none, {5,6,11} → received {5,6,11}, expected the partial sum {15,10,25}. This pins the no-`undefined`/no-`NaN` half of criterion 3.
3. **`reports nothing when no round in the turn reported usage`** — green today; guards the other half of criterion 3 against an accumulator that always emits `{0,0,0}`.
4. Criterion 2 (no-tool turn unchanged) is pinned by the **existing unedited** test `receives collected response text and usage` (`src/orchestration/chatOrchestrator.test.ts:236`), which I verified stays green — the existing file is untouched by this commit.

**Spec + traceability**: the recorded under-counting line in `specs/hal-engine-config-hooks/spec.md` is replaced by a "Usage reported to afterModelResponse" section whose statements cite all three new tests plus the existing no-tool pin. The repo's own gates pass locally: `check-spec-anchor-names` (11 citations name their tests), `check:spec-links` (0 misplaced), `check:spec-status` (0 findings), `repoint-spec-anchors --check origin/main` (clean; the edited spec is taken-as-authored since it cites a new file). Prettier ran over the new test file.

**`.lore/dod.md`** records the claim verbatim, the strategy, the four done-when items, and the facets still owed to the implementer: the accumulate-in-loop edit, making the declaration say "sum" (criterion 4 — a parameter name is not observable through behaviour and a source scan is a prose guard, so it is a review-judged facet, not a red test), recording the rejected shape on the issue, and the CHANGELOG entry under `[Unreleased]` → `Changed` (which `scripts/check-changelog.sh` will demand once `src/` non-test files change; a MINOR bump at release per the ticket).

**Finding**: `example/server.ts:43`, `example/full-config.ts:31`, `README.md:74` and `docs/getting-started.md:130` log `afterModelResponse`'s usage — their logged values will grow for tool-heavy turns. Shape-unchanged, so no edit is owed by the ticket; worth a glance when writing the changelog migration note.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}