Round complete — commit `f72a4c9` is pushed and the branch is level with its upstream; the origin/main merge was already up to date.

## This round

**RED** — The two acceptance tests were already authored red on this branch by earlier rounds; per the contract I did not run them. I wrote the round's one new test for the smallest facet: pure aggregation of per-round usage (`turnUsage` in `orchestratorHelpers.test.ts`, appended so the `#L11`–`#L23` anchors in the architecture spec don't shift). Confirmed red for the expected reason — `The requested module './orchestratorHelpers.js' does not provide an export named 'turnUsage'`.

**GREEN** — The least code: `turnUsage(roundUsages)` sums each token field over the rounds that reported, skipping `undefined` rounds and staying `undefined` when none did (`src/orchestration/orchestratorHelpers.ts:45`); the orchestrator collects `roundUsages` per round instead of retaining the last (`src/orchestration/chatOrchestrator.ts:109`); and the hook's third argument is now the exported named contract `TurnUsage` (`src/types/ai.ts:84`), so the signature itself says the number is a turn total.

**REFACTOR** — Nothing to collapse: one sum site, `RoundOutcome` stays honestly per-round. Ran my test plus the guard's file: **29 passed**, including the unedited no-tool regression guard `receives collected response text and usage` (facet 3). Then the docs work: spec statement added and its `TurnUsage` naming (`specs/hal-engine-config-hooks/spec.md:28-29`), CHANGELOG `Changed` bullet with the migration note for existing consumers, and `check-doc-blocks --fix` regenerated the two generated `OrchestratorHooks` blocks (CLAUDE.md, architecture spec) that follow the signature. Prettier ran clean over all changed `.ts` files; `spec:names` validated all 590 citations including my new one; `repoint-spec-anchors` reported 0 drift. I ran no lint, typecheck, build, or acceptance tests — CI judges those on this push.

**Traceability**: `lore-query-trace` reported no coverage rows for `chatOrchestrator.ts` (nothing to regress against); the guard test was the recorded safety net and it held. Red tests of mine at commit: 0. Regressions: 0.

**Noted, not acted on** (out-of-scope smells): `turnUsage` passes the provider's own usage object through when exactly one round reported — a defensive copy would decouple the hook from provider-owned state; the config-hooks spec's "Measured semantics — out of scope" intro still frames issue #93 as unimplemented now that it ships; and the trace graph has no coverage projection for the orchestrator file at all.

The two "Done when these pass" boxes in `.lore/dod.md` stay unticked — they are CI's verdict on this push. All four Facets are ticked.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"aggregate turn usage: TurnUsage contract, per-round sum with undefined passthrough, spec + CHANGELOG","tdd_next":"acceptance green"}}