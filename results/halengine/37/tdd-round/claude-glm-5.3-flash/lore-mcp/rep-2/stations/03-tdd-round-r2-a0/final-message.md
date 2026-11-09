Pushed and confirmed: `d0b3f72` is on `origin/loop-bench/37`, branch up to date with upstream, working tree clean, and `origin/main` merged as a no-op.

## Round report

**Owed CI findings — all fixed:**
1. `typecheck` TS2709 at `registry.ts:36` — the compiled-validator type now comes from ajv's exported `ValidateFunction` instead of indexing the `Ajv` namespace
2. `preserve-caught-error` at `registry.ts:129` — the register-time compile failure now carries `{cause: error}`
3. `re-lint/require-spec-link` on `registry.test.ts:4` + the `spec-names` finding — both were the same wrong anchor; `npm run spec:names:fix` repointed `#L3`→`#L4`, and the local `spec:names` check (the exact command CI runs) now reports 0 findings across 400 citations

**TDD round (one facet):** pin the passthrough contract — `passes an unlisted extra property through to the executor unchanged and runs it exactly once` in `registry.test.ts`, `toEqual` on the executor's input so a coerced value, injected default or second invocation fails. Its statement in `specs/hal-engine-tool-input-validation/spec.md` now carries the validated-by citation. The test went green on first run against the behaviour previous rounds shipped (this ticket's red phase was commit `12dda0d`); it forced no production change, which is why it exists — the ticket requires the pin. Refactor phase: nothing rose — the two tests share no duplicated knowledge and the registry was already shaped. Ran only `src/orchestration/tools/registry.test.ts` (2 passed) plus the `spec:names` script; no acceptance test, lint, typecheck or build was run here — CI judges those on the push.

**Red tests:** 0 mine, 0 regressions (CI's verdict named only typecheck/eslint/spec-names — no test failures).

**dod.md:** facet 4 split into three granular boxes; the closed one ticked; next round's boxes written out.

**Future improvements (noted, not acted on):** `SchemaError` reads both `instancePath` and `dataPath`, but ajv is pinned `^8.20.0` where only `instancePath` exists — the dual-field fallback is speculative generality that could collapse (`registry.ts:139`); the ticket's tool-loop criterion still wants its test literally in `chatOrchestrator.test.ts` while an equivalent lives in `registry.acceptance.test.ts#L112` — that duplication resolves in the next facet.

**Next facet:** the remaining registry unit tests (per-call schema freshness for differing function-valued schemas, compile-once across ten executes, `Unknown tool` pin) plus the `chatOrchestrator.test.ts` retry-loop test, then the docs/README/`.specify`/ADR-002 updates.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"passthrough pin in registry.test.ts with its spec citation, plus the previous push's CI findings repaired (ajv validator type, error cause, misnamed spec anchors)","tdd_next":"remaining registry unit tests (per-call schema freshness, compile-once, unknown-tool pin) and the chatOrchestrator retry-loop test, then docs/README/.specify/ADR-002 updates"}}