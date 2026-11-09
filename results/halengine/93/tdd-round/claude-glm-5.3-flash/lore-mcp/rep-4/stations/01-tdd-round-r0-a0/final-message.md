The round is delivered and pushed. Summary:

**This round (red-green-refactor, `direct` strategy):**
- **RED** — added one failing test, `sums the rounds that report usage and keeps a turn where none reported undefined`, to `src/orchestration/orchestratorHelpers.test.ts` (`src/orchestration/orchestratorHelpers.test.ts:29`). It failed for the right reason: no `sumUsage` export. Existing lines in that file were not shifted (in-place import edit, appended at the end), so the four architecture-spec citations into it stay valid.
- **GREEN** — `sumUsage` in `src/orchestration/orchestratorHelpers.ts:44` sums each token field only over rounds that reported, preserving `undefined` when none did; `src/orchestration/chatOrchestrator.ts` replaces final-round retention (`lastUsage = outcome.usage ?? lastUsage`) with `turnUsage = sumUsage(turnUsage, outcome.usage)`. The hook's third parameter is now `turnUsage?: TurnUsage`, with `TurnUsage` exported from the package root — the aggregation is visible at the call site. My test ran green (5 passed).
- **Docs** — regenerated the two generated `OrchestratorHooks` doc blocks (CLAUDE.md, `specs/hal-engine-architecture/spec.md`) via `check-doc-blocks --fix`; added the spec statement to `specs/hal-engine-config-hooks/spec.md:29` citing my test at its verified line; CHANGELOG entry under Unreleased → Changed stating what an existing consumer will now record. Prettier run over the changed `.ts` files (all already conformant).

**Facets:** 1, 2, 4 ticked in `.lore/dod.md`. Facet 3 (regression guard preserved) is left unticked on purpose — the guard is unedited and passes by construction, but CI's run is the proof; both acceptance-test boxes stay CI's to tick.

**Tests:** I ran only the file I wrote. The acceptance tests were not run here; CI judges the push. Red tests of mine: none observed. Regressions: none observed (no round brief existed; no CI verdict available in this pod).

**Unrelated smells noticed, not acted on:** the spec's section heading "Measured semantics — out of scope" now holds a validated #93 statement beside the still-out-of-scope `onError` line and could be split; `TurnUsage` is a bare alias, so only the name — not the structure — distinguishes a turn total from a per-call usage (the ticket's option one, recorded in the changelog).

Branch is up to date with `origin/loop-bench/93`, merged with `origin/main` (already current), working tree clean.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"aggregate turn usage through the TurnUsage contract: sumUsage helper, orchestrator wiring, named public type, hooks spec + CHANGELOG","tdd_next":"acceptance green (CI verdict on the two chatOrchestratorUsage acceptance tests)"}}