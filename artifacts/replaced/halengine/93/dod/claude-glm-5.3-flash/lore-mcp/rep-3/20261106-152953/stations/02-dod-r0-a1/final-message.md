Everything verifies. The work is complete, committed as `d7e0205`, and pushed. Here is the full accounting.

## Definition of Done — recorded in `.lore/dod.md`

**Strategy: `direct`** — the seam already exists: `createChatOrchestrator` plus a scripted provider and hooks, driven the way `chatOrchestrator.test.ts` already drives it. Chosen shape: the issue's first option — accumulate across rounds into one usage argument, exported as `TurnUsage`; the per-round breakdown is rejected in `Out of scope` with the reason.

## Red bars, actually run

```
node --experimental-vm-modules node_modules/jest/bin/jest.js \
  src/orchestration/chatOrchestrator.acceptance.test.ts src/orchestration/turnUsage.acceptance.test.ts
```

**1. Sums every provider call in a two-tool-round turn** — `src/orchestration/chatOrchestrator.acceptance.test.ts:49`. Scripted provider, three calls reporting `{100,20,120}`, `{30,7,37}`, `{4,9,13}`. Fails on exactly the ticket's claim — the hook got the final call alone:

```
expect(received).toEqual(expected) // deep equality
- Expected  - 3
+ Received  + 3
  Object {
-   "inputTokens": 134,
-   "outputTokens": 36,
-   "totalTokens": 170,
+   "inputTokens": 4,
+   "outputTokens": 9,
+   "totalTokens": 13,
  }
```

**2. Types the usage as `TurnUsage`, the turn total** — `src/orchestration/turnUsage.acceptance.test.ts:52`. ts-jest here runs without diagnostics, so this test drives the repo's own `typescript` compiler over a consumer snippet against the real modules. Fails on the missing export itself:

```
- Array []
+ Array [
+   "Module '\"./types/ai.js\"' has no exported member 'TurnUsage'.",
+ ]
```

**3. Nothing-reported guard** (green today, by design) — pins that a silent provider never poisons the sum into `undefined`/`NaN`; a turn where nothing reported still reports nothing. It guards behaviour the ticket does not change.

## Existing pins, green and unedited

`git diff origin/main...HEAD -- src/orchestration/chatOrchestrator.test.ts` is empty; both named tests pass:

```
Tests: 23 skipped, 1 passed, 24 total   ← receives collected response text and usage
Tests: 23 skipped, 1 passed, 24 total   ← keeps the usage an earlier round reported when a later round reports none
```

## Traceability and gates

- `specs/hal-engine-config-hooks/spec.md`: the recorded under-counting line is **replaced** by a "Usage reported to afterModelResponse" section, every statement citing its test; Status row untouched. All five `#Lnn` anchors verified against the cited test titles; `check-spec-anchor-names` (593 citations), `check-spec-status` and `check-spec-links` (1643 statements) all pass. Prettier clean on every changed file. This repo's descriptors carry no `spec` field, so the `([validated by …])` parenthetical is the established traceability form.
- Build/typecheck/eslint are CI's to judge per pod rules (OOM history) — the implementation round closes the remaining facets: the accumulation, the `TurnUsage` export, CHANGELOG `### Changed` entry, `CLAUDE.md` doc-block regen, and the two architecture-spec prose lines.

Branch `loop-bench/93` is pushed and 0 commits behind `origin/main`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}