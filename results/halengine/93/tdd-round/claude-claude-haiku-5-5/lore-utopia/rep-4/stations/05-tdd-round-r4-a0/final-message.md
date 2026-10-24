Round 5 is pushed. CI's only red check was two `require-spec-link` findings, and both are fixed. The branch is level with `origin/main` and not ahead of its upstream.

**What was wrong:** the two tests the linter flagged (`sums the usage of every round that reported it` in `chatOrchestrator.test.ts`, and `returns the turn total as TurnUsage…` in `orchestratorHelpers.test.ts`) had no spec statement citing them. The rule only accepts a `([validated by](file#Lnn))` link in a trailing parenthetical whose line falls inside the test's span.

**What I changed** (commit `abf749f`, two files):
- `specs/hal-engine-config-hooks/spec.md`: two new statements in the measured-semantics section. One cites the orchestrator sum test at `#L559`, the other the `TurnUsage` type test at `#L42`. Both sit in trailing parentheticals.
- `.lore/dod.md`: ticked three facets this round verified. Sum-per-field is confirmed by reading `addUsage` and by CI's Test step being green. The no-tool guard test is unedited on the branch (checked against `origin/main`). The spec and CHANGELOG are both updated.
- Appended one new unchecked facet: `CLAUDE.md`'s `OrchestratorHooks` block still declares `afterModelResponse` with `usage?: UsageMetadata`, not `turnUsage?: TurnUsage`.

**Checks and limits:**
- No tests, lint, typecheck or build were run in this pod. Verification was by reading the lint rule's source, reading the spec and CHANGELOG, and running `npm run check:spec-links`, which reports 0 misplaced citations.
- Prettier was run on the two changed markdown files.
- The `lore` MCP server failed to connect, so I could not run `lore-query-trace` before editing or read `lore_get_ci_failures`. The brief's CI section was the source for the verdict.
- No new red test was written this round. The owed work was traceability only, so there was no behaviour to drive red.
- Red tests this round: 0 test failures. The two lint findings were on this ticket's own tests, not regressions. Regressions caused by this branch: 0.
- Unrelated smell, not touched: the stale `CLAUDE.md` signature above, now tracked as the new facet.

**Next round:** correct the `CLAUDE.md` hook signature. The acceptance tests were not run here. CI's last verdict did not name them as red, so the ticket is not done until the next round's CI run confirms it.

LORE_NODE_RESULT: {"outcome":"success","extras":{"tdd_done":"sum-per-field, no-tool guard, and hooks spec/CHANGELOG facets verified; require-spec-link findings fixed","tdd_next":"CLAUDE.md OrchestratorHooks afterModelResponse signature"}}