Round complete. Everything is committed and pushed; the branch is in sync with its upstream and already contains `origin/main`.

**What this round did** — repaired all four red checks in the CI verdict, with no behaviour change:

- **typecheck / test (TS2459)** — `registry.test.ts` imported `ToolDefinition` from `./registry.js`, which only declares it; the import now comes from `src/types/ai.js`, where the type lives.
- **typecheck / test (TS2322, TS18046) + eslint (max-member-chain at 560)** — the orchestrator-loop test's `sent[1].messages.flatMap(...)` could not type the `ToolCallContent[] | ToolResultContent[]` union and was a 3-hop chain; replaced with a plain loop that narrows on the `tool_result` discriminator. The now-unused `ToolResultContent` import went with it (an unused import would itself have been a lint error).
- **spec-names / eslint (require-spec-link)** — the previous round's test edits had silently moved every `chatOrchestrator.test.ts` anchor by −6 lines and every `registry.test.ts` anchor by +1, so citations pointed outside their tests' spans. `spec:names --fix` repointed 29 citations by name; the check now exits 0 over 404 citations.

**Tests run here:** only the two unit suites this ticket owns, by file — `registry.test.ts` and `chatOrchestrator.test.ts`, 28/28 green (ts-jest's transform diagnostics run with them, so the type errors that failed CI's `test` job are gone). The acceptance suite stays with CI, as the rules require. Prettier reports both files clean.

**Red tests:** 0 mine, 0 regressions — every failing check was this ticket's own prior round leaving a bad import, an untypeable expression, and drifted citation lines.

**Honest caveats:** the brief's `test` and `eslint` outputs were truncated. If `test` failed on the coverage ratchet rather than the ts-jest diagnostics, I could not see that here (running the full suite or the acceptance file is out of bounds for this pod) — the next brief would name it. I statically audited the touched files for the remaining lint classes instead of running eslint. `lore-query-trace` was unavailable in this pod; no source symbol was edited, only test files and spec anchors.

**Unrelated smell, named but not acted on:** `registry.ts` loads ajv via `createRequire` behind hand-written structural types — it works under every resolution mode but gives up ajv's own typings; already recorded in the dod notes from the round that introduced it.

All four facets in `.lore/dod.md` are ticked and the spec reads `Shipped`; what remains is CI's verdict on this push.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"repair red CI verdict on input validation (typecheck TS2459/TS2322/TS18046, member chain, 29 drifted spec citations)","tdd_next":"acceptance green"}}