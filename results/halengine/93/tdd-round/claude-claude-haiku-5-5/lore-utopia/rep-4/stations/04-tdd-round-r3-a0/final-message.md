The CI findings are fixed, and this round's facet is closed and pushed. The branch is up to date with `origin/main` (the fetch had nothing to merge) and is not ahead of its upstream.

**CI findings from the last push (fixed first)**
- `eslint` duplicate-code (`chatOrchestrator.test.ts` 528/552): the two usage tests now share a `usageReportedAfter` helper.
- `eslint` require-spec-link (577) and `spec-names` (#L550 → #L577): I ran `npm run spec:names -- --fix`, which repointed 9 citations by name. A recheck is clean. The `require-spec-link` finding should clear with the repointed line, but I did not run eslint, so CI is the check.

**This round: facet "named total-usage contract"**
- Added `TurnUsage` in `src/types/ai.ts`. `addUsage` returns it, the `afterModelResponse` hook takes `turnUsage?: TurnUsage`, and it is exported from `src/types/index.ts` and `src/index.ts`.
- RED: a test in `orchestratorHelpers.test.ts` imports `TurnUsage`. Jest runs with `isolatedModules`, so it only transpiles, and that test passed before the type existed. The red is a compile-time error that only `tsc --noEmit` shows. I did not run `tsc` here, so I did not observe that red. CI's typecheck is the first real judge of this facet.
- Local run: `src/orchestration/orchestratorHelpers.test.ts` by file, 7 of 7 pass.
- The `chatOrchestrator.test.ts` dedupe was not run locally, per the rule against running other tests here. I checked it by reading.

**Facets and state**
- `.lore/dod.md` ticks the named-contract facet. The other facets (per-field sum, no-tool guard, spec and CHANGELOG) look present in the repo already, but I left them unticked for the next round to verify against CI.
- CHANGELOG line 22 and `specs/hal-engine-config-hooks/spec.md` line 28 already describe the aggregate behaviour.
- `CLAUDE.md`'s hook block still reads `usage?: UsageMetadata`. It is structurally identical, so I left it.

**Other notes**
- The lore MCP server failed to connect, so I could not run `lore-query-trace` before editing, and I could not call `lore_*` with `repo`. The `tests_covering` check was skipped.
- Regressions: CI's last verdict named no failing tests, only the two findings above. So 0 red tests of mine were reported, and 0 regressions.
- Unrelated smells I noticed and did not touch: none beyond the `CLAUDE.md` line.

Commits pushed to `loop-bench/93`:
- `7e98fde` test(orchestrator): share usage test setup
- `ea2b373` refactor(orchestrator): add TurnUsage type

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"named total-usage contract (TurnUsage)","tdd_next":"verify sum-per-field, no-tool guard, and spec/CHANGELOG facets against CI, then tick them"}}