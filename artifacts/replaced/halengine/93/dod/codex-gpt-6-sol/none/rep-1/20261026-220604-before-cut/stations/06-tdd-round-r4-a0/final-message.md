**Facet closed:** Added the missing test-link to `specs/hal-engine-config-hooks/spec.md` line 32, fixing the ESLint `re-lint/require-status-matches-coverage` error. The new test (`it('accepts a hook implementation that names the parameter TurnUsage...')` at `chatOrchestratorUsage.acceptance.test.ts#L78`) validates the `TurnUsage | undefined` typing statement by using `TurnUsage` as an explicit annotation in the hook callback — CI's typecheck step will reject it if the alias is wrong.

**Note on mongo test failures:** The `mongoRedaction.test.ts` timeout failures in the CI brief are pre-existing infrastructure timeouts (MongoDB startup exceeds 120s) unrelated to this ticket's changes. 0 regressions were caused by this round.

**Unrelated smell noticed but not touched:** `reportedUsage` in the acceptance test uses `UsageMetadata` instead of `TurnUsage` for its `usage` local — a cosmetic inconsistency, not a bug.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"Link TurnUsage type statement in spec to a test — fixes eslint re-lint/require-status-matches-coverage","tdd_next":"acceptance green"}}