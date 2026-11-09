Done. The red bar is committed and pushed.

## What the ticket needed

`afterModelResponse` receives the `lastUsage` local — the final provider call's usage alone — so tool-heavy turns under-count exactly where it hurts. The spec even records it as known-but-unowned behaviour (`specs/hal-engine-config-hooks/spec.md`, "Measured semantics"). The seam already exists: `createChatOrchestrator` + a scripted provider drives a real multi-round turn, so this is `direct`.

**Strategy: `direct`** — I decided the signature question the ticket posed (recorded in `.lore/dod.md`): pass **both** — third argument renamed `totalUsage` (the componentwise sum over every provider call that reported) plus a new fourth `roundUsage?: UsageMetadata[]` (per-call breakdown, in order). The sum-only shape was rejected because it drops provider-call granularity; a wrapped `{total, rounds}` object was rejected because the ticket requires the no-tool path to report exactly today's value, pinned by the existing test remaining unedited.

## Acceptance tests (new file, run, all red for the ticket's reason)

`src/orchestration/chatOrchestrator.usage.acceptance.test.ts` — 4 tests, all failing:

```
● … › reports usage covering every provider call of a two-tool-round turn
    - Expected  - 13
    + Received  +  2
        "roundUsage": undefined,
        "totalUsage": Object { "inputTokens": 4100, "outputTokens": 900, "totalTokens": 5000 }
    -   "totalUsage": Object { "inputTokens": 5300, "outputTokens": 1200, "totalTokens": 6500 }
    -   "roundUsage": [ {…1500…}, {…5000…} ]
```

The hook received only round 2's usage — the claim itself. The mixed-reporting test fails the same way ({7,2,9} instead of {18,5,23}); the nothing-reported test fails on `roundUsage: undefined` vs `[]`; the no-tool test fails on the missing breakdown while `totalUsage` is already exactly the provider's usage — the common path the ticket says must not move.

Also pinned (existing, green today, must stay unedited): "receives collected response text and usage" and "keeps the usage an earlier round reported when a later round reports none" — both verified passing.

`specs/hal-engine-config-hooks/spec.md` now replaces the under-counting line with five cited statements (anchors landed on the `it(` lines via `spec:names:fix`); the CHANGELOG entry is left to the implementing round (noted in the dod, along with why CI's changelog gate will be red until then).

Run: `NODE_OPTIONS=--experimental-vm-modules npx jest --runTestsByPath src/orchestration/chatOrchestrator.usage.acceptance.test.ts` → `Tests: 4 failed, 4 total`. CI's "Verify" job in `.github/workflows/ci.yml` runs these on every push.

One finding, not a substitute subject: the spec statement linking `[chatOrchestrator.ts#L148](…ts#L148)` / `#L150` will drift the moment the orchestrator is edited — those are prose links the gates don't check, worth re-eyeballing when the round lands.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}