This round made no changes and wrote no test. The one open facet cannot be expressed as a failing test without a tautological one, so I stopped.

**CI findings from the brief (40e75ae): already cleared at HEAD.** The fix commit `7f9a7c3` is pushed and already in sync with upstream. I checked each finding against the current tree:
- **eslint, duplicate code** (`chatOrchestrator.test.ts`): the two usage tests now share a `recordUsage()` helper.
- **eslint, require-spec-link** (two usage tests): the spec now cites both acceptance tests in `specs/hal-engine-config-hooks/spec.md`.
- **spec-names**: `check-spec-anchor-names.mjs` passes locally (590 citations) after the repoint to #L577.
- **changelog**: `check-changelog.sh origin/main` passes; the CHANGELOG entry is present.

I did not run eslint here, so the duplicate-code and spec-link findings are cleared by reading the diff, not by a run. CI's verdict on `7f9a7c3` is not in the brief yet.

**The open facet: "Replace final-round retention with a deliberately named total-usage contract."** The summing itself is done (`addUsage` in `chatOrchestrator.ts`). What remains is the public type. The hook still takes `usage?: UsageMetadata`, so a reader cannot tell from the signature that it is a sum. The fix would be an exported alias such as `TurnUsage` in `src/types/ai.ts`, used in `OrchestratorHooks` and the orchestrator. The alias is structurally identical to `UsageMetadata`, so no runtime behaviour changes. Any test I wrote for it would either pass without the alias or only check that a name exists. Both are the tautological kind the brief rules out, so I did not write one.

**Decision for you:** either accept a type-only change with CI's typecheck as the only judge (I would then add the alias and export it from `src/index.ts`), or reword facet 1 to something observable at runtime. I have left `.lore/dod.md` unchanged, since no facet closed this round.

Tests run this round: none. The acceptance tests were not run here, and I did not run the full suite or the typechecker. Red tests that were mine: 0. Regressions: 0 known; no CI verdict on `7f9a7c3` yet.

LORE_NODE_RESULT: {"outcome":"failed","extras":{"tdd_blocked":"Open facet 'Replace final-round retention with a named total-usage contract' is type-only: an alias such as TurnUsage is structurally identical to UsageMetadata, so no runtime test can go red for it without being tautological. Needs a decision on accepting a typecheck-judged change or rewording the facet. The three CI findings on 40e75ae are already fixed at HEAD 7f9a7c3 (pushed)."}}