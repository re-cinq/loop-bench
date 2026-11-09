Done. Triage: **`direct`** — `createChatOrchestrator` is a real entry point; a scripted provider whose rounds report known token counts plus an `afterModelResponse` hook that records what it receives observes the under-count directly.

**What I wrote** (commit `fc8d5ed`, pushed to `loop-bench/93`, merges clean into `origin/main`):

- `src/orchestration/chatOrchestrator.usage.acceptance.test.ts` — three acceptance tests, each cited from the spec so `require-spec-link` passes.
- `specs/hal-engine-config-hooks/spec.md` — the recorded under-counting bullet is replaced by the new behaviour, stated as four cited statements (sum across calls, silent rounds don't poison the total, nothing reported → nothing, no-tool turn pinned on the existing unedited test). `check-spec-anchor-names --fix` reports all 11 citations naming the tests they point at; `check-spec-links` reports 0 misplaced.
- `.lore/dod.md` — strategy, the shape decision (ticket option A: summed total handed as a named `TurnUsageMetadata`; option B's per-round breakdown rejected — no consumer, additive later), facets, out-of-scope.

**Red bar — actual output** (`NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/chatOrchestrator.usage.acceptance.test.ts`):

```
● … › hands afterModelResponse the usage of every provider call in a two-round turn
  - Expected  - 3        + Received  + 3
  -     "inputTokens": 140,   "outputTokens": 80,   "totalTokens": 220,
  +     "inputTokens": 40,    "outputTokens": 60,   "totalTokens": 100,
Tests: 2 failed, 1 passed, 3 total
```

The second red test fails the same way ({40,10,50} expected vs the last round's {30,6,36} received) — both fail for exactly the ticket's claim: the hook gets the final call's usage alone. The third test (nothing reported → nothing) is green today by design; it pins the half that must not move, as does the existing `receives collected response text and usage` test, which I ran green and left unedited.

**Findings for the next round:** (1) `scripts/lore-run-test.mjs` always exits 1 in this repo — it adds `--coverage`, and the ratchet in `jest.config.js` then compares a single-file run against whole-tree floors; the selected test's own result still prints above the noise, so run files directly with jest. (2) Criterion 4 (the type says "sum") is invisible at runtime — the spec statement names `TurnUsageMetadata` and dod.md holds the round to the alias + hook annotation + `src/index.ts` export; review checks that line. (3) CHANGELOG `### Changed` bullet + MINOR bump remain owed by the implementing round (criterion 5's second half).

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}