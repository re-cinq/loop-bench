Round complete and pushed (`e43731b`, branch up to date with its upstream, `origin/main` merge clean).

**What this round owed and fixed** — the brief's named findings, all caused by the retry-loop test's insertion shifting lines:

- **eslint (4 errors, all mine, 0 regressions named):** the new test's `lastMessage.content[0]?.content` 3-hop chain broken into two 2-hop reads (the shape the acceptance suite already uses); and three tests whose citations drifted — resolved by repointing the citations, not touching the tests.
- **spec-names (4 findings, confirmed by running that step's command):** `node scripts/check-spec-anchor-names.mjs --fix` repointed the four drifted anchors in `specs/hal-engine-architecture/spec.md` (466→511, 449→494, 478→523, 500→545). Both spec checks now exit 0.
- The edited suite passes (23/23); prettier clean.

**The brief's `test` step red — not nameable from the brief** (its log is truncated to passing-suite console noise before any failure summary). I ruled out the two candidate causes with evidence rather than assumption:
- **Coverage floors:** the branch's only `src/` change is under `src/orchestration/tools/`, and that group clears its ratchet even *without* the acceptance suite (stmts 80.70 ≥ 66.66, branch 77.78 ≥ 56.25, funcs 73.91 ≥ 71.42, lines 82.00 ≥ 70.83); every other jest group is main-identical.
- **Stale-runner ajv (v6):** reproduced CI's own environment by running the changed suites inside the runner checkout at 81dd779 — 29 tests pass under its ajv 6.15.0, as do the three spec-check script suites (45 tests). The wording-agnostic assertions hold under both majors; `dod.md` facet "runner needs a clean npm ci" is ticked as confirmed harmless.

Every suite I can name passes in both environments; `dod.md` records what remains unknown and forbids touching the fixture-bound `check-spec-status.test.ts` until a brief names it. Lint/typecheck/build were deliberately not run in this pod per the delivery rules.

**Smells noticed, not acted on:** (1) `registryTestSupport.ts`'s executor body (lines 17–20) is never invoked by any suite — every helper-based test rejects before executing — permanently dragging the tools group's function/line coverage, though not below today's floors; (2) `example/with-tools.ts` still casts `input.location as string` defensively, though only `weather-tool.ts` was in this ticket's doc scope; (3) `registry.ts`'s `instancePath || dataPath` dual-major fallbacks are uncoverable through the public API under either single major — deliberate, given the stale runner.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"CI repair: four eslint errors and four drifted spec citations in chatOrchestrator.test.ts / hal-engine-architecture spec","tdd_next":"CI test-step red (failing suite unnamed in truncated brief) — else acceptance green"}}