Done. Branch `loop-bench/93` is pushed (commit `d19748d`), up to date with its upstream, and its base `origin/main` (`867ad52`) merged clean — nothing to reconcile.

## Triage: `direct`

The seam already exists: `createChatOrchestrator` is the real entry point, and the scripted-provider pattern the repo already uses drives the tool loop round by round. I wrote three acceptance tests in a new file, `src/orchestration/turnUsage.acceptance.test.ts`, beside the code — plus the spec statements that cite them and `.lore/dod.md`.

**Shape the tests pin** (the ticket says "decide"; dod.md records it): pass both — the third argument stays `usage` and becomes the sum across every provider call, a new fourth argument carries each call's own `UsageMetadata` in call order. Accumulate-only was rejected on the ticket's own criterion 4: a bare `UsageMetadata` can't say whether it's a sum, so the reader is back to opening the orchestrator. No-tool turns keep exactly today's report, since one call sums to itself.

## Failure output, quoted (run: `jest.js src/orchestration/turnUsage.acceptance.test.ts`)

```
● afterModelResponse usage across a turn › reports the sum of every provider call in a two-round turn, with each call reported apart
    - Expected  - 13
    + Received  +  2
      Object {
    -   "perRound": Array [
    -     Object { "inputTokens": 10, "outputTokens": 4, "totalTokens": 14 },
    -     Object {
    +   "perRound": undefined,
    +   "usage": Object {
          "inputTokens": 100,
          "outputTokens": 40,
          "totalTokens": 140,
    -   "usage": Object {
    -     "inputTokens": 110, "outputTokens": 44, "totalTokens": 154,

● afterModelResponse usage across a turn › counts the calls that reported when a silent round sits between them
    - Expected  - 3
    + Received  + 3
    -   "inputTokens": 110, "outputTokens": 44, "totalTokens": 154,
    +   "inputTokens": 100, "outputTokens": 40, "totalTokens": 140,

Tests:       2 failed, 1 passed, 3 total
```

Both fail for the ticket's stated reason: the hook receives the final provider call's usage alone (100/40/140), not the sum (110/44/154), and no per-call breakdown exists. The third test (nothing reported → still reports nothing) is green now by design — it pins the preservation clause of criterion 3. Criterion 2 is pinned by the existing test remaining unedited: `chatOrchestrator.test.ts` ran **24/24 green, unedited**. Spec gates verified clean: `spec:names` (12 citations named), `check:spec-links` (0 misplaced), `check:spec-status` (0 findings), `repoint-spec-anchors --check origin/main` (0 stale).

## Findings for the next pod

- **ts-jest here is transpile-only** — verified with a deliberate type error, which jest passes. So criterion 4's static half is enforced by CI's `npm run typecheck` (the `Verify` job): the acceptance helper installs `afterModelResponse` as a **four-argument consumer literal**, which the typecheck refuses until the published signature declares the fourth argument. That type error is the intended gate — don't fix it by editing the test.
- The `scripts/spec-links/reanchor.mjs` named in my brief doesn't exist in this repo; the equivalent is `scripts/repoint-spec-anchors.mjs`, which I ran instead.
- CHANGELOG entry, the `rounds?: UsageMetadata[]` declaration, the generated `CLAUDE.md` hook block (`npm run docs:fix` gates it), and the MINOR bump remain as implementing facets, listed in `.lore/dod.md`.

LORE_NODE_RESULT: {"outcome":"success","extras":{"dod_strategy":"direct"}}